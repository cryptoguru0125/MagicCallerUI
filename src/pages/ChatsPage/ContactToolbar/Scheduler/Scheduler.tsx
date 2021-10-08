import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { MDBBtn, MDBIcon } from 'mdbreact'
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment-timezone'

import classes from './Scheduler.module.scss'
import { showNotify } from 'utils/notify'

interface Props {
  followupGroups: FollowupGroup[]
  onSchedule(params): Promise<any>
}

interface States {
  date: Date
  isPopupOpen: boolean
  [key: string]: any
}

class Scheduler extends React.Component<Props, States> {
  state = {
    date: null,
    hour: null,
    minute: null,
    meridiem: null,
    followupGroupId: '',
    isPopupOpen: false,
  }

  hours: any = []
  minutes: any = []

  constructor(props) {
    super(props)

    this.hours = []
    for (let i = 0; i <= 12; i += 1) {
      this.hours.push(
        <option key={i} value={i}>
          {`${i}`.padStart(2, '0')}
        </option>
      )
    }

    this.minutes = []
    for (let i = 0; i <= 59; i += 1) {
      this.minutes.push(
        <option key={i} value={i}>
          {`${i}`.padStart(2, '0')}
        </option>
      )
    }
  }

  handleDateChange = date => {
    this.setState({ date })
  }

  handleSelectChange = e => {
    const name: any = e.target.name
    this.setState({
      [name]: e.target.value,
    })
  }

  scheduleCall = async () => {
    const { hour, minute, meridiem, followupGroupId } = this.state

    if (!followupGroupId) {
      showNotify('Please select a followup', 'error')
      return
    }

    const date = moment.tz(
      `${moment(this.state.date).format('YYYY-MM-DD')}`,
      process.env.REACT_APP_TIME_ZONE
    )

    date.set({
      hour: meridiem === 'AM' ? Number(hour) : 12 + Number(hour),
      minute: Number(minute),
    })

    // check if time is past
    if (moment().isAfter(date)) {
      showNotify('You can not schedule in the past', 'error')
      return
    }

    await this.props.onSchedule({ time: date.toDate(), followupGroupId })
    this.togglePopup()
  }

  togglePopup = () => {
    const { isPopupOpen } = this.state

    if (isPopupOpen) {
      this.setState({ isPopupOpen: false })
    } else {
      this.setState({
        date: new Date(),
        hour: '0',
        minute: '0',
        meridiem: 'AM',
        isPopupOpen: true,
      })
    }
  }

  render() {
    const { followupGroups } = this.props
    const { isPopupOpen } = this.state

    return (
      <div className={classes.container}>
        <span
          role='button'
          className={classes.btnCalendar}
          title='Schedule'
          onClick={this.togglePopup}
        >
          <MDBIcon far={true} icon='calendar-alt' />
        </span>
        {isPopupOpen && (
          <div className={classes.popup}>
            <OutsideClickHandler
              onOutsideClick={this.togglePopup}
              disabled={!isPopupOpen}
            >
              <div className='d-flex'>
                <Calendar
                  date={this.state.date}
                  onChange={this.handleDateChange}
                />
                <div className={classes.timeCol}>
                  <div className='mb-3'>
                    <label className='font-weight-bold'>Time</label>
                    <div className='d-flex'>
                      <select
                        name='hour'
                        className='form-control'
                        value={this.state.hour}
                        onChange={this.handleSelectChange}
                      >
                        {this.hours}
                      </select>

                      <select
                        name='minute'
                        className='form-control'
                        value={this.state.minute}
                        onChange={this.handleSelectChange}
                      >
                        {this.minutes}
                      </select>

                      <select
                        name='meridiem'
                        className='form-control'
                        value={this.state.meridiem}
                        onChange={this.handleSelectChange}
                      >
                        <option value='AM'>AM</option>
                        <option value='PM'>PM</option>
                      </select>
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label className='font-weight-bold'>Followup</label>
                    <select
                      name='followupGroupId'
                      className='form-control w-100'
                      value={this.state.followupGroupId}
                      onChange={this.handleSelectChange}
                    >
                      <option value=''>--Select--</option>
                      {followupGroups.map(group => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='text-center'>
                    <MDBBtn
                      className='mt-4'
                      color='primary'
                      size='sm'
                      onClick={this.scheduleCall}
                    >
                      Schedule
                    </MDBBtn>
                  </div>
                </div>
              </div>
            </OutsideClickHandler>
          </div>
        )}
      </div>
    )
  }
}

export default Scheduler
