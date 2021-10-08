import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import CampaignLeadDetailPage from './CampaignLeadDetailPage'

export default withRouter(connect()(CampaignLeadDetailPage))
