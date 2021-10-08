import React from 'react'
import { initialize as initializeForm } from 'redux-form'
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact'

import { showNotify } from 'utils/notify'
import {
  getIntegrations,
  checkYtelAgentStatus,
  getNumbers,
} from 'store/integrations/actions'
import * as actions from 'store/agents/actions'
import * as userActions from 'store/users/actions'
import AgentForm from './AgentForm'
import AgentsTable from './AgentsTable'
import UserAgentsTable from './UserAgentsTable'
import UserAgentForm from './UserAgentForm'
import './AgentsPage.scss'

type Props = {
  agents: Agent[]
  userAgents: User[]
  integrations: Integration[]
}

type States = {
  modal: string
  userAgentModal: string
  isApiTested: boolean
}

class AgentsPage extends React.Component<Props & Dispatch, States> {
  formValue: Agent = null

  constructor(props) {
    super(props)

    this.state = {
      modal: null,
      userAgentModal: null,
      isApiTested: false,
    }
    this.props.dispatch(getIntegrations())
    this.props.dispatch(userActions.getUserAgents())
    this.props.dispatch(actions.getAgents())
  }

  handleCreateAgent = () => {
    this.props.dispatch(
      initializeForm('AgentForm', {
        partner: 'Dialpad',
        age: { min: 18, max: 100 },
      }),
    )
    this.setState({
      modal: 'create',
    })

    this.formValue = null
  }

  handleCreateUserAgent = () => {
    this.props.dispatch(initializeForm('UserAgentForm', {}))
    this.setState({
      userAgentModal: 'create',
    })
  }

  handleEdit = (row: Agent) => {
    this.props.dispatch(
      initializeForm('AgentForm', {
        ...row,
        age: { min: row.startAge, max: row.endAge },
      }),
    )

    // get numbers
    if (row.Integration.partner === 'Dialpad') {
      this.props.dispatch(getNumbers(row.IntegrationId))
    }

    this.setState({
      modal: 'edit',
      isApiTested: true,
    })

    this.formValue = row
  }

