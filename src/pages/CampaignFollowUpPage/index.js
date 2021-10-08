import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getFollowUps } from 'store/followups/reducer'
import CampaignFollowUpPage from './CampaignFollowUpPage'

const mapStateToProps = state => ({
  followups: getFollowUps(state),
})

export default withRouter(connect(mapStateToProps)(CampaignFollowUpPage))
