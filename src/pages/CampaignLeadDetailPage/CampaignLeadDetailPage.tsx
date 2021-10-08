import React from 'react'
import { Link } from 'react-router-dom'
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact'

import { getLeadDetail, addInteraction } from 'store/leads/actions'
import { getFollowupGroups } from 'store/followupGroups/actions'
import LeadDetail from './LeadDetail'
import LeadHistory from './LeadHistory'
import InteractionForm from './InteractionForm'
import './CampaignLeadDetailPage.scss'

interface Props {
  campaign: Campaign
  match: {
    params: {
      leadId: any
    }
  }
  location: {
    push(url: string): void
  }
}

interface State {
  lead: Lead
  modal: boolean
}

class CampaignLeadDetailPage extends React.Component<Props & Dispatch, State> {
  state = {
    lead: null,
    modal: false,
  }

  constructor(props) {
    super(props)

    const {
      campaign,
      match: {
        params: { leadId },
      },
      location,
    } = this.props

    getLeadDetail(leadId).then(
      lead => {
        this.props.dispatch(
          getFollowupGroups({
            CampaignId: lead.CampaignId,
          })
        )
        this.setState({ lead })
      },
      () => {
        location.push(`/campaigns/${campaign.id}`)
      }
    )
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  handleSubmit = values => {
    const { lead } = this.state
    addInteraction(lead.id, values).then((res: any) => {
      this.setState({ lead: res, modal: false })
    })
  }

  render() {
    const { lead, modal } = this.state

    if (!lead) {
      return null
    }

    return (
      <MDBCard>
        <MDBCardBody>
          <div className='d-flex'>
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <Link to={`/campaigns/${lead.CampaignId}`}>Leads</Link>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem
                active={true}
              >{`${lead.firstName} ${lead.lastName}`}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </div>

          <LeadDetail lead={lead} />

          <div className='d-flex align-items-center mt-3'>
            <h2 className='secondary-heading ml-2 mt-0 mr-3'>Lead History</h2>
            <div>
              <MDBBtn color='primary' onClick={this.toggleModal}>
                New Interaction
              </MDBBtn>
            </div>
          </div>
          <LeadHistory data={lead.FollowupGroups} />

          <MDBModal isOpen={modal} toggle={this.toggleModal}>
            <MDBModalHeader
              className='text-center'
              titleClass='w-100 font-weight-bold'
              toggle={this.toggleModal}
            >
              New Interaction
            </MDBModalHeader>
            <MDBModalBody>
              <InteractionForm onSubmit={this.handleSubmit}>
                <div className='button-row'>
                  <MDBBtn type='submit' color='primary'>
                    Add
                  </MDBBtn>
                  <MDBBtn
                    color='primary'
                    outline={true}
                    onClick={this.toggleModal}
                  >
                    Cancel
                  </MDBBtn>
                </div>
              </InteractionForm>
            </MDBModalBody>
          </MDBModal>
        </MDBCardBody>
      </MDBCard>
    )
  }
}

export default CampaignLeadDetailPage
