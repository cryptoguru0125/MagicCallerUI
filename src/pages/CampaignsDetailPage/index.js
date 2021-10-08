import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { withLayout } from 'pages/Layout'
import CampaignsDetailPage from './CampaignsDetailPage'

export default withLayout(
  'Campaigns Edit',
  withRouter(connect()(CampaignsDetailPage))
)
