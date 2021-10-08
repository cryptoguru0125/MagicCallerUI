import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getTransferNumbers } from 'store/transferNumbers/reducer'
import CampaignTransferNumbersPage from './CampaignTransferNumbersPage'

const mapStateToProps = state => ({
  numbers: getTransferNumbers(state),
})

export default withRouter(connect(mapStateToProps)(CampaignTransferNumbersPage))
