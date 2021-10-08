import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact'
import { initialize as initializeForm } from 'redux-form'

import { getDate } from 'utils'
import * as actions from 'store/numbers/actions'
import * as twilioActions from 'store/twilio/actions'
import DatePicker from 'components/DatePicker'
import NumberForm from './NumberForm'
import NumbersTable from './NumbersTable'
import './CampaignNumbersPage.scss'

interface Props {
  campaign: Campaign
  numbers: PhoneNumber[]
  dispatch(action: any): Promise<any>
}

interface State {
  dates: Date[]
  modal: boolean
}

class CampaignNumbersPage extends React.Component<Props, State> {
  state = {
    dates: [null, null],
    modal: false,
  }

  constructor(props) {
    super(props)

    const { campaign } = this.props

    this.props.dispatch(
      actions.getNumbers({
        CampaignId: campaign.id,
      })
    )
    this.props.dispatch(twilioActions.getTwilioNumbers())
  }

  loadData = () => {
    const { campaign } = this.props
    const { dates } = this.state

    return this.props.dispatch(
      actions.getNumbers({
        CampaignId: campaign.id,
        startDate: dates[0] ? getDate(dates[0]) : null,
        endDate: dates[1] ? getDate(dates[1]) : null,
      })
    )
  }

  handleAddNumber = () => {
    this.props.dispatch(
      initializeForm('NumberForm', {
        source: 'Twilio',
      })
    )
    this.setState({
      modal: true,
    })
  }

  handleDeleteNumber = (row: PhoneNumber) => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) {
      return
    }

    this.props.dispatch(actions.deleteNumber(row.id)).then(() => {
      this.props.dispatch(twilioActions.types.addTwilioNumber(row.number))
    })
  }

  handleActiveNumber = (row, newStatus) => {
    this.props.dispatch(
      actions.updateNumber(row.id, {
        active: Number(newStatus),
      })
    )
  }

  toggleModal = () => {
    this.setState({ modal: null })
  }

  handleSubmit = values => {
    const { campaign } = this.props

    return this.props
      .dispatch(
        actions.createNumber({
          ...values,
          CampaignId: campaign.id,
        })
      )
      .then(() => {
        this.props.dispatch(
          twilioActions.types.removeTwilioNumber(values.number)
        )
        this.toggleModal()
      })
  }

  handleDateChange = dates => {
    this.setState({ dates }, () => {
      this.loadData()
    })
  }

  render() {
    const { numbers } = this.props
    const { dates, modal } = this.state

    return (
      <React.Fragment>
        <div className='d-flex mb-3 justify-content-center'>
          <DatePicker value={dates} onChange={this.handleDateChange} />
        </div>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex'>
              <h4 className='font-weight-bold'>Numbers</h4>
              <MDBBtn
                color='primary'
                onClick={this.handleAddNumber}
                className='ml-auto mr-0'
              >
                Add Number
              </MDBBtn>
            </div>
            <NumbersTable
              data={numbers}
              onActiveChange={this.handleActiveNumber}
              onDelete={this.handleDeleteNumber}
            />

            <MDBModal isOpen={!!modal} toggle={this.toggleModal}>
              <MDBModalHeader
                className='text-center'
                titleClass='w-100 font-weight-bold'
                toggle={this.toggleModal}
              >
                Add Number
              </MDBModalHeader>
              <MDBModalBody>
                <NumberForm onSubmit={this.handleSubmit}>
                  <div className='button-row'>
                    <MDBBtn type='submit' color='primary'>
                      Add Number
                    </MDBBtn>
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
      </React.Fragment>
    )
  }
}

export default CampaignNumbersPage
