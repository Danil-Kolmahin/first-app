enum daysOfWeek {
  'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
}

type day = {
  dayOfWeek: string
  number: number
}

export const getDays = (curTime: Date): day[] => {
  let copyTime = new Date(curTime)
  const first = copyTime.getDate()
  const resArr = [{ number: first, dayOfWeek: 'Сегодня' }]
  while (true) {
    copyTime.setDate(copyTime.getDate() + 1)
    if (first > copyTime.getDate()) return resArr
    resArr.push({
      number: copyTime.getDate(),
      dayOfWeek: daysOfWeek[copyTime.getDay()],
    })
  }
}

const CONSULT_DURATION_M = 50 // minutes
const HOUR_M = 60 // minutes
const DAY_H = 24 // hours

export const nextConsultation = (date: Date): [Date, boolean] => {
  const prevH = date.getHours()
  const prevM = date.getMinutes()
  const rest = CONSULT_DURATION_M - (prevH * HOUR_M + prevM) % CONSULT_DURATION_M
  const newH = prevM + rest > HOUR_M ? prevH + 1 : prevH
  const newM = prevM + rest > HOUR_M ? prevM + rest - HOUR_M : prevM + rest
  const newDate = new Date(date)
  newDate.setHours(newH)
  newDate.setMinutes(newM)
  return [newDate, newH >= DAY_H]
}

export const parseTime = (date: Date) => {
  let hours = date.getHours().toString()
  if (hours.length < 2) hours = '0' + hours
  let minutes = date.getMinutes().toString()
  if (minutes.length < 2) minutes = '0' + minutes
  return hours + ':' + minutes
}

export const getMonthName = (time: Date, lang = 'ru') => new Intl
  .DateTimeFormat(lang, { month: 'short' }).format(time)

export const getHours = (curTime: Date, selectedTime: Date) => {
  const isToday = curTime.getDate() === selectedTime.getDate()
  let copyTime = new Date(curTime)
  if (!isToday) {
    copyTime.setHours(0)
    copyTime.setMinutes(0)
  }
  const first = copyTime.getHours()
  const resArr = [nextConsultation(copyTime)[0]]
  while (true) {
    const [res, isCircled] = nextConsultation(resArr[resArr.length - 1])
    if ((isToday && res.getHours() < first) || isCircled) return resArr
    else resArr.push(res)
  }
}