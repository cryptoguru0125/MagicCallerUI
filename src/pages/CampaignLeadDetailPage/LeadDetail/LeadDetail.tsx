import React from 'react'
import States from 'utils/states'

import './LeadDetail.scss'

interface Props {
  lead: Lead
}

const LeadDetail: React.FC<Props> = ({ lead }) => {
  const state = States.find(item => item.abbreviation === lead.state)

  return (
    <div className='row px-4 lead-detail'>
      <div className='col-sm-6 col-md-4 mb-2'>
        <label>First Name</label>
        <div>{lead.firstName}</div>
      </div>

      <div className='col-sm-6 col-md-4 mb-2'>
        <label>Last Name</label>
        <div>{lead.lastName}</div>
      </div>

      {lead.age && (
        <div className='col-sm-6 col-md-4 mb-2'>
          <label>Age</label>
          <div>{lead.age}</div>
        </div>
      )}

      {lead.email && (
        <div className='col-sm-6 col-md-4 mb-2'>
          <label>Email</label>
          <div>{lead.email}</div>
        </div>
      )}

      <div className='col-sm-6 col-md-4 mb-2'>
        <label>Phone</label>
        <div>{lead.phone}</div>
      </div>

      <div className='col-sm-6 col-md-4 mb-2'>
        <label>Phone Type</label>
        <div>{lead.type}</div>
      </div>

      {lead.timezone && (
        <div className='col-sm-6 col-md-4 mb-2'>
          <label>Timezone</label>
          <div>{lead.timezone}</div>
        </div>
      )}

      {lead.zipCode && (
        <div className='col-sm-6 col-md-4 mb-2'>
          <label>Zipcode</label>
          <div>{lead.zipCode}</div>
        </div>
      )}

      {lead.city && (
        <div className='col-sm-6 col-md-4 mb-2'>
          <label>City</label>
          <div>{lead.city}</div>
        </div>
      )}

      {state && (
        <div className='col-sm-6 col-md-4 mb-2'>
          <label>State</label>
          <div>{state.name}</div>
        </div>
      )}
      {lead.location && (
        <div className='col-sm-6 col-md-4 mb-2'>
          <label>Location</label>
          <div>{lead.location}</div>
        </div>
      )}
      {lead.optimizeID && (
        <div className='col-sm-6 col-md-4 mb-2'>
          <label>OptimizeID</label>
          <div>{lead.optimizeID}</div>
        </div>
      )}
    </div>
  )
}

export default LeadDetail
