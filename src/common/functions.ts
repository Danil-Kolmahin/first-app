enum daysOfWeek {
  'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
}

type day = {
  dayOfWeek: string
  number: number
}

export const getDays = (curTime: Date): day[] => {
  let copyTime = new Date(curTime)
  const resArr = [{ number: copyTime.getDate(), dayOfWeek: 'Сегодня' }]
  const first = copyTime.getDate()
  while (true) {
    const prevDay = copyTime.getDate()
    copyTime.setDate(prevDay + 1)
    if (first === copyTime.getDate()) return resArr
    resArr.push({
      number: copyTime.getDate(),
      dayOfWeek: daysOfWeek[copyTime.getDay()],
    })
  }
}

const CONSULT_DURATION_M = 50 // minutes
const HOUR_M = 60 // minutes
const DAY_H = 24 // hours

export const nextCons = (date: Date): [Date, boolean] => {
  const prevH = date.getHours()
  const prevM = date.getMinutes()
  const rest = CONSULT_DURATION_M - (prevH * HOUR_M + prevM) % CONSULT_DURATION_M
  let newH = prevM + rest > HOUR_M ? prevH + 1 : prevH
  let newM = prevM + rest > HOUR_M ? prevM + rest - HOUR_M : prevM + rest
  while (newM >= HOUR_M) {
    newM -= 60
    newH++
  }
  const newDate = new Date(date)
  newDate.setMinutes(newM)
  newDate.setHours(newH)
  return [newDate, newH >= DAY_H]
}

export const parseTime = (date: Date) => {
  let hours = date.getHours().toString()
  if (hours.length < 2) hours = '0' + hours
  let minutes = date.getMinutes().toString()
  if (minutes.length < 2) minutes = '0' + minutes
  return hours + ':' + minutes
}

export const getMonthName = (time: Date, lang = 'ru') => new Intl.DateTimeFormat(
  lang, { month: 'short' },
).format(time)

export const getHours = (curTime: Date, isToday = false) => {
  let copyTime = isToday ? new Date(curTime) : new Date(0, 0, 0, 0, 0)
  const first = copyTime.getHours()
  let wasFirst = false
  const resArr = [nextCons(copyTime)[0]]
  while (true) {
    const [res, isCircled] = nextCons(resArr[resArr.length - 1])
    if (isToday && res.getHours() < first) return resArr
    if (isCircled) wasFirst = true
    if (wasFirst && first <= res.getHours()) return resArr
    resArr.push(res)
  }
}