export const FETCH_INTERVAL = 2000

export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
}

export enum IntegrationPartner {
  DIALPAD = 'Dialpad',
  YTEL = 'Ytel',
  OPTIMIZE = 'Optimize',
}

export enum FollowupGroupType {
  DEFAULT = 'Default',
  INBOUND_CALL = 'InboundCall',
  INBOUND_SMS = 'InboundSMS',
  SCHEDULE = 'Schedule',
}

export enum FollowupType {
  CALL = 'Call',
  SEND_SMS = 'SendSMS',
  ACTIVATE_VOICE = 'ActivateVoice',
  NEW_CHAT = 'NewChat',
  SEND_YTEL = 'SendYtel',
  SCHEDULE = 'Schedule',
}

export enum PromptTypes {
  PROMPT = 'Prompt',
  REMOVE = 'Remove',
  TRANSFER = 'Transfer',
  END_CALL = 'EndCall',
}

export enum TransferSource {
  MANUAL = 'Manual',
  INTERNAL_AGENTS = 'Internal Agents',
}
