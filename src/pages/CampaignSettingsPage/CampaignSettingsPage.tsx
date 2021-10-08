import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialize as initializeForm } from 'redux-form'
import { MDBCard, MDBCardBody } from 'mdbreact'

import * as actions from 'store/campaigns/actions'
import CampaignSettingForm from './CampaignSettingForm'
import './CampaignSettingsPage.scss'

interface Props {
  campaign: Campaign
}

const CampaignSettingsPage: React.FC<Props> = ({ campaign }) => {
  const dispatch = useDispatch()

  const updateSettings = values => dispatch(actions.updateCampaign(campaign.id, values))

  useEffect(() => {
    dispatch(
      initializeForm('CampaignSettingForm', {
        name: campaign.name,
        schedules: campaign.schedules,
      }),
    )
  })

  return (
    <MDBCard>
      <MDBCardBody>
        <h4 className="font-weight-bold">Settings</h4>
        <CampaignSettingForm campaign={campaign} onSubmit={updateSettings} />
      </MDBCardBody>
    </MDBCard>
  )
}

export default CampaignSettingsPage
