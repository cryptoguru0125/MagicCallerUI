import { connect } from 'react-redux'

import { getIVRs } from 'store/ivr/reducer'
import CampaignIVRPage from './CampaignIVRPage'

const mapStateToProps = state => ({
  IVRs: getIVRs(state),
})

export default connect(mapStateToProps)(CampaignIVRPage)
