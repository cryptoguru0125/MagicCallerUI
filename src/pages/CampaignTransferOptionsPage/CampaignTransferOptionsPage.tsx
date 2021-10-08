import React from 'react'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact'
import { initialize as initializeForm } from 'redux-form'

import * as actions from 'store/transferOptions/actions'
import OptionForm from './TransferOptionForm'
import TransferOptionsTable from './TransferOptionsTable'
import './CampaignTransferOptionsPage.scss'

interface Props {
  campaign: Campaign
  options: TransferOption[]
  dispatch(action: any): Promise<any>
}

interface State {
  modal: string
}

class CampaignTransferOptionsPage extends React.Component<Props, State> {
  state = {
    modal: null,
  }

  constructor(props) {
    super(props)

    const { campaign } = this.props

    this.props.dispatch(actions.getTransferOptions(campaign.id))
  }

  handleAddOption = () => {
    this.props.dispatch(initializeForm('TransferOptionForm', {}))
    this.setState({
      modal: 'create',
    })
  }

  handleEdit = (option: TransferOption) => {
    this.props.dispatch(initializeForm('TransferOptionForm', option))
    this.setState({
      modal: 'edit',
    })
  }

  handleDeleteOption = row => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) return

    this.props.dispatch(actions.deleteTransferOption(row.id))
  }

  toggleModal = () => {
    this.setState({ modal: null })
  }

  handleSubmit = values => {
    const { campaign } = this.props

    return this.props
      .dispatch(
        actions.createTransferOption({
          ...values,
          CampaignId: campaign.id,
        }),
      )
      .then(() => {
        this.toggleModal()
      })
  }

  render() {
    const { options } = this.props
    const { modal } = this.state

    return (
      <MDBCard>
        <MDBCardBody>
          <div className="d-flex">
            <h4 className="font-weight-bold">Transfer Options</h4>
            <MDBBtn
              color="primary"
              onClick={this.handleAddOption}
              className="ml-auto mr-0"
            >
              Add Option
            </MDBBtn>
          </div>
          <TransferOptionsTable
            data={options}
            onEdit={this.handleEdit}
            onDelete={this.handleDeleteOption}
          />

          <MDBModal isOpen={!!modal} toggle={this.toggleModal}>
            <MDBModalHeader
              className="text-center"
              titleClass="w-100 font-weight-bold"
              toggle={this.toggleModal}
            >
              Add Transfer Option
            </MDBModalHeader>
            <MDBModalBody>
              <OptionForm onSubmit={this.handleSubmit}>
                <div className="button-row">
                  <MDBBtn type="submit" color="primary">
                    Add Option
                  </MDBBtn>
                  <MDBBtn color="primary" outline onClick={this.toggleModal}>
                    Cancel
                  </MDBBtn>
                </div>
              </OptionForm>
            </MDBModalBody>
          </MDBModal>
        </MDBCardBody>
      </MDBCard>
    )
  }
}

export default CampaignTransferOptionsPage
