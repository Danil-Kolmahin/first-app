import {
    IonCol, IonRow, IonText
} from '@ionic/react';
import React, {Dispatch, SetStateAction} from "react";

const CONSULT_DURATION_M = 50 // minutes
const HOUR_M = 60 // minutes
const DAY_H = 24 // hours

export const nextCons = (date: Date): [Date, boolean] => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const rest = CONSULT_DURATION_M - (hours * HOUR_M + minutes) % CONSULT_DURATION_M
    const newHour = minutes + rest > HOUR_M ? hours + 1 : hours
    const newMin = minutes + rest > HOUR_M ? minutes + rest - HOUR_M : minutes + rest
    return [new Date(0, 0, 0, newHour, newMin), newHour >= DAY_H]
}


export const parseTime = (date: Date) => {
    let hours = date.getHours().toString()
    if (hours.length < 2) hours = '0' + hours
    let minutes = date.getMinutes().toString()
    if (minutes.length < 2) minutes = '0' + minutes
    return hours + ':' + minutes
}

const getHours = (curTime: Date, isToday = false) => {
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

interface FreeHoursProps {
    selectedTime: Date;
    curTime: Date;
    setSelectedTime: Dispatch<SetStateAction<Date>>
}

export const FreeHours: React.FC<FreeHoursProps> = ({curTime, selectedTime, setSelectedTime}) => {
    return <>
        <IonRow>Свободное время</IonRow>
        <IonRow className="ion-nowrap ion-align-items-baseline" style={{overflowX: 'auto',}}>
            {
                getHours(curTime, selectedTime.getDate() === curTime.getDate())
                    .map((time: Date, i: number) => ( // isToday!!!
                    <IonCol key={i} size='3'
                            onClick={() => setSelectedTime((prev) => {
                                const date = new Date(prev)
                                date.setHours(time.getHours())
                                date.setMinutes(time.getMinutes())
                                return date
                            })}
                    >
                        <IonText>
                            <span
                                style={{
                                    fontSize: parseTime(selectedTime) === parseTime(time) ? '25px' : '20px',
                                    color: parseTime(selectedTime) === parseTime(time) ? '#33BDE4' : '#C1C1C1',
                                    fontWeight: parseTime(selectedTime) === parseTime(time) ? 700 : 400
                                }}
                            >{parseTime(time)}</span>
                        </IonText>
                    </IonCol>
                ))
            }
        </IonRow>
    </>;
};
