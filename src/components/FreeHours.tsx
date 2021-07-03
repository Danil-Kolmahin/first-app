import {
  IonCol, IonRow, IonText,
} from '@ionic/react'
import React, { Dispatch, SetStateAction } from 'react'
import { getHours, parseTime } from '../common/functions'

interface FreeHoursProps {
  selectedTime: Date;
  curTime: Date;
  setSelectedTime: Dispatch<SetStateAction<Date>>
}

export const FreeHours: React.FC<FreeHoursProps> = (
  { curTime, selectedTime, setSelectedTime },
) => {
  return <>
    <IonRow>Свободное время</IonRow>
    <IonRow className='ion-nowrap ion-align-items-baseline'
            style={{ overflowX: 'auto' }}>
      {
        getHours(curTime, selectedTime).map((time: Date, i: number) => (
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
                style={
                  parseTime(selectedTime) === parseTime(time) ?
                    {
                      fontSize: '25px',
                      color: '#33BDE4',
                      fontWeight: 700,
                    } : {
                      fontSize: '20px',
                      color: '#C1C1C1',
                      fontWeight: 400,
                    }
                }
              >{parseTime(time)}</span>
            </IonText>
          </IonCol>
        ))
      }
    </IonRow>
  </>
}
