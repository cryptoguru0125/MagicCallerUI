import React from 'react'
import { Link } from 'react-router-dom'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact'
import { initialize as initializeForm } from 'redux-form'

import * as actions from 'store/ivr/actions'
import IVRForm from './IVRForm'

interface Props {
  campaign: Campaign
  IVRs: IVR[]
  dispatch(action: any): Promise<any>
}

interface State {
  modal: string
}

class CampaignIVRPage extends React.Component<Props, State> {
  state = {
    modal: null,
  }

  constructor(props) {
    super(props)

    const { campaign } = this.props

    this.props.dispatch(actions.getIVRs(campaign.id))
  }

  handleAdd = () => {
    this.props.dispatch(
      initializeForm('IVRForm', {
        voice: 'en-US-Wavenet-D',
        speed: 1,
        pauseTime: 0,
        loopTime: 3,
        loop: 3,
      }),
    )
    this.setState({
      modal: 'create',
    })
  }

  handleDelete = row => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) return

    this.props.dispatch(actions.deleteIVR(row.id))
  }

  toggleModal = () => {
    this.setState({ modal: null })
  }

  handleSubmit = values => {
    const { campaign } = this.props
    return this.props
      .dispatch(
        actions.createIVR({
          ...values,
          CampaignId: campaign.id,
        }),
      )
      .then(() => {
        this.toggleModal()
      })
  }

  render() {
    const { IVRs } = this.props
    const { modal } = this.state

    return (
      <MDBCard>
        <MDBCardBody>
          <div className="d-flex">
            <h4 className="font-weight-bold">IVR</h4>
            <MDBBtn
              color="primary"
              onClick={this.handleAdd}
              className="ml-auto mr-0"
            >
              Add IVR
            </MDBBtn>
          </div>

          <MDBTable className="align-middle">
            <colgroup>
              <col width="auto" />
              <col width="auto" />
              <col width="auto" />
              <col width="auto" />
              <col width="60px" />
            </colgroup>
            <MDBTableHead>
              <tr>
                <th>Name</th>
                <th>Times Used</th>
                <th>Transfers</th>
                <th>Transfer Rate</th>
                <th />
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {IVRs.map(row => (
                <tr key={row.id}>
                  <td>
                    <Link
                      className="text-link"
                      to={`/campaigns/${row.CampaignId}/ivr/${row.id}`}
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td>{row.timesUsed || 0}</td>
                  <td>{row.transferred || 0}</td>
                  <td>{`${
                    row.timesUsed
                      ? Math.round(
                          ((row.transferred || 0) / row.timesUsed) * 100,
                        )
                      : 0
                  }%`}</td>
                  <td className="text-right">
                    <MDBBtn
                      size="sm"
                      color="danger"
                      className="m-0"
                      onClick={() => {
                        this.handleDelete(row)
                      }}
                      floating
                    >
                      <MDBIcon icon="trash" size="sm" />
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>

          <MDBModal isOpen={!!modal} toggle={this.toggleModal}>
            <MDBModalHeader
              className="text-center"
              titleClass="w-100 font-weight-bold"
              toggle={this.toggleModal}
            >
              Add IVR
            </MDBModalHeader>
            <MDBModalBody>
              <IVRForm onSubmit={this.handleSubmit} isCreate>
                <MDBBtn color="primary" outline onClick={this.toggleModal}>
                  Cancel
                </MDBBtn>
              </IVRForm>
            </MDBModalBody>
          </MDBModal>
        </MDBCardBody>
      </MDBCard>
    )
  }
}

export default CampaignIVRPage
