import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getIVRPrompts } from 'store/ivrPrompts/reducer'
import CampaignIVRPromptPage from './CampaignIVRPromptPage'

const mapStateToProps = state => ({
  ivrPrompts: getIVRPrompts(state),
})

export default withRouter(connect(mapStateToProps)(CampaignIVRPromptPage))
