import { connect } from 'react-redux'

import { getAgents } from 'store/agents/reducer'
import { getIntegrations } from 'store/integrations/reducer'
import { selectAgentUsers } from 'store/users/reducer'
import { withLayout } from 'pages/Layout'
import AgentsPage from './AgentsPage'

const mapStateToProps = state => ({
  integrations: getIntegrations(state),
  agents: getAgents(state),
  userAgents: selectAgentUsers(state),
})

export default withLayout('Agents', connect(mapStateToProps)(AgentsPage))
