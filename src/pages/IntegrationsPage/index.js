import { connect } from 'react-redux'

import { getIntegrations } from 'store/integrations/reducer'
import { withLayout } from 'pages/Layout'
import IntegrationsPage from './IntegrationsPage'

const mapStateToProps = state => ({
  integrations: getIntegrations(state),
})

export default withLayout(
  'Integrations',
  connect(mapStateToProps)(IntegrationsPage),
)
