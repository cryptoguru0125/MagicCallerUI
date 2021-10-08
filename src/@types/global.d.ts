/// <reference types="rete" />

interface Dispatch {
  dispatch(action: any): any
}

interface FormProps {
  error?: string
  handleSubmit: any
  submitting: boolean
  onSubmit?(values): any
}

interface RouteProps {
  match: {
    path: string
    url: string
    params: any
  }
  location: {
    search: string
  }
}

interface User {
  id: number
  email: string
  role: string
  firstName: string
  lastName: string
  fullName: string
  pusher: any
}
interface Schedule {
  days: string
  from: string
  to: string
}

interface Campaign {
  id: number
  name: string
  schedules: Schedule[]
  postingSpecs?: string
  postingUrl?: string
  token: string
  active: boolean
  createdAt: Date
  totalLeads?: number
  dialed?: number
  contacted?: number
  transferred?: number
  messageCount?: number
}

interface LeadFollowupGroup {
  id: number
  name: string
  status: string
  lastSequence: number
  finalOutcome: string
  startDate: Date
  sequences: FollowupProgress[]
}

interface Lead {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  type: 'Mobile' | 'Landline'
  status: string
  state: string
  city: string
  location: string
  zipCode: string
  timezone: string
  age: number
  optimizeID: string
  createdAt: Date
  attempts?: number
  lastFollowup?: Date
  CampaignId: number
  FollowupGroups?: LeadFollowupGroup[]
}

interface LeadChart {
  summary: {
    leads: number
    contacted: number
    transferred: number
    removed: number
  }
  charts: {
    date: Date
    leads: number
    transferred: number
  }
}

interface FollowupGroup {
  id: number
  name: string
  type: string
  knownOnly: boolean
  activeLeads: number
  totalLeads: number
  answered: number
  transferred: number
  removed: number
}
interface FollowUp {
  id: number
  type: string
  hours: number
  minutes: number
  seconds: number
  leaveVoiceMail: boolean
  mailText: string
  mailAudio: string
  incoming: boolean
  timesUsed: number
  answered: number
  transferred: number
  removed: number
  CampaignId: number
  IVRId: number
}

interface FollowupProgress {
  id: number
  step: number
  progress: string
  estimatedTime: Date
  LeadId: number
  FollowUpId: number
  Lead?: Lead
  FollowUp?: FollowUp
  CallLog?: CallLog
}

interface IVR {
  id: number
  name: string
  voice: string
  speed: number
  timesUsed?: number
  transferred?: number
  CampaignId: number
}

interface ButtonPush {
  action: string
  TransferNumberId?: number
}

interface IVRButton {
  next: number
  used: number
}
interface IVRPrompt {
  id: number
  name: string
  message: string
  audio: string
  goal: string
  type: 'Prompt' | 'Remove' | 'Transfer'
  position: string
  data: object
  buttons: IVRButton[]
  first: boolean
  used: number
  messages?: IVRPromptMessage[]
  TransferOption: TransferOption
}

interface IVRPromptMessage {
  id: number
  content: string
  percent: number
  audio?: string
  used: number
  conversions: number
}

interface PhoneNumber {
  id?: number
  source: string
  number: string
  active: boolean
  calls: number
  answers: number
  answered: number
  transferred: number
  removed: number
}

interface TransferOption {
  id: number
  name: string
  numbersCount?: number
  useInternalAgents: boolean
  CampaignId: number
  createdAt: string
}

interface TransferNumber {
  id: number
  name: string
  phone: string
  source: string
  active: boolean
  createdAt: string
  AgentId?: number
  Agent?: Agent
  CallLogs: CallLog[]
  transferCount?: number
}

interface CallLog {
  id: number
  sid: string
  type: string
  callStatus: string
  status: string
  callDuration: number
  startTime: Date
  endTime: Date
  recordingUrl?: string
  SMS?: string
  LeadId: number
  Lead?: Lead
  PhoneNumber?: PhoneNumber
  IVR?: IVR
  FollowupProgress?: FollowupProgress
}

interface Integration {
  id?: number | string
  name: string
  partner: string
  accountId: string
  apiKey: string
  accountName: string
}

interface Agent {
  id?: number
  name: string
  states: string[]
  phone: string
  agentId: string
  startAge: number
  endAge: number
  IntegrationId?: number
  Integration?: Integration
}

interface SMSContact {
  id: number
  lastMessage: string
  unreadCount: number
  createdAt: Date
  updatedAt: Date
  LeadId: number
  Lead: Lead
  UserId: number
  User?: User
}

interface Message {
  id: number
  content: string
  sent: boolean
  unread: boolean
  createdAt: Date
  SMSContactId: number
  SMSContact?: SMSContact
}

interface Transfer {
  id: number
  transferStart: Date
  transferEnd: Date
  transferDuration: number
  CampaignId: number
  Lead: Lead
  PhoneNumber: PhoneNumber
  TransferNumber: TransferNumber
}

interface BlockList {
  id: number
  type: string
  content: string
}
