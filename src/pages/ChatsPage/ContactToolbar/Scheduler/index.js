import { connect } from 'react-redux'

import { selectScheduleFollowupGroups } from 'store/followupGroups/reducer'
import Scheduler from './Scheduler'

const mapStateToProps = state => ({
  followupGroups: selectScheduleFollowupGroups(state),
})

export default connect(mapStateToProps)(Scheduler)
