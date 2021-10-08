import numeral from 'numeral'
import moment from 'moment-timezone'

export const formatDate = (
  date: any,
  format: string = 'MM/DD/YY HH:mm:ss'
): string => {
  return moment(date)
    .tz(process.env.REACT_APP_TIME_ZONE)
    .format(format)
}

export const formatTime = (secs): string => {
  return moment()
    .startOf('day')
    .seconds(secs)
    .format('HH:mm:ss')
}

export const getDate = (date: any): string => {
  return moment(date).format('YYYY-MM-DD')
}

export const formatDateFromNow = (date): string => {
  const time = moment(date).tz(process.env.REACT_APP_TIME_ZONE)
  const now = moment.tz(new Date(), process.env.REACT_APP_TIME_ZONE)
  const diff = Math.abs(time.diff(now, 'days', true))
  if (time.isSame(now, 'day')) {
    return time.format('h:mm A')
  } else if (diff < 6) {
    return time.format('dddd')
  } else {
    return time.format('MM/DD/YYYY')
  }
}

export const percentValue = (a: number, b: number): number => {
  return a ? Math.round((b / a) * 100) : 0
}

export const percent = (a: number, b: number): number => {
  return numeral(a ? b / a : 0).format(`0.[0]%`)
}

export const formatNumber = (num, prefix = '') => {
  if (!num || isNaN(num)) {
    return `${prefix}0`
  }

  return numeral(num).format(`${prefix},0.[0]`)
}

export const formatCurrency = num => formatNumber(num, '$')

export function getStatus(callLog: CallLog): string {
  if (callLog.type === 'Outbound Text') {
    return callLog.callStatus
  } else if (callLog.callStatus === 'in-progress') {
    return 'In Progress'
  } else if (callLog.callStatus === 'machine_answered') {
    return 'Machine Answered'
  } else if (callLog.callStatus === 'left_voicemail') {
    return 'Left Voicemail'
  } else {
    return callLog.status
  }
}
