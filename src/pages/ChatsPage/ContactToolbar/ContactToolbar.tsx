import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MDBIcon } from 'mdbreact'

import * as actions from 'store/smsContacts/actions'
import { getScheduleFollowupGroups } from 'store/followupGroups/actions'
import Scheduler from './Scheduler'

interface Props {
  smsContact: SMSContact
}
const ContactToolbar: React.FC<Props> = ({ smsContact }) => {
  const dispatch = useDispatch()

  const blockContact = () => {
    dispatch(actions.blockContact(smsContact.id))
  }

  const scheduleCall = params => {
    return dispatch(actions.scheduleContact(smsContact.id, params))
  }

  useEffect(() => {
    dispatch(
      getScheduleFollowupGroups({ CampaignId: smsContact.Lead.CampaignId })
    )
  }, [dispatch, smsContact])

  return (
    <div className='d-flex align-items-center'>
      <span className='mr-2' role='button' title='Block' onClick={blockContact}>
        <MDBIcon icon='ban' />
      </span>

      <Scheduler onSchedule={scheduleCall} />
    </div>
  )
}

export default ContactToolbar
