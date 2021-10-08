import { connect } from 'react-redux'

import { getProfile } from 'store/profile/reducer'
import { selectContacts } from 'store/smsContacts/reducer'
import ChatsPage from './ChatsPage'

const mapStateToProps = state => ({
  contacts: selectContacts(state),
  user: getProfile(state),
})

export default connect(mapStateToProps)(ChatsPage)
