import React from 'react'
import { initialize as initializeForm } from 'redux-form'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact'

import { UserRole } from 'helpers/enum'
import { getUserAgents } from 'store/users/actions'
import * as contactActions from 'store/smsContacts/actions'
import * as actions from 'store/messages/actions'
import { formatDate } from 'utils'
import Contacts from 'pages/ChatsPage/Contacts'
import MessageForm from 'pages/ChatsPage/MessageForm'
import MessageList from 'pages/ChatsPage/MessageList'
import classes from 'pages/ChatsPage/ChatsPage.module.scss'
import AgentAssignForm from 'pages/ChatsPage/AgentAssignForm'
import ContactToolbar from 'pages/ChatsPage/ContactToolbar/ContactToolbar'

interface Props {
  contacts: SMSContact[]
  user: User
}

interface States {
  modal: boolean
  selectedContactId: number
}

class ChatsPage extends React.Component<Props & Dispatch, States> {
  channel = null
  interval = null
  channelName = ''
  timer = null

  state = {
    modal: false,
    selectedContactId: null,
  }

  constructor(props) {
    super(props)
    const { user } = this.props
    if (user.role === UserRole.ADMIN) {
      this.props.dispatch(getUserAgents())
    }

    this.props.dispatch(contactActions.getContacts())
  }

  componentDidMount() {
    const { user } = this.props

    this.channelName = `private-${
      user.role === UserRole.ADMIN ? 'admin' : 'user' + user.id
    }`
    this.channel = user.pusher.subscribe(this.channelName)
    this.channel.bind('message', this.handleNewMessage)

    this.interval = setInterval(() => {
      const selectedContact = this.getSelectedContact()

      if (selectedContact && selectedContact.unreadCount) {
        this.props.dispatch(
          contactActions.clearContactUnread(selectedContact.id)
        )
      }
    }, 2000)
  }

  componentWillUnmount() {
    const { user } = this.props

    // unsubscribe events
    this.channel.unbind('message', this.handleNewMessage)
    user.pusher.unsubscribe(this.channelName)

    clearInterval(this.interval)
    clearTimeout(this.timer)
  }

  handleNewMessage = (data: Message) => {
    const { user } = this.props
    // check permission
    if (user.role !== UserRole.ADMIN && data.SMSContact.UserId !== user.id) {
      return
    }

    const { selectedContactId } = this.state
    if (selectedContactId === data.SMSContactId) {
      this.props.dispatch(actions.types.newMessage(data))
    }
    this.props.dispatch(contactActions.types.updateContact(data.SMSContact))
  }

  getSelectedContact = (): SMSContact => {
    const { contacts } = this.props
    const { selectedContactId } = this.state

    if (!selectedContactId) {
      return null
    }

    return contacts.find(item => item.id === selectedContactId)
  }

  selectContact = contact => {
    this.setState({ selectedContactId: contact.id })
    this.props.dispatch(actions.getMessages(contact.id))
  }

  closeContact = contact => {
    if (!window.confirm('Are you sure to close chat?')) {
      return
    }

    const { selectedContactId } = this.state

    if (selectedContactId === contact.id) {
      this.setState({ selectedContactId: null })
    }

    this.props.dispatch(contactActions.closeContact(contact.id))
  }

  loadMoreContacts = () => {
    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      const { contacts } = this.props
      this.props.dispatch(
        contactActions.loadMoreContacts(
          contacts.length
            ? { updatedAt: contacts[contacts.length - 1].updatedAt }
            : {}
        )
      )
      this.timer = null
    }, 200)
  }

  sendMessage = content => {
    const { selectedContactId } = this.state

    if (!selectedContactId) {
      return
    }

    this.props.dispatch(actions.sendMessage(selectedContactId, { content }))
  }

  handleAssignAgentClick = (contact: SMSContact) => {
    this.props.dispatch(
      initializeForm('AgentAssignForm', {
        id: contact.id,
        UserId: contact.UserId,
      })
    )
    this.setState({ modal: true })
  }

  toggleModal = () => {
    this.setState({ modal: false })
  }

  assignAgent = values => {
    return this.props
      .dispatch(contactActions.assignAgent(values.id, values))
      .then(res => {
        this.toggleModal()
      })
  }

  render() {
    const { contacts } = this.props
    const { selectedContactId, modal } = this.state
    const selectedContact = this.getSelectedContact()

    return (
      <MDBContainer>
        <MDBCard className={classes.chatContainer}>
          <div className='d-flex h-100'>
            <Contacts
              contacts={contacts}
              selected={selectedContactId}
              onAgentAssign={this.handleAssignAgentClick}
              onClose={this.closeContact}
              onLoadMore={this.loadMoreContacts}
              onSelect={this.selectContact}
            />
            {selectedContact && (
              <div className='flex-1 p-3 d-flex flex-column'>
                <div className='text-center'>
                {'SMS Message with '}
                  <strong>{`${selectedContact.Lead.firstName} ${selectedContact.Lead.lastName}`}</strong>
                  <br />
                  <small>
                    {`Started ${formatDate(
                      selectedContact.createdAt,
                      'MM/DD/YYYY - h:mm A'
                    )}`}
                  </small>

                  <div className='float-right'>
                    <ContactToolbar smsContact={selectedContact} />
                  </div>
                </div>

                <div className='flex-grow-1 d-flex mt-2'>
                  <div className='d-fled w-100'>
                    <MessageList />
                  </div>
                </div>
                <MessageForm onSend={this.sendMessage} />
              </div>
            )}
          </div>
        </MDBCard>

        <MDBModal isOpen={modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className='text-center'
            titleClass='w-100 font-weight-bold'
            toggle={this.toggleModal}
          >
            Assign Agent
          </MDBModalHeader>
          <MDBModalBody>
            <AgentAssignForm onSubmit={this.assignAgent}>
              <div className='button-row'>
                <MDBBtn type='submit' color='primary'>
                  Assign
                </MDBBtn>
                <MDBBtn
                  color='primary'
                  outline={true}
                  onClick={this.toggleModal}
                >
                  Cancel
                </MDBBtn>
              </div>
            </AgentAssignForm>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    )
  }
}

export default ChatsPage
