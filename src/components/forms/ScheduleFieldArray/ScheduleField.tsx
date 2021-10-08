import React from 'react'
import { Field } from 'redux-form'
import { MDBIcon } from 'mdbreact'
import { required } from 'redux-form-validators'

import SelectField from 'components/forms/SelectField'

const daysOptions = [
  { text: 'All days', value: '0,1,2,3,4,5,6' },
  { text: 'Mondays - Fridays', value: '1,2,3,4,5' },
  { text: 'Saturdays - Sundays', value: '0,6' },
  { text: 'Mondays', value: '1' },
  { text: 'Tuesdays', value: '2' },
  { text: 'Wednesdays', value: '3' },
  { text: 'Thursdays', value: '4' },
  { text: 'Fridays', value: '5' },
  { text: 'Saturdays', value: '6' },
  { text: 'Sundays', value: '0' },
]

const timeOptions = []
for (let i = 0; i < 24; i += 1) {
  timeOptions.push({
    text: `${i < 10 ? 0 : ''}${i}:00`,
    value: `${i < 10 ? 0 : ''}${i}:00:00`,
  })
}

interface Props {
  member: any
  onDelete(): void
}

const ScheduleField: React.FC<Props> = ({ member, onDelete }) => (
  <div className='schedule-row'>
    <div className='day-selector'>
      <Field
        label='Days'
        name={`${member}.days`}
        component={SelectField}
        options={daysOptions}
        validate={required()}
      />
    </div>

    <div className='time-selector'>
      <Field
        label='From'
        name={`${member}.from`}
        component={SelectField}
        options={timeOptions}
        validate={required()}
      />
    </div>

    <div className='time-selector'>
      <Field
        label='To'
        name={`${member}.to`}
        component={SelectField}
        options={timeOptions}
        validate={required()}
      />
    </div>

    <MDBIcon icon='minus' className='cp' onClick={onDelete} />
  </div>
)

export default ScheduleField
