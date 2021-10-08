import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import ReduxLoadingOverlay from 'components/ReduxLoadingOverlay'
import ContactItem from './ContactItem'
import classes from './Contacts.module.scss'

interface Props {
  contacts: SMSContact[]
  selected: number
  onAgentAssign(contact: SMSContact): void
  onClose(contact: SMSContact): void
  onLoadMore(): void
  onSelect(contact: SMSContact): void
}

const Contacts: React.FC<Props> = ({
  contacts,
  selected,
  onAgentAssign,
  onClose,
  onLoadMore,
  onSelect,
}) => {
  const handleClose = item => e => {
    e.preventDefault()
    e.stopPropagation()
    onClose(item)
  }

  const handleAssign = item => e => {
    e.preventDefault()
    e.stopPropagation()
    onAgentAssign(item)
  }

  const handleScroll = e => {
    const threshold = 50
    if (
      e.target.scrollTop >=
      e.target.scrollHeight - e.target.clientHeight - threshold
    ) {
      onLoadMore()
    }
  }

  return (
    <div className={classes.container}>
      <ReduxLoadingOverlay spinner="messageContacts">
        <Scrollbars
          renderView={props => (
            <div {...props} className={classes.scrollView} />
          )}
          style={{ width: '100%', height: '100%' }}
          onScroll={handleScroll}
        >
          {contacts.map(item => (
            <ContactItem
              key={item.id}
              contact={item}
              selected={item.id === selected}
              onAgentAssign={handleAssign(item)}
              onClick={() => {
                onSelect(item)
              }}
              onClose={handleClose(item)}
            />
          ))}
        </Scrollbars>
      </ReduxLoadingOverlay>
    </div>
  )
}

export default Contacts
