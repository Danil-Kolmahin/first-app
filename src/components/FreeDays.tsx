import {
  IonCard, IonCol, IonImg, IonRow,
} from '@ionic/react'
import firstMode from '../assets/firstMode.svg'
import secondMode from '../assets/secondMode.svg'
import React, { Dispatch, SetStateAction } from 'react'
import { getDays } from '../common/functions'

interface FreeDaysProps {
  selectedTime: Date;
  curTime: Date;
  setSelectedTime: Dispatch<SetStateAction<Date>>
}

export const FreeDays: React.FC<FreeDaysProps> = ({ selectedTime, curTime, setSelectedTime }) => {
  return <>
    <IonRow class='ion-justify-content-between'>
      <IonRow>Возможная дата</IonRow>
      <IonRow>
        <IonImg src={firstMode} />
        <IonImg src={secondMode} />
      </IonRow>
    </IonRow>
    <IonRow className='ion-nowrap' style={{ overflowX: 'auto' }}>
      {
        getDays(curTime).map(
          (obj, i: number) => <IonCol key={i} size='4'>
            <IonCard
              onClick={() =>
                setSelectedTime((prev) => {
                  const date = new Date(prev)
                  date.setDate(obj.number)
                  return date
                })}
              color={selectedTime.getDate() === obj.number ? 'secondary' : ''}
            >
              <IonRow className='ion-text-center'><IonCol>
                {obj.dayOfWeek}
              </IonCol></IonRow>
              <IonRow className='ion-text-center'><IonCol>
                <span style={{ fontSize: '25px' }}>{obj.number}</span>
              </IonCol></IonRow>
            </IonCard>
          </IonCol>,
        )
      }
    </IonRow>
  </>
}
