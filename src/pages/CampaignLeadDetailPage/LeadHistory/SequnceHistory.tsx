import React from 'react'
import objectPath from 'object-path'
import {
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from 'mdbreact'

import { formatDate, getStatus } from 'utils'

interface Props {
  data: FollowupProgress[]
}

const SequnceHistory: React.FC<Props> = ({ data }) => {
  const getStatusLabel = (row: FollowupProgress) => {
    if (row.progress === 'Complete' && !row.CallLog) {
      return 'Error'
    } else if (!row.CallLog) {
      return '--'
    } else if (row.CallLog.status === 'Transferred') {
      return (
        <MDBTooltip placement='top'>
          <MDBBtn className='no-button'>Transferred</MDBBtn>
          <div>
            {objectPath.get(row, 'CallLog.TransferNumber.phone') ||
              objectPath.get(row, 'CallLog.TransferNumber.Agent.phone')}
          </div>
        </MDBTooltip>
      )
    } else {
      return getStatus(row.CallLog)
    }
  }

  return (
    <MDBTable className='align-middle prompt-table'>
      <colgroup>
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
          <th>Sequence #</th>
          <th>Followup Type</th>
          <th>Progress</th>
          <th>Status</th>
          <th>Estimated Time</th>
          <th>Date Initiated</th>
          <th>Date Ended</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.step + 1}</td>
            <td>{objectPath.get(row, 'FollowUp.type')}</td>
            <td>{row.progress}</td>
            <td>{getStatusLabel(row)}</td>
            <td>
              {row.progress !== 'Complete'
                ? formatDate(row.estimatedTime)
                : '--'}
            </td>
            <td>{row.CallLog ? formatDate(row.CallLog.startTime) : '--'}</td>
            <td>{row.CallLog ? formatDate(row.CallLog.endTime) : '--'}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  )
}

export default SequnceHistory
