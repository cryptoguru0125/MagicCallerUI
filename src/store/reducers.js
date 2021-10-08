import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import app from './app/reducer'
import profile from './profile/reducer'
import twilio from './twilio/reducer'
import campaigns from './campaigns/reducer'
import leads from './leads/reducer'
import followupGroups from './followupGroups/reducer'
import followups from './followups/reducer'
import ivr from './ivr/reducer'
import ivrPrompts from './ivrPrompts/reducer'
import numbers from './numbers/reducer'
import transferOptions from './transferOptions/reducer'
import transferNumbers from './transferNumbers/reducer'
import callLogs from './callLogs/reducer'
import integrations from './integrations/reducer'
import agents from './agents/reducer'
import messages from './messages/reducer'
import smsContacts from './smsContacts/reducer'
import users from './users/reducer'
import livedata from './livedata/reducer'
import transfers from './transfers/reducer'
import blockLists from './blockLists/reducer'

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    app,
    form,
    profile,
    twilio,
    campaigns,
    leads,
    followupGroups,
    followups,
    ivr,
    ivrPrompts,
    numbers,
    transferOptions,
    transferNumbers,
    callLogs,
    integrations,
    agents,
    messages,
    smsContacts,
    users,
    livedata,
    transfers,
    blockLists,
  })

export default rootReducer
