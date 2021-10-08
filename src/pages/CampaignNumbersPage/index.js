import { connect } from 'react-redux'

import { getNumbers } from 'store/numbers/reducer'
import CampaignNumbersPage from './CampaignNumbersPage'

const mapStateToProps = state => ({
  numbers: getNumbers(state),
})

export default connect(mapStateToProps)(CampaignNumbersPage)
