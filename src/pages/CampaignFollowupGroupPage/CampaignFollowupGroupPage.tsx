import React from 'react'
import { Link } from 'react-router-dom'
import { initialize as initializeForm } from 'redux-form'
import {
  MDBCard,
  MDBCardBody,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
} from 'mdbreact'

import * as actions from 'store/followupGroups/actions'
import FollowupGroupForm from './FollowupGroupForm'
import './CampaignFollowupGroupPage.scss'

interface Props {
  campaign: Campaign
  followupGroups: FollowupGroup[]
  dispatch(action: any): Promise<any>
}

interface State {
  modal: string
}

class CampaignFollowupGroupPage extends React.Component<Props, State> {
  state = {
    modal: null,
  }

  constructor(props) {
    super(props)

    const { campaign } = this.props

    this.props.dispatch(
      actions.getFollowupGroups({
        CampaignId: campaign.id,
        statistics: true,
      })
    )
  }

  toggleModal = () => {
    this.setState({ modal: null })
  }

  handleCreate = () => {
    this.props.dispatch(
      initializeForm('FollowupGroupForm', {
        type: 'Default',
      })
    )
    this.setState({
      modal: 'create',
    })
  }

  handleUpdate = (group: FollowupGroup) => {
    this.props.dispatch(initializeForm('FollowupGroupForm', group))
    this.setState({
      modal: 'edit',
    })
  }

  handleSubmit = values => {
    const { campaign } = this.props
    let promise
    if (values.id) {
      promise = this.props.dispatch(
        actions.updateFollowupGroup(values.id, values)
      )
    } else {
      promise = this.props.dispatch(
        actions.createFollowupGroup({
          ...values,
          CampaignId: campaign.id,
        })
      )
    }

    return promise.then(() => {
      this.toggleModal()
    })
  }

  handleDelete = (group: FollowupGroup) => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) {
      return
    }

    this.props.dispatch(actions.deleteFollowupGroup(group.id))
  }

  render() {
    const { campaign, followupGroups } = this.props
    const { modal } = this.state

    return (
      <MDBCard>
        <MDBCardBody>
          <div className='d-flex'>
            <h4 className='font-weight-bold'>Follow Up</h4>
            <MDBBtn
              color='primary'
              onClick={this.handleCreate}
              className='ml-auto mr-0'
            >
              Add Followup
            </MDBBtn>
          </div>
          <MDBTable className='align-middle'>
            <colgroup>
              <col width='50px' />
              <col width='auto' />
              <col width='auto' />
              <col width='auto' />
              <col width='auto' />
              <col width='auto' />
              <col width='auto' />
              <col width='auto' />
              <col width='110px' />
            </colgroup>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Active Leads</th>
                <th>Total Leads</th>
                <th>Answers</th>
                <th>Transfers</th>
                <th>Removals</th>
                <th />
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {followupGroups.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <Link
                      className='text-link'
                      to={`/campaigns/${campaign.id}/follow-up/${row.id}`}
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td>{row.activeLeads || 0}</td>
                  <td>{row.totalLeads || 0}</td>
                  <td>{row.answered || 0}</td>
                  <td>{row.transferred || 0}</td>
                  <td>{row.removed || 0}</td>
                  <td className='text-right'>
                    <MDBBtn
                      size='sm'
                      color='success'
                      className='m-0 mr-2'
                      floating={true}
                      onClick={() => {
                        this.handleUpdate(row)
                      }}
                    >
                      <MDBIcon icon='pen' size='sm' />
                    </MDBBtn>

                    <MDBBtn
                      size='sm'
                      color='danger'
                      className='m-0'
                      onClick={() => {
                        this.handleDelete(row)
                      }}
                      floating={true}
                    >
                      <MDBIcon icon='trash' size='sm' />
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>

          <MDBModal isOpen={!!modal} toggle={this.toggleModal}>
            <MDBModalHeader
              className='text-center'
              titleClass='w-100 font-weight-bold'
              toggle={this.toggleModal}
            >
              {modal === 'create' ? 'Add Follow Up' : 'Edit Follow Up'}
            </MDBModalHeader>
            <MDBModalBody>
              <FollowupGroupForm
                isEdit={modal === 'edit'}
                onSubmit={this.handleSubmit}
              >
                <div className='button-row'>
                  {modal === 'create' ? (
                    <MDBBtn type='submit' color='primary'>
                      Add Followup
                    </MDBBtn>
                  ) : (
                    <MDBBtn type='submit' color='success'>
                      Update Followup
                    </MDBBtn>
                  )}
                  <MDBBtn
                    color='primary'
                    outline={true}
                    onClick={this.toggleModal}
                  >
                    Cancel
                  </MDBBtn>
                </div>
              </FollowupGroupForm>
            </MDBModalBody>
          </MDBModal>
        </MDBCardBody>
      </MDBCard>
    )
  }
}

export default CampaignFollowupGroupPage
