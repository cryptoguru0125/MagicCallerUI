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

import { FETCH_INTERVAL } from 'helpers/enum'
import * as actions from 'store/campaigns/actions'
import DatePicker from 'components/DatePicker'
import CampaignForm from './CampaignForm'
import CampaignsTable from './CampaignsTable'
import './CampaignsPage.scss'
import { getDate } from 'utils'

type Props = {
  campaigns: Campaign[]
  user: User
  dispatch(action: any): Promise<any>
}

type States = {
  modal: string
  dates: Date[]
}

class CampaignsPage extends React.Component<Props, States> {
  channel = null
  fetchTimer = null

  constructor(props) {
    super(props)

    this.state = {
      modal: null,
      dates: [null, null],
    }
    this.props.dispatch(actions.getCampaigns())
  }

  componentDidMount() {
    const { user } = this.props

    this.channel = user.pusher.subscribe('private-updates')
    this.channel.bind('forceUpdate', this.getData)
  }

  componentWillUnmount() {
    const { user } = this.props

    this.channel.unbind('forceUpdate', this.getData)
    user.pusher.unsubscribe('private-updates')

    if (this.fetchTimer) {
      clearTimeout(this.fetchTimer)
    }
  }

  getData = () => {
    // clear timer
    if (this.fetchTimer) {
      clearTimeout(this.fetchTimer)
    }

    this.fetchTimer = setTimeout(() => {
      const { dates } = this.state
      this.props
        .dispatch(
          actions.getCampaigns({
            startDate: dates[0] ? getDate(dates[0]) : null,
            endDate: dates[1] ? getDate(dates[1]) : null,
          }),
        )
        .then(() => {
          this.fetchTimer = null
        })
    }, FETCH_INTERVAL)
  }

  handleCreateCampaign = () => {
    this.props.dispatch(initializeForm('CampaignForm', {}))
    this.setState({
      modal: 'create',
    })
  }

  handleDeleteCampaign = row => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) return

    this.props.dispatch(actions.deleteCampaign(row.id))
  }

  handleActiveCampaign = (row, newStatus) => {
    this.props.dispatch(
      actions.updateCampaign(row.id, {
        active: newStatus,
      }),
    )
  }

  toggleModal = () => {
    this.setState({ modal: null })
  }

  handleSubmit = values =>
    this.props.dispatch(actions.createCampaign(values)).then(() => {
      this.toggleModal()
    })

  handleDateChange = dates => {
    this.setState({ dates })

    this.props.dispatch(
      actions.getCampaigns({
        startDate: dates[0] ? getDate(dates[0]) : null,
        endDate: dates[1] ? getDate(dates[1]) : null,
      }),
    )
  }

  render() {
    const { campaigns } = this.props
    const { modal } = this.state

    return (
      <MDBContainer>
        <div className="d-flex align-items-center">
          <div className="ml-auto mr-3">
            <DatePicker
              value={this.state.dates}
              onChange={this.handleDateChange}
            />
          </div>
          <div className="align-self-center">
            <MDBBtn
              color="primary"
              onClick={this.handleCreateCampaign}
              className="ml-auto mr-0"
            >
              Create Campaign
            </MDBBtn>
          </div>
        </div>

        <MDBCard>
          <MDBCardBody>
            <CampaignsTable
              data={campaigns}
              onActiveChange={this.handleActiveCampaign}
              onDelete={this.handleDeleteCampaign}
            />
          </MDBCardBody>
        </MDBCard>

        <MDBModal isOpen={!!modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={this.toggleModal}
          >
            Create Campagin
          </MDBModalHeader>
          <MDBModalBody>
            <CampaignForm onSubmit={this.handleSubmit}>
              <div className="button-row">
                <MDBBtn type="submit" color="primary">
                  Create
                </MDBBtn>
                <MDBBtn color="primary" outline onClick={this.toggleModal}>
                  Cancel
                </MDBBtn>
              </div>
            </CampaignForm>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    )
  }
}

export default CampaignsPage
