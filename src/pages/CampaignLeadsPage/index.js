import { connect } from 'react-redux'

import { selectLeads } from 'store/leads/reducer'
import { getProfile } from 'store/profile/reducer'
import CampaignLeadsPage from './CampaignLeadsPage'

const mapStateToProps = state => ({
  leads: selectLeads(state),
  user: getProfile(state),
})

export default connect(mapStateToProps)(CampaignLeadsPage)
