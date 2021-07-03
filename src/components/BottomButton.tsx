import {
  IonButton,
  IonCard, IonCardContent,
  IonCol, IonRow,
} from '@ionic/react'
import { getMonthName, parseTime } from '../common/functions'
import { change } from '../firebase/firebase'
import { changeFullySelectedTime } from '../redux/signReducer'
import React, { Dispatch } from 'react'

interface BottomButtonProps {
  selectedTime: Date;
  fullySelectedTime: Date;
  dispatch: Dispatch<any>
}

export const BottomButton: React.FC<BottomButtonProps> = (
  { fullySelectedTime, selectedTime, dispatch },
) => {
  return <IonRow className='ion-text-center'>
    <IonCol>
      <IonCard>
        <IonCardContent>
          <IonRow className='ion-text-center'>
            <IonCol style={{ borderRight: '2px solid #E5E5E5' }}>
              <div>Дата</div>
              <div style={{ fontWeight: 700, color: 'black' }}>
                {
                  fullySelectedTime.getDate() + ' ' +
                  getMonthName(fullySelectedTime)
                }
              </div>
            </IonCol>
            <IonCol>
              <div>Время</div>
              <div style={{ fontWeight: 700, color: 'black' }}>
                {parseTime(fullySelectedTime)}
              </div>
            </IonCol>
          </IonRow>
          <IonRow className='ion-text-center'>
            <IonCol>
              <IonButton size='small' color='secondary'
                         onClick={() => {
                           change(selectedTime.toString()).then(() => {
                             dispatch(
                               changeFullySelectedTime(
                                 selectedTime.toString(),
                               ),
                             )
                           })
                         }}
              >
                <div style={{ fontSize: '10px' }}>
                  ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ВСТРЕЧУ
                </div>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>
}
