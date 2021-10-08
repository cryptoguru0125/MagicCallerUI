import { connect } from 'react-redux'

import { getTransferOptions } from 'store/transferOptions/reducer'
import CampaignTransferOptionsPage from './CampaignTransferOptionsPage'

const mapStateToProps = state => ({
  options: getTransferOptions(state),
})

export default connect(mapStateToProps)(CampaignTransferOptionsPage)
