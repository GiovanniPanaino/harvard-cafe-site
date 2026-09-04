const JOHANNESBURG_TIME_ZONE = 'Africa/Johannesburg'
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export function getJohannesburgParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-ZA', {
    timeZone: JOHANNESBURG_TIME_ZONE,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const parts = formatter.formatToParts(date)
  const hourPart = parts.find((part) => part.type === 'hour')?.value

  return {
    weekday: parts.find((part) => part.type === 'weekday')?.value,
    hour: Number(hourPart === '24' ? '0' : hourPart),
    minute: Number(parts.find((part) => part.type === 'minute')?.value),
  }
}

export function getJohannesburgNow(date = new Date()) {
  return getJohannesburgParts(date)
}

export function getJohannesburgDayName(date = new Date()) {
  return getJohannesburgParts(date).weekday
}

export function isWeekday(dayName = getJohannesburgDayName()) {
  return WEEKDAYS.includes(dayName)
}

export function isCocktailHappyHourNow(date = new Date()) {
  const parts = getJohannesburgParts(date)

  return isWeekday(parts.weekday) && parts.hour >= 16 && parts.hour < 18
}
