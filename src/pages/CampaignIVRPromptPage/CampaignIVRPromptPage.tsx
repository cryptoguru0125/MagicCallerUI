import React from 'react'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import { initialize as initializeForm } from 'redux-form'
import {
  MDBAlert,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact'

import { PromptTypes } from 'helpers/enum'
import { showNotify } from 'utils/notify'
import { getIVRDetail, updateIVR } from 'store/ivr/actions'
import { getTransferOptions } from 'store/transferOptions/actions'
import * as actions from 'store/ivrPrompts/actions'
import IVRForm from '../CampaignIVRPage/IVRForm'
import IVRPromptForm from './IVRPromptForm'
import IVRActionForm from './IVRActionForm'
import FlowBuilder from './FlowBuilder'
import classes from './CampaignIVRPromptPage.module.scss'

interface Props {
  campaign: Campaign
  ivrPrompts: IVRPrompt[]
  match: {
    params: {
      ivrId: any
    }
  }
  dispatch(action: any): Promise<any>
}

interface State {
  ivr: IVR
  modal: string
  actionModal: string
  ivrModal: boolean
}

class CampaignIVRPromptPage extends React.Component<Props, State> {
  state = {
    ivr: null,
    modal: null,
    actionModal: null,
    ivrModal: false,
  }

  promptRef: React.RefObject<HTMLDivElement>
  flowBuilder: any = null
  timer: any = null
  isRefresh: boolean = false

  constructor(props) {
    super(props)

    const {
      campaign,
      match: {
        params: { ivrId },
      },
    } = this.props

    this.promptRef = React.createRef<HTMLDivElement>()

    getIVRDetail(ivrId).then(
      ivr => {
        this.setState({ ivr })
        this.props.dispatch(actions.getIVRPrompts(ivr.id))
        this.props.dispatch(getTransferOptions(campaign.id))
      },
      () => {
        this.props.dispatch(push(`/campaigns/${campaign.id}/ivr`))
      }
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.ivrPrompts !== prevProps.ivrPrompts) {
      this.updateFlowBuilder()
    }
  }

  handleAddAction = () => {
    this.props.dispatch(
      initializeForm('IVRActionForm', {
        type: PromptTypes.TRANSFER,
        messages: [
          {
            content: '',
            percent: 100,
          },
        ],
      })
    )
    this.setState({
      actionModal: 'create',
    })
  }

  handleAddPrompt = () => {
    this.props.dispatch(
      initializeForm('IVRPromptForm', {
        type: PromptTypes.PROMPT,
        messages: [
          {
            content: '',
            percent: 100,
          },
        ],
      })
    )
    this.setState({
      modal: 'create',
    })
  }

  handleUpdate = (ivrPrompt: IVRPrompt) => {
    if (ivrPrompt.type === PromptTypes.PROMPT) {
      this.props.dispatch(initializeForm('IVRPromptForm', ivrPrompt))
      this.setState({ modal: 'update' })
    } else {
      this.props.dispatch(initializeForm('IVRActionForm', ivrPrompt))
      this.setState({ actionModal: 'update' })
    }
  }

  handleUpdateIVR = () => {
    const { ivr } = this.state
    this.props.dispatch(initializeForm('IVRForm', ivr))
    this.setState({
      ivrModal: true,
    })
  }

  handleDelete = (row: IVRPrompt) => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) {
      return
    }

    this.props.dispatch(actions.deleteIVRPrompt(row.id))
  }

  toggleModal = () => {
    this.setState({ actionModal: null, ivrModal: null, modal: null })
  }

  handleSubmit = values => {
    const { ivr } = this.state

    // check percent is 100
    if (values.type === PromptTypes.PROMPT) {
      let percent = 0
      values.messages.forEach(message => {
        percent += Number(message.percent)
      })
      console.log(`------- ${percent} ----------`)
      if (percent !== 100) {
        showNotify('Percent is not 100%. Please check', 'error')
        return
      }
    }

    let promise
    if (values.id) {
      promise = this.props.dispatch(actions.updateIVRPrompt(values.id, values))
    } else {
      promise = this.props.dispatch(
        actions.createIVRPrompt({
          ...values,
          IVRId: ivr.id,
        })
      )
    }

    return promise.then(() => {
      this.toggleModal()
    })
  }

  updateIVRSetting = values => {
    const { ivr } = this.state
    return this.props.dispatch(updateIVR(ivr.id, values)).then(updated => {
      this.setState({
        ivr: updated,
        ivrModal: null,
      })

      return this.props.dispatch(actions.getIVRPrompts(ivr.id))
    })
  }

  handleFlowEvent = (event, node, reRender = false) => {
    const { data: prompt } = node

    if (event === 'edit') {
      this.handleUpdate(prompt)
    } else if (event === 'update') {
      this.props.dispatch(
        actions.updateIVRPromptAttributes(prompt.id, prompt, reRender)
      )
    } else if (event === 'remove') {
      if (!window.confirm('Are you sure to delete?')) {
        return
      }

      this.props.dispatch(actions.deleteIVRPrompt(prompt.id))
    }
  }

  updatePrompt = (promptId, values) => {
    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      this.props.dispatch(actions.updateIVRPromptAttributes(promptId, values))
      this.timer = null
    }, 100)
  }

  setPromptRef = async ref => {
    // init flow builder
    this.flowBuilder = await FlowBuilder(ref, [], this.handleFlowEvent)

    if (!this.flowBuilder) {
      return
    }

    // postion changed
    this.flowBuilder.triggerIVREvent = this.handleFlowEvent

    this.flowBuilder.on('nodetranslated', ({ node }) => {
      node.data.position = node.position
      this.updatePrompt(node.data.id, {
        position: node.position,
      })
    })

    // connection created
    this.flowBuilder.on('connectioncreated', ({ input, output }) => {
      if (this.isRefresh) {
        return
      }

      const { data: outPrompt } = output.node
      outPrompt.buttons[output.key].next = input.node.id
      this.props.dispatch(
        actions.updateIVRPromptAttributes(outPrompt.id, {
          buttons: outPrompt.buttons,
        })
      )
    })

    // connection removed
    this.flowBuilder.on('connectionremoved', ({ output }) => {
      if (this.isRefresh) {
        return
      }

      const { data: outPrompt } = output.node
      outPrompt.buttons[output.key].next = null
      this.props.dispatch(
        actions.updateIVRPromptAttributes(outPrompt.id, {
          buttons: outPrompt.buttons,
        })
      )
    })
  }

  updateFlowBuilder = async () => {
    if (!this.flowBuilder) {
      return
    }

    const { ivrPrompts } = this.props
    const nodes = {}

    for (const prompt of ivrPrompts) {
      const node = {
        id: prompt.id,
        name: prompt.type,
        data: prompt,
        position: prompt.position,
        inputs: { in: { connections: [] } },
        outputs: {},
      }
      for (let dialNum = 0; dialNum < prompt.buttons.length; dialNum += 1) {
        node.outputs[`${dialNum}`] = {
          connections: [
            {
              node: prompt.buttons[dialNum].next,
              input: 'in',
              data: {},
            },
          ],
        }
      }

      nodes[prompt.id] = node
    }

    this.isRefresh = true
    await this.flowBuilder.fromJSON({
      id: 'demo@0.1.0',
      nodes,
    })
    this.isRefresh = false
  }

  render() {
    const { ivrPrompts } = this.props
    const { ivr, modal, actionModal, ivrModal } = this.state

    if (!ivr) {
      return null
    }

    const hasFirst = ivrPrompts.find(item => item.first)

    return (
      <MDBCard>
        <MDBCardBody>
          <div className='d-flex'>
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <Link to={`/campaigns/${ivr.CampaignId}/ivr`}>IVR</Link>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active={true}>
                {ivr.name} Prompts
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>

            <div className='ml-auto'>
              <MDBBtn
                className='mr-2'
                color='primary'
                size='sm'
                onClick={this.handleAddAction}
              >
                Add Actions
              </MDBBtn>
              <MDBBtn
                className='mr-2'
                color='primary'
                size='sm'
                onClick={this.handleAddPrompt}
              >
                Add IVR Prompt
              </MDBBtn>
              <MDBBtn
                className='mr-0'
                color='secondary'
                size='sm'
                onClick={this.handleUpdateIVR}
              >
                Settings
              </MDBBtn>
            </div>
          </div>

          {!hasFirst && (
            <MDBAlert color='warning'>
              You don't have a first sequence. Please set one
            </MDBAlert>
          )}

          <div className={classes.flowBuilder}>
            <div ref={this.setPromptRef} />
          </div>

          <MDBModal isOpen={!!actionModal} toggle={this.toggleModal}>
            <MDBModalHeader
              className='text-center'
              titleClass='w-100 font-weight-bold'
              toggle={this.toggleModal}
            >
              {actionModal === 'create' ? 'Add Action' : 'Edit Action'}
            </MDBModalHeader>
            <MDBModalBody>
              <IVRActionForm
                isCreate={actionModal === 'create'}
                onSubmit={this.handleSubmit}
              >
                <MDBBtn
                  color='primary'
                  outline={true}
                  onClick={this.toggleModal}
                >
                  Cancel
                </MDBBtn>
              </IVRActionForm>
            </MDBModalBody>
          </MDBModal>

          <MDBModal isOpen={!!modal} toggle={this.toggleModal}>
            <MDBModalHeader
              className='text-center'
              titleClass='w-100 font-weight-bold'
              toggle={this.toggleModal}
            >
              {modal === 'create' ? 'Add IVR Prompt' : 'Edit IVR Prompt'}
            </MDBModalHeader>
            <MDBModalBody>
              <IVRPromptForm
                isCreate={modal === 'create'}
                onSubmit={this.handleSubmit}
              >
                <MDBBtn
                  color='primary'
                  outline={true}
                  onClick={this.toggleModal}
                >
                  Cancel
                </MDBBtn>
              </IVRPromptForm>
            </MDBModalBody>
          </MDBModal>

          <MDBModal isOpen={ivrModal} toggle={this.toggleModal}>
            <MDBModalHeader
              className='text-center'
              titleClass='w-100 font-weight-bold'
              toggle={this.toggleModal}
            >
              IVR Setting
            </MDBModalHeader>
            <MDBModalBody>
              <IVRForm onSubmit={this.updateIVRSetting} isCreate={false}>
                <MDBBtn
                  color='primary'
                  outline={true}
                  onClick={this.toggleModal}
                >
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

export default CampaignIVRPromptPage
