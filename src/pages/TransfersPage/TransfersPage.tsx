import React from 'react'
import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTooltip,
} from 'mdbreact'
import objectPath from 'object-path'
import qs from 'qs'

import { FETCH_INTERVAL } from 'helpers/enum'
import { formatDate, getDate, formatTime } from 'utils'
import { getToken } from 'utils/storage'
import * as actions from 'store/transfers/actions'
import DatePicker from 'components/DatePicker'
import InlineSearchForm from 'components/InlineSearchForm'
import Pagination from 'components/Pagination'
import TransferSummary from './TransferSummary'
import './TransfersPage.scss'

interface Props {
  campaign: Campaign
  transfers: {
    page: number
    pageCount: number
    rows: Transfer[]
  }
  user: User
  dispatch(action: any): Promise<any>
}

interface State {
  dates: Date[]
  modal: boolean
  page: number
  query: string
  newQuery: string
}

class TransfersPage extends React.Component<Props, State> {
  channel = null
  fetchTimer = null

  state = {
    dates: [null, null],
    modal: false,
    page: 0,
    query: '',
    newQuery: '',
  }

  constructor(props) {
    super(props)

    this.loadTransfersData()
    this.loadChartsData()
  }

  componentDidMount() {
    const { user } = this.props

    this.channel = user.pusher.subscribe('private-updates')
    this.channel.bind('forceUpdate', this.getData)
  }

  componentWillUnmount() {
    const { user } = this.props

    this.channel.unbind('forceUpdate', this.getData)
    user.pusher.unsubscribe('private-updates')

    if (this.fetchTimer) {
      clearTimeout(this.fetchTimer)
    }
  }

  loadTransfersData = () => {
    const { campaign } = this.props
    const { dates, query, page } = this.state

    return this.props.dispatch(
      actions.getTransfers({
        CampaignId: campaign.id,
        startDate: dates[0] ? getDate(dates[0]) : null,
        endDate: dates[1] ? getDate(dates[1]) : null,
        page,
        query,
      })
    )
  }

  loadChartsData = () => {
    const { campaign } = this.props
    const { dates } = this.state

    return this.props.dispatch(
      actions.getTransferCharts({
        CampaignId: campaign.id,
        startDate: dates[0] ? getDate(dates[0]) : null,
        endDate: dates[1] ? getDate(dates[1]) : null,
      })
    )
  }

  getData = () => {
    // clear timer
    if (this.fetchTimer) {
      clearTimeout(this.fetchTimer)
    }

    this.fetchTimer = setTimeout(() => {
      this.loadTransfersData().then(() => {
        this.fetchTimer = null
      })
      this.loadChartsData()
    }, FETCH_INTERVAL)
  }

  handleQueryChange = e => {
    this.setState({
      newQuery: e.target.value,
    })
  }

  handlePageChange = (page: number) => {
    this.setState({ page }, this.loadTransfersData)
  }

  handleDateChange = dates => {
    this.setState({ dates }, () => {
      this.loadTransfersData()
      this.loadChartsData()
    })
  }

  searchData = ({ query }) => {
    this.setState({ query, page: 0 }, this.loadTransfersData)
  }

  renderTableRow = (row: Transfer) => {
    let transferEnd = '---'
    if (row.transferEnd) {
      transferEnd = formatDate(row.transferEnd)
    } else if (row.transferStart) {
      transferEnd = 'In Progress'
    }

    return (
      <CSSTransition key={row.id} timeout={500} classNames='fade-tr'>
        <tr>
          <td>{objectPath.get(row, 'Lead.id')}</td>
          <td>
            <Link
              className='text-primary'
              to={`/campaigns/${row.CampaignId}/leads/${objectPath.get(
                row,
                'Lead.id'
              )}`}
            >
              {`${objectPath.get(row, 'Lead.firstName') ||
                'Unknown'} ${objectPath.get(row, 'Lead.lastName') || ''}`}
            </Link>
          </td>
          <td>{objectPath.get(row, 'Lead.phone')}</td>
          <td>{objectPath.get(row, 'PhoneNumber.number')}</td>
          <td>
            <MDBTooltip placement='top'>
              <MDBBtn className='no-button'>
                {objectPath.get(row, 'TransferNumber.name') ||
                  objectPath.get(row, 'TransferNumber.Agent.name')}
              </MDBBtn>
              <div>
                {objectPath.get(row, 'TransferNumber.phone') ||
                  objectPath.get(row, 'TransferNumber.Agent.phone')}
              </div>
            </MDBTooltip>
          </td>
          <td>{row.transferStart ? formatDate(row.transferStart) : '---'}</td>
          <td>{transferEnd}</td>
          <td>{formatTime(row.transferDuration)}</td>
        </tr>
      </CSSTransition>
    )
  }

  getExportUrl = (): string => {
    const { campaign } = this.props
    const { dates, query } = this.state

    return `/api/transfers/export?${qs.stringify({
      CampaignId: campaign.id,
      startDate: dates[0] ? getDate(dates[0]) : null,
      endDate: dates[1] ? getDate(dates[1]) : null,
      query,
      token: getToken(),
    })}`
  }

  render() {
    const { transfers } = this.props
    const { dates } = this.state

    return (
      <React.Fragment>
        <div className='d-flex mb-3 justify-content-center'>
          <DatePicker value={dates} onChange={this.handleDateChange} />
        </div>

        <TransferSummary />

        <div className='mt-3' />

        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>
              <h4 className='font-weight-bold'>Transfers</h4>

              <span className='ml-auto' />
              <InlineSearchForm onSubmit={this.searchData} />
              <span>
                <MDBBtn
                  tag='a'
                  href={this.getExportUrl()}
                  target='_blank'
                  gradient='peach'
                  rounded={true}
                  size='sm'
                  className='ml-3'
                >
                  Export CSV
                </MDBBtn>
              </span>
            </div>

            <MDBTable className='align-middle'>
              <colgroup>
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
              </colgroup>
              <MDBTableHead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Customer #</th>
                  <th>Our #</th>
                  <th>Transfered To</th>
                  <th>Transfer Start</th>
                  <th>Transfer End</th>
                  <th>Duration</th>
                </tr>
              </MDBTableHead>
              <TransitionGroup className='css-fade-group' component='tbody'>
                {transfers.rows.map(row => this.renderTableRow(row))}
              </TransitionGroup>
            </MDBTable>
            <Pagination
              page={transfers.page}
              pageCount={transfers.pageCount}
              onChange={this.handlePageChange}
            />
          </MDBCardBody>
        </MDBCard>
      </React.Fragment>
    )
  }
}

export default TransfersPage
