import React, { useState } from 'react'

import {
  MDBBtn,
  MDBCard,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact'
import { formatDate } from 'utils'
import SequnceHistory from './SequnceHistory'

interface Props {
  data: LeadFollowupGroup[]
}

const LeadHistory: React.FC<Props> = ({ data }) => {
  const [selectedRow, selectRow] = useState(null)

  const renderRow = (row: LeadFollowupGroup, index: number) => {
    const selected = row.id === selectedRow
    return (
      <React.Fragment key={row.id}>
        <tr>
          <td>{index + 1}</td>
          <td>{row.name}</td>
          <td>{row.status}</td>
          <td>{row.lastSequence || '--'}</td>
          <td>{row.finalOutcome}</td>
          <td>{formatDate(row.startDate)}</td>
          <td>
            <MDBBtn
              size='sm'
              floating={true}
              onClick={() => {
                selectRow(selected ? null : row.id)
              }}
            >
              <MDBIcon icon={selected ? 'angle-up' : 'angle-down'} />
            </MDBBtn>
          </td>
        </tr>
        {selectedRow === row.id && (
          <tr>
            <td colSpan={7} className='p-0'>
              <MDBCard>
                <SequnceHistory data={row.sequences} />
              </MDBCard>
            </td>
          </tr>
        )}
      </React.Fragment>
    )
  }

  return (
    <MDBTable className='align-middle prompt-table'>
      <colgroup>
        <col width='auto' />
        <col width='auto' />
        <col width='auto' />
        <col width='auto' />
        <col width='auto' />
        <col width='150px' />
        <col width='30px' />
      </colgroup>
      <MDBTableHead>
        <tr>
          <th>Interaction #</th>
          <th>Followup #</th>
          <th>Status</th>
          <th>Last Sequence</th>
          <th>Final Outcome</th>
          <th>Date Started</th>
          <th />
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((row, index) => renderRow(row, index))}
      </MDBTableBody>
    </MDBTable>
  )
}

export default LeadHistory
