import { connect } from 'react-redux'

import { getCampaigns } from 'store/campaigns/reducer'
import { withLayout } from 'pages/Layout'
import CampaignsPage from './CampaignsPage'

const mapStateToProps = state => ({
  campaigns: getCampaigns(state),
})

export default withLayout('home', connect(mapStateToProps)(CampaignsPage))
