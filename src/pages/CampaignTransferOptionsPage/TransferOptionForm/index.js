import { connect } from 'react-redux'

import { getNumbers } from 'store/twilio/reducer'
import TransferOptionForm from './TransferOptionForm'

const mapStateToProps = state => ({
  twilioNumbers: getNumbers(state),
})

export default connect(mapStateToProps)(TransferOptionForm)
