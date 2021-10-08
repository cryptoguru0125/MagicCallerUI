import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import { getAgents } from 'store/agents/reducer'
import TransferNumberForm from './TransferNumberForm'

const selector = formValueSelector('TransferNumberForm')

const mapStateToProps = state => ({
  source: selector(state, 'source'),
  agents: getAgents(state),
})

export default connect(mapStateToProps)(TransferNumberForm)
