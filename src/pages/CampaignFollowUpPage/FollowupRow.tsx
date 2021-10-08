import React from 'react'
import { Link } from 'react-router-dom'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import { MDBBtn, MDBIcon } from 'mdbreact'
import numeral from 'numeral'

import MiniAudioPlayer from 'components/MiniAudioPlayer'
import classes from './CampaignFollowUpPage.module.scss'

interface Props {
  index: number
  rowIndex: number
  row: FollowUp
  onUpdate(row: FollowUp): void
  onDelete(row: FollowUp): void
}

const Handler = SortableHandle(() => (
  <span className={classes.handler}>
    <MDBIcon icon='ellipsis-v' />
  </span>
))

const FollowupRow: React.FC<Props> = ({
  rowIndex,
  row,
  onUpdate,
  onDelete,
}) => {
  return (
    <tr>
      <td className='position-relative pl-3'>
        {!row.incoming && <Handler />}
        <Link
          className='text-link'
          to={`/campaigns/${row.CampaignId}/ivr/${row.IVRId}`}
        >
          {rowIndex + 1}
        </Link>
      </td>
      <td>{row.type}</td>
      <td>
        {row.incoming
          ? '---'
          : `${numeral(row.hours).format('00')}:${numeral(row.minutes).format(
              '00'
            )}:${numeral(row.seconds).format('00')}`}
      </td>
      <td>{row.timesUsed || 0}</td>
      <td>{row.answered || 0}</td>
      <td>{row.transferred || 0}</td>
      <td>{row.removed || 0}</td>
      <td>
        {!!row.leaveVoiceMail && row.mailAudio && (
          <MiniAudioPlayer url={`/api/storage/${row.mailAudio}`} />
        )}
      </td>
      <td className='text-right'>
        <MDBBtn
          size='sm'
          color='success'
          className='m-0 mr-2'
          floating={true}
          onClick={() => {
            onUpdate(row)
          }}
        >
          <MDBIcon icon='pen' size='sm' />
        </MDBBtn>

        <MDBBtn
          size='sm'
          color='danger'
          className='m-0'
          onClick={() => {
            onDelete(row)
          }}
          floating={true}
        >
          <MDBIcon icon='trash' size='sm' />
        </MDBBtn>
      </td>
    </tr>
  )
}

export default SortableElement(FollowupRow)
