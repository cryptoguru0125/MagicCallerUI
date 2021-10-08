import React from 'react'
import { initialize as initializeForm } from 'redux-form'
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact'

import * as actions from 'store/integrations/actions'
import IntegrationForm from './IntegrationForm'
import IntegrationsTable from './IntegrationsTable'
import './IntegrationsPage.scss'

interface Props {
  integrations: Integration[]
  dispatch(action: any): Promise<any>
}

interface States {
  modal: string
}

class IntegrationsPage extends React.Component<Props, States> {
  state = {
    modal: null,
  }
  formValue: Integration = null

  constructor(props) {
    super(props)

    this.props.dispatch(actions.getIntegrations())
  }

  handleCreateIntegration = () => {
    this.props.dispatch(
      initializeForm('IntegrationForm', {
        partner: 'Dialpad',
      })
    )
    this.setState({ modal: 'create' })
  }

  handleEdit = (row: Integration) => {
    this.props.dispatch(
      initializeForm('IntegrationForm', {
        ...row,
        isApiTested: true,
      })
    )

    this.setState({ modal: 'edit' })
  }

  handleDeleteIntegration = (row: Integration) => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) {
      return
    }

    this.props.dispatch(actions.deleteIntegration(row.id))
  }

  toggleModal = () => {
    this.setState({ modal: null })
  }

  handleSubmit = values => {
    let promise: Promise<any>

    if (values.id) {
      promise = this.props.dispatch(
        actions.updateIntegration(values.id, values)
      )
    } else {
      promise = this.props.dispatch(actions.createIntegration(values))
    }
    return promise.then(() => {
      this.toggleModal()
    })
  }

  render() {
    const { integrations } = this.props
    const { modal } = this.state
    const filtered = integrations.filter(item => item.partner !== 'Internal')

    return (
      <MDBContainer>
        <div className='d-flex align-items-center'>
          <div className='align-self-center ml-auto'>
            <MDBBtn
              color='primary'
              onClick={this.handleCreateIntegration}
              className='ml-auto mr-0'
            >
              Add Integration
            </MDBBtn>
          </div>
        </div>

        <MDBCard>
          <MDBCardBody>
            <IntegrationsTable
              data={filtered}
              onEdit={this.handleEdit}
              onDelete={this.handleDeleteIntegration}
            />
          </MDBCardBody>
        </MDBCard>

        <MDBModal isOpen={!!modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className='text-center'
            titleClass='w-100 font-weight-bold'
            toggle={this.toggleModal}
          >
            {modal === 'create' ? 'Add Integration' : 'Edit Integration'}
          </MDBModalHeader>
          <MDBModalBody>
            <IntegrationForm
              isCreate={modal === 'create'}
              onSubmit={this.handleSubmit}
            />
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    )
  }
}

export default IntegrationsPage
