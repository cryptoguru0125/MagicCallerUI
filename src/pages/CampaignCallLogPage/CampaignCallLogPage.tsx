import React from 'react'
import objectPath from 'object-path'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact'
import qs from 'qs'

import { formatDate, getDate, getStatus } from 'utils'
import { getToken } from 'utils/storage'
import * as actions from 'store/callLogs/actions'
import DatePicker from 'components/DatePicker'
import InlineSearchForm from 'components/InlineSearchForm'
import Pagination from 'components/Pagination'
import MiniAudioPlayer from 'components/MiniAudioPlayer'
import SMSViewer from './SMSViewer'
import './CampaignCallLogPage.scss'

interface Props {
  campaign: Campaign
  callLogs: {
    page: number
    pageCount: number
    rows: CallLog[]
  }
  dispatch(action: any): void
}

interface State {
  dates: Date[]
  page: number
  query: string
}

class CampaignCallLogPage extends React.Component<Props, State> {
  state = {
    dates: [null, null],
    page: 0,
    query: '',
  }

  constructor(props) {
    super(props)

    this.loadData()
  }

  loadData = () => {
    const { campaign } = this.props
    const { dates, query, page } = this.state

    return this.props.dispatch(
      actions.getCallLogs({
        CampaignId: campaign.id,
        startDate: dates[0] ? getDate(dates[0]) : null,
        endDate: dates[1] ? getDate(dates[1]) : null,
        page,
        query,
      })
    )
  }

  handleDateChange = dates => {
    this.setState({ dates }, this.loadData)
  }

  handlePageChange = (page: number) => {
    this.setState({ page }, this.loadData)
  }

  searchLeads = ({ query }) => {
    this.setState({ query, page: 0 }, this.loadData)
  }

  getExportUrl = (): string => {
    const { campaign } = this.props
    const { dates, query } = this.state
    return `/api/call-logs/export?${qs.stringify({
      CampaignId: campaign.id,
      startDate: dates[0] ? getDate(dates[0]) : null,
      endDate: dates[1] ? getDate(dates[1]) : null,
      query,
      token: getToken(),
    })}`
  }

  render() {
    const { callLogs } = this.props
    const { dates } = this.state

    return (
      <MDBCard>
        <MDBCardBody>
          <div className='d-flex align-items-center'>
            <h4 className='font-weight-bold'>Call Logs</h4>

            <span className='ml-auto' />
            <DatePicker value={dates} onChange={this.handleDateChange} />
            <span className='ml-5' />
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
              <col width='50px' />
              <col width='auto' />
              <col width='auto' />
              <col width='auto' />
              <col width='auto' />
              <col width='auto' />
              <col width='60px' />
            </colgroup>
            <MDBTableHead>
              <tr>
                <th />
                <th>ID</th>
                <th>Lead ID</th>
                <th>Name of Lead</th>
                <th>Type</th>
                <th>Status</th>
                <th>Phone #</th>
                <th>Caller ID</th>
                <th>IVR Used</th>
                <th>Followup Step</th>
                <th>Duration</th>
                <th>Time Started</th>
                <th>Time Ended</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {callLogs.rows.map(row => (
                <tr key={row.sid}>
                  <td className='text-center'>
                    {row.recordingUrl && (
                      <MiniAudioPlayer url={row.recordingUrl} />
                    )}
                    {row.type === 'Inbound Text' && (
                      <SMSViewer body={row.SMS} />
                    )}
                  </td>
                  <td>{row.id}</td>
                  <td>{row.LeadId}</td>
                  <td>
                    {`${objectPath.get(row, 'Lead.firstName')} ${objectPath.get(
                      row,
                      'Lead.lastName'
                    )}`}
                  </td>
                  <td>{row.type}</td>
                  <td className='text-capitalize'>{getStatus(row)}</td>
                  <td>{objectPath.get(row, 'Lead.phone')}</td>
                  <td>{objectPath.get(row, 'PhoneNumber.number')}</td>
                  <td>{objectPath.get(row, 'IVR.name') || '--'}</td>
                  <td>{objectPath.get(row, 'FollowupProgress.step') + 1}</td>
                  <td>
                    {row.callDuration}
                    <small>secs</small>
                  </td>
                  <td>{row.startTime ? formatDate(row.startTime) : '-'}</td>
                  <td>{row.endTime ? formatDate(row.endTime) : '-'}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
          <Pagination
            page={callLogs.page}
            pageCount={callLogs.pageCount}
            onChange={this.handlePageChange}
          />
        </MDBCardBody>
      </MDBCard>
    )
  }
}

export default CampaignCallLogPage
