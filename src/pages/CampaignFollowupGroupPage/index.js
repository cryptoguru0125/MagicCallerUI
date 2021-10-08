import { connect } from 'react-redux'

import { selectFollowupGroups } from 'store/followupGroups/reducer'
import CampaignFollowupGroupPage from './CampaignFollowupGroupPage'

const mapStateToProps = state => ({
  followupGroups: selectFollowupGroups(state),
})

export default connect(mapStateToProps)(CampaignFollowupGroupPage)
