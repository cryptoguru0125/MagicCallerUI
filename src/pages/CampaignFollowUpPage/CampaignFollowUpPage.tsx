import React from 'react'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import { initialize as initializeForm } from 'redux-form'
import {
  MDBCard,
  MDBCardBody,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact'
import arrayMove from 'array-move'

import { FollowupGroupType, FollowupType } from 'helpers/enum'
import { showNotify } from 'utils/notify'
import {
  getFollowupGroup,
  updateFollowupGroup,
} from 'store/followupGroups/actions'
import * as actions from 'store/followups/actions'
import { getIVRs } from 'store/ivr/actions'
import ReduxLoadingOverlay from 'components/ReduxLoadingOverlay'
import FollowUpForm from './FollowUpForm'
import TriggerForm from './TriggerForm'
import FollowupTable from './FollowupTable'
import classes from './CampaignFollowUpPage.module.scss'
import ScheduledCallForm from './ScheduledCallForm'

interface Props {
  campaign: Campaign
  followups: FollowUp[]
  match: {
    params: {
      groupId: any
    }
  }
  dispatch(action: any): Promise<any>
}

interface State {
  followupGroup: FollowupGroup
  modal: string
  scheduleModal: string
  triggerModal: boolean
}

class CampaignFollowUpPage extends React.Component<Props, State> {
  state = {
    followupGroup: null,
    modal: null,
    scheduleModal: null,
    triggerModal: false,
  }

  constructor(props) {
    super(props)

    const {
      campaign,
      match: {
        params: { groupId },
      },
    } = this.props

    getFollowupGroup(groupId).then(
      followupGroup => {
        this.setState({ followupGroup })
        this.props.dispatch(
          actions.getFollowUps({ FollowupGroupId: followupGroup.id })
        )
        this.props.dispatch(getIVRs(followupGroup.CampaignId))
      },
      () => {
        this.props.dispatch(push(`/campaigns/${campaign.id}/follow-up`))
      }
    )
  }

  toggleModal = () => {
    this.setState({ modal: null, scheduleModal: null })
  }

  toggleTrigger = () => {
    const { triggerModal, followupGroup } = this.state
    if (!triggerModal) {
      this.props.dispatch(
        initializeForm('TriggerForm', {
          type: followupGroup.type,
          knownOnly: followupGroup.knownOnly,
        })
      )
    }
    this.setState({ triggerModal: !triggerModal })
  }

  addScheduleCall = () => {
    this.props.dispatch(
      initializeForm('ScheduledCallForm', {
        type: FollowupType.SCHEDULE,
        leaveVoiceMail: 0,
      })
    )
    this.setState({ scheduleModal: 'create' })
  }

  handleCreate = () => {
    this.props.dispatch(
      initializeForm('FollowUpForm', {
        type: 'Call',
        leaveVoiceMail: 0,
        incoming: false,
      })
    )
    this.setState({
      modal: 'create',
    })
  }

  handleUpdate = (followup: FollowUp) => {
    if (followup.type === FollowupType.SCHEDULE) {
      this.props.dispatch(initializeForm('ScheduledCallForm', followup))
      this.setState({ scheduleModal: 'edit' })
    } else {
      const data: any = { ...followup }
      if (data.type === FollowupType.NEW_CHAT) {
        data.chatAssignment = followup.leaveVoiceMail ? 'Random' : 'No'
      }

      this.props.dispatch(initializeForm('FollowUpForm', data))
      this.setState({ modal: 'edit' })
    }
  }

  handleSubmit = values => {
    const { followupGroup } = this.state
    // validate sequence
    if (
      values.type === FollowupType.ACTIVATE_VOICE &&
      followupGroup.type !== FollowupGroupType.INBOUND_CALL
    ) {
      showNotify(
        'You can add Activate Voice to only Inbound Call followup',
        'error'
      )
      return
    }

    if (
      values.type === FollowupType.NEW_CHAT &&
      followupGroup.type !== FollowupGroupType.INBOUND_SMS
    ) {
      showNotify('You can add New Chat to only Inbound SMS followup', 'error')
      return
    }

    let data = values
    if (
      values.type === FollowupType.ACTIVATE_VOICE ||
      values.type === FollowupType.NEW_CHAT
    ) {
      data = {
        ...data,
        hours: 0,
        minutes: 0,
        seconds: 0,
        leaveVoiceMail: false,
        incoming: true,
      }
    }

    if (values.type === FollowupType.NEW_CHAT) {
      data.leaveVoiceMail = values.chatAssignment === 'Random'
    }

    if (values.type === FollowupType.SCHEDULE) {
      data = {
        ...data,
        hours: 0,
        minutes: 0,
        seconds: 0,
        incoming: true,
      }
    }

    let promise
    if (values.id) {
      promise = this.props.dispatch(actions.updateFollowUp(values.id, data))
    } else {
      promise = this.props.dispatch(
        actions.createFollowUp({
          ...data,
          FollowupGroupId: followupGroup.id,
        })
      )
    }

    return promise.then(() => {
      this.toggleModal()
    })
  }

  handleDelete = (followup: FollowUp) => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) {
      return
    }

    this.props.dispatch(actions.deleteFollowUp(followup.id))
  }

  handleSortEnd = ({ oldIndex, newIndex }) => {
    const { followups } = this.props

    // check enable
    if (followups[oldIndex].incoming || followups[newIndex].incoming) {
      return
    }

    const updated = arrayMove(followups, oldIndex, newIndex).map(
      (item, index) => ({
        ...item,
        order: index,
      })
    )

    this.props.dispatch(actions.updateOrder(updated))
  }

  updateTrigger = values => {
    const { followups } = this.props
    const { followupGroup } = this.state

    if (
      followups.find(item => item.type === FollowupType.ACTIVATE_VOICE) &&
      followupGroup.type !== FollowupGroupType.INBOUND_CALL
    ) {
      showNotify(
        'You have Activate Voice sequence. Please remove it first',
        'error'
      )
      return
    }

    if (
      followups.find(item => item.type === FollowupType.NEW_CHAT) &&
      followupGroup.type !== FollowupGroupType.INBOUND_SMS
    ) {
      showNotify('You have NewChat sequence. Please remove it first', 'error')
      return
    }

    return this.props
      .dispatch(updateFollowupGroup(followupGroup.id, values))
      .then(res => {
        this.setState({
          followupGroup: res,
          triggerModal: false,
        })
      })
  }

  render() {
    const { followups } = this.props
    const { followupGroup, modal, scheduleModal, triggerModal } = this.state

    if (!followupGroup) {
      return null
    }

    let isSequenceAvailable = true
    if (
      followupGroup.type === FollowupGroupType.SCHEDULE &&
      !followups.find(item => item.type === FollowupType.SCHEDULE)
    ) {
      isSequenceAvailable = false
    }

    return (
      <MDBCard>
        <MDBCardBody>
          <div className='d-flex'>
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <Link to={`/campaigns/${followupGroup.CampaignId}/follow-up`}>
                  {followupGroup.name}
                </Link>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active={true}>Sequences</MDBBreadcrumbItem>
            </MDBBreadcrumb>

            <div className='ml-auto'>
              {followupGroup.type === FollowupGroupType.SCHEDULE ? (
                <MDBBtn
                  color='secondary'
                  disabled={isSequenceAvailable}
                  onClick={this.addScheduleCall}
                >
                  Add Scheduled Call
                </MDBBtn>
              ) : (
                <MDBBtn color='secondary' onClick={this.toggleTrigger}>
                  Edit Triggers
                </MDBBtn>
              )}

              <MDBBtn
                color='primary'
                className='mr-0'
                disabled={!isSequenceAvailable}
                onClick={this.handleCreate}
              >
                Add Sequence
              </MDBBtn>
            </div>
          </div>

          <ReduxLoadingOverlay spinner='followups'>
            <FollowupTable
              followups={followups}
              helperClass={classes.sorting}
              useDragHandle={true}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
              onSortEnd={this.handleSortEnd}
            />
          </ReduxLoadingOverlay>

          <MDBModal isOpen={!!modal} toggle={this.toggleModal}>
            <MDBModalHeader
              className='text-center'
              titleClass='w-100 font-weight-bold'
              toggle={this.toggleModal}
            >
              {modal === 'create' ? 'Add Sequence' : 'Edit Sequence'}
            </MDBModalHeader>
            <MDBModalBody>
              <FollowUpForm onSubmit={this.handleSubmit}>
                <div className='button-row'>
                  {modal === 'create' ? (
                    <MDBBtn type='submit' color='primary'>
                      Add Sequence
                    </MDBBtn>
                  ) : (
                    <MDBBtn type='submit' color='success'>
                      Update Sequence
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
              </FollowUpForm>
            </MDBModalBody>
          </MDBModal>

          <MDBModal isOpen={triggerModal} toggle={this.toggleTrigger}>
            <MDBModalHeader
              className='text-center'
              titleClass='w-100 font-weight-bold'
              toggle={this.toggleTrigger}
            >
              Trigger for This Sequence
            </MDBModalHeader>
            <MDBModalBody>
              <TriggerForm onSubmit={this.updateTrigger}>
                <div className='button-row'>
                  <MDBBtn type='submit' color='primary'>
                    Save
                  </MDBBtn>
                  <MDBBtn
                    color='primary'
                    outline={true}
                    onClick={this.toggleTrigger}
                  >
                    Cancel
                  </MDBBtn>
                </div>
              </TriggerForm>
            </MDBModalBody>
          </MDBModal>

          {scheduleModal && (
            <MDBModal isOpen={true} toggle={this.toggleModal}>
              <MDBModalHeader
                className='text-center'
                titleClass='w-100 font-weight-bold'
                toggle={this.toggleModal}
              >
                {scheduleModal === 'create'
                  ? 'Add Scheduled Call'
                  : 'Edit Scheduled Call'}
              </MDBModalHeader>
              <MDBModalBody>
                <ScheduledCallForm
                  isCreate={scheduleModal === 'create'}
                  onSubmit={this.handleSubmit}
                >
                  <MDBBtn
                    color='primary'
                    outline={true}
                    onClick={this.toggleModal}
                  >
                    Cancel
                  </MDBBtn>
                </ScheduledCallForm>
              </MDBModalBody>
            </MDBModal>
          )}
        </MDBCardBody>
      </MDBCard>
    )
  }
}

export default CampaignFollowUpPage
