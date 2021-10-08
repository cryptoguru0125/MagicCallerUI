import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import { getSpinner } from 'store/app/reducer'
import { getIntegrations, getNumbers } from 'store/integrations/reducer'
import AgentForm from './AgentForm'

const selector = formValueSelector('AgentForm')

const mapStateToProps = state => ({
  isNumbersLoading: getSpinner(state, 'integrationNumbers'),
  integrations: getIntegrations(state),
  numbers: getNumbers(state),
  IntegrationId: selector(state, 'IntegrationId'),
})

export default connect(mapStateToProps)(AgentForm)
