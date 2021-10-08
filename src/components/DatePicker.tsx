import React from 'react'
import classNames from 'classnames'
import OutsideClickHandler from 'react-outside-click-handler'
import { MDBBtn, MDBIcon } from 'mdbreact'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'

import './DatePicker.scss'

interface Props {
  value: Date[]
  onChange(dates: Date[]): void
}

interface States {
  startDate: Date
  endDate: Date
  isPopupOpen: boolean
}

class DatePicker extends React.Component<Props, States> {
  state = {
    startDate: null,
    endDate: null,
    isPopupOpen: false,
  }

  handleSelect = ({ selection }) => {
    this.setState({
      startDate: selection.startDate,
      endDate: selection.endDate,
    })
  }

  handleUpdate = () => {
    const { startDate, endDate } = this.state

    this.props.onChange([startDate, endDate])
    this.togglePopup()
  }

  togglePopup = () => {
    const { value } = this.props
    const { isPopupOpen } = this.state

    if (isPopupOpen) {
      this.setState({ isPopupOpen: false })
    } else {
      this.setState({
        isPopupOpen: true,
        startDate: value[0] || new Date(),
        endDate: value[1] || new Date(),
      })
    }
  }

  render() {
    const { value } = this.props
    const { startDate, endDate, isPopupOpen } = this.state

    return (
      <div className='datepicker'>
        <div
          role='button'
          className='datepicker-button'
          onClick={this.togglePopup}
        >
          {value[0] && value[1]
            ? `${moment(value[0]).format('MMMM DD')} - ${moment(
                value[1]
              ).format('MMMM DD')}`
            : 'Choose a date'}
          <MDBIcon far={true} icon='calendar-alt' />
        </div>
        <div
          className={classNames('datepicker-popup', { opened: isPopupOpen })}
        >
          <OutsideClickHandler
            onOutsideClick={this.togglePopup}
            disabled={!isPopupOpen}
          >
            <DateRangePicker
              ranges={[{ startDate, endDate, key: 'selection' }]}
              onChange={this.handleSelect}
              direction='horizontal'
              months={2}
              showDateDisplay={false}
            />
            <div className='action-row'>
              <MDBBtn size='sm' onClick={this.togglePopup}>
                Cancel
              </MDBBtn>
              <MDBBtn color='primary' size='sm' onClick={this.handleUpdate}>
                Update
              </MDBBtn>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    )
  }
}

export default DatePicker