  handleDeleteAgent = (row: Agent) => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) return

    this.props.dispatch(actions.deleteAgent(row.id))
  }

  toggleModal = () => {
    this.setState({ modal: null })
  }

  toggleUserAgentModal = () => {
    this.setState({ userAgentModal: null })
  }

  handleSubmit = values => {
    let promise: Promise<any>

    const data = { ...values, startAge: values.age.min, endAge: values.age.max }

    if (values.id) {
      promise = this.props.dispatch(actions.updateAgent(values.id, data))
    } else {
      promise = this.props.dispatch(actions.createAgent(data))
    }
    return promise.then(() => {
      this.toggleModal()
    })
  }

  handleFormChange = values => {
    const { integrations } = this.props
    const { isApiTested } = this.state
    const integration = integrations.find(
      // eslint-disable-next-line
      item => item.id == values.IntegrationId,
    )

    if (
      integration &&
      (integration.partner === 'Dialpad' || integration.partner === 'Internal')
    ) {
      this.setState({ isApiTested: true })
    } else if (
      this.formValue &&
      isApiTested &&
      (this.formValue.agentId !== values.agentId ||
        this.formValue.IntegrationId !== values.IntegrationId)
    ) {
      this.setState({ isApiTested: false })
    }

    // get the phone numbers
    if (
      values.IntegrationId !== 'internal' &&
      (!this.formValue || values.IntegrationId !== this.formValue.IntegrationId)
    ) {
      this.props.dispatch(getNumbers(values.IntegrationId))
    }

    this.formValue = values
  }

  testAPI = () => {
    const { formValue } = this
    if (!formValue || !formValue.agentId) {
      showNotify('Agent ID is missing', 'error')
      return
    }

    checkYtelAgentStatus({
      agentId: formValue.agentId,
      id: this.formValue.IntegrationId,
    }).then(
      () => {
        this.setState({ isApiTested: true })
      },
      () => {
        showNotify('Agent ID is invalid', 'error')
      },
    )
  }

  handleUserEdit = (row: User) => {
    this.props.dispatch(
      initializeForm('UserAgentForm', {
        id: row.id,
        email: row.email,
        name: row.fullName,
      }),
    )

    this.setState({
      userAgentModal: 'edit',
    })
  }

  handleDeleteUser = (row: User) => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) return

    this.props.dispatch(userActions.deleteUser(row.id))
  }

  handleUserAgentSubmit = values => {
    const splits = values.name.split(' ')
    const data = {
      email: values.email,
      firstName: splits[0],
      lastName: splits[1],
    }

    let promise
    if (values.id) {
      promise = this.props.dispatch(userActions.updateUser(values.id, data))
    } else {
      promise = this.props.dispatch(userActions.createUser(data))
    }

    return promise.then(() => {
      this.setState({ userAgentModal: null })
    })
  }

  render() {
    const { agents, userAgents } = this.props
    const { modal, isApiTested, userAgentModal } = this.state

    return (
      <MDBContainer>
        <div className="d-flex align-items-center">
          <div className="align-self-center ml-auto">
            <MDBBtn
              color="primary"
              onClick={this.handleCreateUserAgent}
              className="ml-auto"
            >
              Add Internal Agent
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={this.handleCreateAgent}
              className="ml-2"
            >
              Add Agent
            </MDBBtn>
          </div>
        </div>

        <MDBCard>
          <MDBCardBody>
            <MDBTable className="align-middle">
              <colgroup>
                <col width="auto" />
                <col width="auto" />
                <col width="auto" />
                <col width="110px" />
              </colgroup>
              <MDBTableHead>
                <tr>
                  <th>Name</th>
                  <th>Dialing System</th>
                  <th>Phone #/Email</th>
                  <th />
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <AgentsTable
                  data={agents}
                  onEdit={this.handleEdit}
                  onDelete={this.handleDeleteAgent}
                />
                <UserAgentsTable
                  data={userAgents}
                  onEdit={this.handleUserEdit}
                  onDelete={this.handleDeleteUser}
                />
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>

        <MDBModal isOpen={!!modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={this.toggleModal}
          >
            {modal === 'create' ? 'Add Agent' : 'Edit Agent'}
          </MDBModalHeader>
          <MDBModalBody>
            <AgentForm
              onChange={this.handleFormChange}
              onSubmit={this.handleSubmit}
            >
              <div className="button-row">
                {isApiTested ? (
                  <MDBInput
                    label="Tested"
                    type="checkbox"
                    id="checkbox1"
                    checked={true}
                    disabled
                  />
                ) : (
                  <MDBBtn type="button" onClick={this.testAPI}>
                    Test API
                  </MDBBtn>
                )}
                {modal === 'create' ? (
                  <MDBBtn type="submit" color="primary" disabled={!isApiTested}>
                    Create
                  </MDBBtn>
                ) : (
                  <MDBBtn type="submit" color="success" disabled={!isApiTested}>
                    Update
                  </MDBBtn>
                )}
              </div>
            </AgentForm>
          </MDBModalBody>
        </MDBModal>

        <MDBModal isOpen={!!userAgentModal} toggle={this.toggleUserAgentModal}>
          <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={this.toggleModal}
          >
            {userAgentModal === 'create'
              ? 'Add Internal Agent'
              : 'Edit Internal Agent'}
          </MDBModalHeader>
          <MDBModalBody>
            <UserAgentForm onSubmit={this.handleUserAgentSubmit}>
              <div className="button-row">
                {userAgentModal === 'create' ? (
                  <MDBBtn type="submit" color="primary">
                    Create
                  </MDBBtn>
                ) : (
                  <MDBBtn type="submit" color="success">
                    Update
                  </MDBBtn>
                )}

                <MDBBtn
                  type="button"
                  color="white"
                  onClick={this.toggleUserAgentModal}
                >
                  Cancel
                </MDBBtn>
              </div>
            </UserAgentForm>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    )
  }
}

export default AgentsPage
