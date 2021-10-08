import { connect } from 'react-redux'

import { getCallLogs } from 'store/callLogs/reducer'
import CampaignCallLogPage from './CampaignCallLogPage'

const mapStateToProps = state => ({
  callLogs: getCallLogs(state),
})

export default connect(mapStateToProps)(CampaignCallLogPage)
