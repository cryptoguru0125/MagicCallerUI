import { connect } from 'react-redux'

import { selectBlockLists } from 'store/blockLists/reducer'
import { withLayout } from 'pages/Layout'
import BlockListsPage from './BlockListsPage'

const mapStateToProps = state => ({
  blockLists: selectBlockLists(state),
})

export default withLayout(
  'Do-Not-Call',
  connect(mapStateToProps)(BlockListsPage)
)
