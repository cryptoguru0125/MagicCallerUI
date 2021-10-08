import { connect } from 'react-redux'

import { getNumbers } from 'store/twilio/reducer'
import NumberForm from './NumberForm'

const mapStateToProps = state => ({
  twilioNumbers: getNumbers(state),
})

export default connect(mapStateToProps)(NumberForm)
