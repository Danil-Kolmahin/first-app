import {
    IonCard, IonCol, IonImg, IonRow
} from '@ionic/react';
import firstMode from "../assets/firstMode.svg";
import secondMode from "../assets/secondMode.svg";
import React, {Dispatch, SetStateAction} from "react";

enum daysOfWeek {
    'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
}

type day = {
    dayOfWeek: string
    number: number
}

const getDays = (curTime: Date): Array<day> => {
    let copyTime = new Date(curTime)
    const resArr = [{number: copyTime.getDate(), dayOfWeek: 'Сегодня'}]
    const first = copyTime.getDate()
    while (true) {
        const prevDay = copyTime.getDate()
        copyTime.setDate(prevDay + 1)
        if (first === copyTime.getDate()) return resArr
        resArr.push({
            number: copyTime.getDate(),
            dayOfWeek: daysOfWeek[copyTime.getDay()]
        })
    }
}

interface FreeDaysProps {
    selectedTime: Date;
    curTime: Date;
    setSelectedTime: Dispatch<SetStateAction<Date>>
}

export const FreeDays: React.FC<FreeDaysProps> = ({selectedTime, curTime, setSelectedTime}) => {
    return <>
        <IonRow class="ion-justify-content-between">
            <IonRow>Возможная дата</IonRow>
            <IonRow>
                <IonImg src={firstMode}/>
                <IonImg src={secondMode}/>
            </IonRow>
        </IonRow>
        <IonRow className="ion-nowrap" style={{overflowX: 'auto',}}>
            {
                getDays(curTime).map(
                    (obj: day, i: number) => <IonCol key={i} size='4'>
                        <IonCard
                            onClick={() =>
                                setSelectedTime((prev) => {
                                    const date = new Date(prev)
                                    date.setDate(obj.number)
                                    return date
                                })}
                            color={selectedTime.getDate() === obj.number ? 'secondary' : ''}
                        >
                            <IonRow className="ion-text-center"><IonCol>
                                {obj.dayOfWeek}
                            </IonCol></IonRow>
                            <IonRow className="ion-text-center"><IonCol>
                                <span style={{fontSize: '25px'}}>{obj.number}</span>
                            </IonCol></IonRow>
                        </IonCard>
                    </IonCol>
                )
            }
        </IonRow>
    </>;
};
