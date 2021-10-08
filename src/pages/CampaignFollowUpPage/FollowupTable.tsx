import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact'
import FollowupRow from './FollowupRow'

interface Props {
  followups: FollowUp[]
  onUpdate(row: FollowUp): void
  onDelete(row: FollowUp): void
}

const FollowupTable: React.FC<Props> = ({ followups, onUpdate, onDelete }) => (
  <MDBTable className='align-middle'>
    <colgroup>
      <col width='100px' />
      <col width='auto' />
      <col width='130px' />
      <col width='155px' />
      <col width='130px' />
      <col width='130px' />
      <col width='130px' />
      <col width='130px' />
      <col width='110px' />
    </colgroup>
    <MDBTableHead>
      <tr>
        <th>Sequence #</th>
        <th>Followup Type</th>
        <th>Wait time</th>
        <th>Times Used</th>
        <th>Answers</th>
        <th>Transfers</th>
        <th>Removals</th>
        <th>Voicemail</th>
        <th />
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {followups.map((row, index) => (
        <FollowupRow
          disabled={row.incoming}
          key={row.id}
          index={index}
          row={row}
          rowIndex={index}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </MDBTableBody>
  </MDBTable>
)

export default SortableContainer(FollowupTable)
