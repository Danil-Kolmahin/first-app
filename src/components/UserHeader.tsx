import {
  IonCol, IonImg, IonRow,
} from '@ionic/react'
import './UserHeader.css'
import img from '../assets/img.png'
import React from 'react'

export const UserHeader: React.FC = () => {
  return <>
    <IonRow>
      <IonCol>
        <div className='ion-text-center' style={{ fontSize: '20px' }}>
          Алексей Карачинский
        </div>
      </IonCol>
    </IonRow>
    <IonRow class='ion-justify-content-evenly ion-align-items-center'>
      <IonCol size='3.7'>
        <IonImg className='IonImg' src={img} style={{ maxWidth: 100 }} />
      </IonCol>
      <IonCol size='3'>
        <IonRow>
          <div>Длительность консультации</div>
        </IonRow>
        <IonRow>
          <div style={{ fontSize: '18px' }}>50 минут</div>
        </IonRow>
      </IonCol>
    </IonRow>
  </>
}
