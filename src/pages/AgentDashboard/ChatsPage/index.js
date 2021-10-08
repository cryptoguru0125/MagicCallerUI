import { connect } from 'react-redux'

import { selectContacts } from 'store/smsContacts/reducer'
import { withLayout } from 'pages/Layout'
import ChatsPage from './ChatsPage'

const mapStateToProps = state => ({
  contacts: selectContacts(state),
})

export default withLayout('Chats', connect(mapStateToProps)(ChatsPage))
