import React from 'react'
import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
  MDBTableHead,
} from 'mdbreact'
import qs from 'qs'

import { FETCH_INTERVAL } from 'helpers/enum'
import { formatDate, getDate } from 'utils'
import { getToken } from 'utils/storage'
import * as actions from 'store/leads/actions'
import DatePicker from 'components/DatePicker'
import InlineSearchForm from 'components/InlineSearchForm'
import Pagination from 'components/Pagination'
import LeadSummary from './LeadSummary'
import './CampaignLeadsPage.scss'

interface Props {
  campaign: Campaign
  leads: {
    page: number
    pageCount: number
    rows: Lead[]
  }
  user: User
  dispatch(action: any): Promise<any>
}

interface State {
  dates: Date[]
  modal: boolean
  page: number
  query: string
}

class CampaignLeadsPage extends React.Component<Props & Dispatch, State> {
  channel = null
  fetchTimer = null

  state = {
    dates: [null, null],
    modal: false,
    page: 0,
    query: '',
  }

  constructor(props) {
    super(props)

    this.loadLeadsData()
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

  loadLeadsData = () => {
    const { campaign } = this.props
    const { dates, query, page } = this.state

    return this.props.dispatch(
      actions.getLeads({
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
      actions.getLeadCharts({
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
      this.loadLeadsData().then(() => {
        this.fetchTimer = null
      })
      this.loadChartsData()
    }, FETCH_INTERVAL)
  }

  resetLead = (lead: Lead) => {
    this.props.dispatch(actions.resetLead(lead.id))
  }

  searchLeads = ({ query }) => {
    this.setState({ query, page: 0 }, this.loadLeadsData)
  }

  handlePageChange = (page: number) => {
    this.setState({ page }, this.loadLeadsData)
  }

  handleDelete = (lead: Lead) => {
    if (!window.confirm('Are you sure to delete?')) {
      return
    }

    this.props.dispatch(actions.deleteLead(lead.id))
  }

  handleDateChange = dates => {
    this.setState({ dates }, () => {
      this.loadLeadsData()
      this.loadChartsData()
    })
  }

  getExportUrl = (): string => {
    const { campaign } = this.props
    const { dates, query } = this.state

    return `/api/leads/export?${qs.stringify({
      CampaignId: campaign.id,
      startDate: dates[0] ? getDate(dates[0]) : null,
      endDate: dates[1] ? getDate(dates[1]) : null,
      query,
      token: getToken(),
    })}`
  }

  render() {
    const { leads } = this.props
    const { dates } = this.state

    return (
      <React.Fragment>
        <div className='d-flex mb-3 justify-content-center'>
          <DatePicker value={dates} onChange={this.handleDateChange} />
        </div>

        <LeadSummary />

        <div className='mt-3' />

        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>
              <h4 className='font-weight-bold'>Leads</h4>

              <span className='ml-auto' />
              <InlineSearchForm onSubmit={this.searchLeads} />
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
                <col width='72px' />
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
                <col width='auto' />
                <col width='70px' />
              </colgroup>
              <MDBTableHead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone #</th>
                  <th>Status</th>
                  <th>Followup Attempts</th>
                  <th>Date Added</th>
                  <th>Last Followup</th>
                  <th />
                </tr>
              </MDBTableHead>
              <TransitionGroup className='css-fade-group' component='tbody'>
                {leads.rows.map(row => (
                  <CSSTransition
                    key={row.id}
                    timeout={500}
                    classNames='fade-tr'
                  >
                    <tr>
                      <td>{row.id}</td>
                      <td>{`${row.firstName} ${row.lastName}`}</td>
                      <td>{row.phone}</td>
                      <td>{row.status}</td>
                      <td>{row.attempts || 0}</td>
                      <td>{formatDate(row.createdAt)}</td>
                      <td>
                        {row.lastFollowup ? formatDate(row.lastFollowup) : '-'}
                      </td>
                      <td className='text-right'>
                        <MDBBtn
                          size='sm'
                          color='secondary'
                          className='m-0'
                          title='Reset'
                          floating={true}
                          onClick={() => {
                            this.resetLead(row)
                          }}
                        >
                          <MDBIcon icon='undo' size='sm' />
                        </MDBBtn>
                        <MDBBtn
                          tag={Link}
                          size='sm'
                          title='View detail'
                          color='primary'
                          className='m-0 mx-2'
                          to={`/campaigns/${row.CampaignId}/leads/${row.id}`}
                          floating={true}
                        >
                          <MDBIcon icon='eye' size='sm' />
                        </MDBBtn>
                        <MDBBtn
                          size='sm'
                          title='Delete'
                          color='danger'
                          className='m-0'
                          floating={true}
                          onClick={() => {
                            this.handleDelete(row)
                          }}
                        >
                          <MDBIcon icon='trash' size='sm' />
                        </MDBBtn>
                      </td>
                    </tr>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </MDBTable>
            <Pagination
              page={leads.page}
              pageCount={leads.pageCount}
              onChange={this.handlePageChange}
            />
          </MDBCardBody>
        </MDBCard>
      </React.Fragment>
    )
  }
}

export default CampaignLeadsPage
