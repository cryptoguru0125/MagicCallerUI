import { connect } from 'react-redux'

import { selectTransfers } from 'store/transfers/reducer'
import { getProfile } from 'store/profile/reducer'
import TransfersPage from './TransfersPage'

const mapStateToProps = state => ({
  transfers: selectTransfers(state),
  user: getProfile(state),
})

export default connect(mapStateToProps)(TransfersPage)
