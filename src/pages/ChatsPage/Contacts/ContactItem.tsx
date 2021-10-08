import React from 'react'
import { useSelector } from 'react-redux'
import { MDBBadge, MDBIcon } from 'mdbreact'
import { Link } from 'react-router-dom'

import { formatDateFromNow } from 'utils'
import { getProfile } from 'store/profile/reducer'
import classes from './Contacts.module.scss'
import { UserRole } from 'helpers/enum'

interface Props {
  contact: SMSContact
  selected?: boolean
  onAgentAssign(e: any): void
  onClose(e: any): void
  onClick(): void
}

const ContactItem: React.FC<Props> = ({
  contact,
  selected,
  onAgentAssign,
  onClick,
  onClose,
}) => {
  const user = useSelector(getProfile)

  if (!contact.Lead) {
    return null
  }

  return (
    <div
      className={`${classes.contactItem} ${selected && classes.selected} `}
      onClick={onClick}
    >
      <div className={classes.status}>
        {contact.unreadCount > 0 && (
          <MDBBadge color='primary' pill={true}>
            {contact.unreadCount}
          </MDBBadge>
        )}
      </div>
      <div className='flex-1'>
        <div className='position-relative'>
          {user.role === UserRole.ADMIN ? (
            <Link
              to={`/campaigns/${contact.Lead.CampaignId}/leads/${contact.LeadId}`}
              className={classes.name}
            >
              {`${contact.Lead.firstName} ${contact.Lead.lastName}`}
            </Link>
          ) : (
            <span className={classes.name}>
              {`${contact.Lead.firstName} ${contact.Lead.lastName}`}
            </span>
          )}

          <span className={classes.time}>
            {formatDateFromNow(contact.updatedAt)}
          </span>
          <span
            className={classes.close}
            title='Close contact'
            onClick={onClose}
          >
            <MDBIcon icon='times-circle' />
          </span>
        </div>

        <div className={classes.message}>{contact.lastMessage}</div>

        {user.role === UserRole.ADMIN && (
          <div className={classes.agent}>
            <label>Agent:</label>
            <div title='Assign Agent' onClick={onAgentAssign}>
              {contact.User ? (
                <MDBBadge color='secondary'>{`${contact.User.firstName} ${contact.User.lastName}`}</MDBBadge>
              ) : (
                <span className='btn-link'>Assign</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactItem
