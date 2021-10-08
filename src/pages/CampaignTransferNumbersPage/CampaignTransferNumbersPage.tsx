import React from 'react'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBSwitch,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact'
import { initialize as initializeForm } from 'redux-form'
import objectPath from 'object-path'

import { getAgents } from 'store/agents/actions'
import { getTransferOption } from 'store/transferOptions/actions'
import * as actions from 'store/transferNumbers/actions'
import { getTransferableIntegrations } from 'store/integrations/actions'
import DatePicker from 'components/DatePicker'
import NumberForm from './TransferNumberForm'
import './CampaignTransferNumbersPage.scss'

interface Props {
  campaign: Campaign
  match: {
    params: {
      optionId: any
    }
  }
  numbers: TransferNumber[]
  dispatch(action: any): Promise<any>
}

interface State {
  transferOption: TransferOption
  modal: string
  dates: Date[]
}

class CampaignTransferNumbersPage extends React.Component<Props, State> {
  state = {
    transferOption: null,
    modal: null,
    dates: [null, null],
  }

  constructor(props) {
    super(props)

    const {
      campaign,
      match: {
        params: { optionId },
      },
    } = this.props

    getTransferOption(optionId).then(
      transferOption => {
        this.setState({ transferOption })
        this.props.dispatch(
          actions.getTransferNumbers({
            TransferOptionId: optionId,
          })
        )
        this.props.dispatch(getTransferableIntegrations())
      },
      () => {
        this.props.dispatch(push(`/campaigns/${campaign.id}/transfer-options`))
      }
    )

    this.props.dispatch(getAgents())
  }

  handleAddNumber = () => {
    this.props.dispatch(
      initializeForm('TransferNumberForm', {
        source: 'Manual',
        IntegrationId: '',
      })
    )
    this.setState({
      modal: 'create',
    })
  }

  handleEdit = (number: TransferNumber) => {
    this.props.dispatch(initializeForm('TransferNumberForm', number))
    this.setState({
      modal: 'edit',
    })
  }

  handleDeleteNumber = row => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) {
      return
    }

    this.props.dispatch(actions.deleteTransferNumber(row.id))
  }

  toggleModal = () => {
    this.setState({ modal: null })
  }

  handleSubmit = values => {
    const { transferOption } = this.state
    const data = {
      ...values,
      IntegrationId: values.IntegrationId === '' ? null : values.IntegrationId,
      TransferOptionId: transferOption.id,
    }

    if (values.id) {
      return this.props
        .dispatch(actions.updateTransferNumber(values.id, data))
        .then(() => {
          this.toggleModal()
        })
    } else {
      return this.props
        .dispatch(actions.createTransferNumber(data))
        .then(() => {
          this.toggleModal()
        })
    }
  }

  handleActive = (number: TransferNumber, active: boolean) => {
    this.props.dispatch(actions.updateTransferNumber(number.id, { active }))
  }

  handleDateChange = dates => {
    const { transferOption } = this.state

    this.props.dispatch(
      actions.getTransferNumbers({
        TransferOptionId: transferOption.id,
        startDate: dates ? dates[0] : null,
        endDate: dates ? dates[1] : null,
      })
    )

    this.setState({ dates })
  }

  render() {
    const { numbers } = this.props
    const { transferOption, modal } = this.state

    if (!transferOption) {
      return null
    }

    return (
      <MDBCard>
        <MDBCardBody>
          <div className='d-flex align-items-center'>
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <Link
                  to={`/campaigns/${transferOption.CampaignId}/transfer-options`}
                >
                  {transferOption.name}
                </Link>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active={true}>Numbers</MDBBreadcrumbItem>
            </MDBBreadcrumb>

            <div className='ml-auto mr-3'>
              <DatePicker
                value={this.state.dates}
                onChange={this.handleDateChange}
              />
            </div>
            <MDBBtn
              color='primary'
              onClick={this.handleAddNumber}
              className='mr-0'
            >
              Add Number
            </MDBBtn>
          </div>

          <MDBTable className='align-middle'>
            <colgroup>
              <col width='72px' />
              <col width='auto' />
              <col width='auto' />
              <col width='auto' />
              <col width='auto' />
              <col width='110px' />
            </colgroup>
            <MDBTableHead>
              <tr>
                <th />
                <th>Name</th>
                <th>Number</th>
                <th>Source</th>
                <th>Transfers Received</th>
                <th />
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {numbers.map(row => (
                <tr key={row.id}>
                  <td>
                    <MDBSwitch
                      className='m-0'
                      checked={row.active}
                      onChange={e => {
                        this.handleActive(row, e.target.checked)
                      }}
                      labelLeft=''
                      labelRight=''
                    />
                  </td>
                  <td>{objectPath.get(row, 'Agent.name') || row.name}</td>
                  <td>{objectPath.get(row, 'Agent.phone') || row.phone}</td>
                  <td>{row.source}</td>
                  <td>{row.transferCount || 0}</td>
                  <td className='text-right'>
                    <MDBBtn
                      size='sm'
                      color='success'
                      className='m-0 mr-2'
                      onClick={() => {
                        this.handleEdit(row)
                      }}
                      floating={true}
                    >
                      <MDBIcon icon='pen' size='sm' />
                    </MDBBtn>

                    <MDBBtn
                      size='sm'
                      color='danger'
                      className='m-0'
                      onClick={() => {
                        this.handleDeleteNumber(row)
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
              {modal === 'create'
                ? 'Add Transfer Number'
                : 'Edit Transfer Number'}
            </MDBModalHeader>
            <MDBModalBody>
              <NumberForm onSubmit={this.handleSubmit}>
                <div className='button-row'>
                  {modal === 'create' ? (
                    <MDBBtn type='submit' color='primary'>
                      Add Number
                    </MDBBtn>
                  ) : (
                    <MDBBtn type='submit' color='primary'>
                      Update Number
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
              </NumberForm>
            </MDBModalBody>
          </MDBModal>
        </MDBCardBody>
      </MDBCard>
    )
  }
}

export default CampaignTransferNumbersPage
