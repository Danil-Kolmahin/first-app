import {
  IonApp, IonGrid, IonRow, IonCol, IonContent,
  IonCard, IonCardContent, IonButton,
} from '@ionic/react'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import React, { useCallback, useEffect, useState } from 'react'
import { UserHeader } from './components/UserHeader'
import { FreeDays } from './components/FreeDays'
import { FreeHours } from './components/FreeHours'
import { useDispatch, useSelector } from 'react-redux'
import { changeFullySelectedTime } from './redux/signReducer'
import { getFullySelectedTime } from './redux/signSelector'
import { getMonthName, nextCons, parseTime } from './common/functions'
import { change, get } from './firebase/firebase'


const App: React.FC = () => {
  const [curTime] = useState(new Date()) // new Date(0, 0, 0, 15, 50)
  const [selectedTime, setSelectedTime] = useState(() => nextCons(curTime)[0])
  const fullySelectedTime = useSelector(getFullySelectedTime)
  const dispatch = useDispatch()
  const setTime = useCallback((newDate) =>
    dispatch(changeFullySelectedTime(newDate)), [dispatch])

  useEffect(() => {
    get().then(newDate => {
      setSelectedTime(new Date(newDate))
      setTime(newDate)
    })
  }, [setTime])

  return <IonApp>
    <IonContent>
      <IonGrid>
        <UserHeader />
        <FreeDays {...{ selectedTime, curTime, setSelectedTime }} />
        <FreeHours {...{ selectedTime, curTime, setSelectedTime }} />
        <IonRow>
          <IonCard>
            <IonCardContent>
              <IonRow className='ion-text-center'>
                <IonCol>
                  <div>Дата</div>
                  <div style={{ fontWeight: 700, color: 'black' }}>
                    {fullySelectedTime.getDate() + ' ' + getMonthName(fullySelectedTime)}
                  </div>
                </IonCol>
                <IonCol>
                  <div>Время</div>
                  <div style={{ fontWeight: 700, color: 'black' }}>
                    {parseTime(fullySelectedTime)}
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonButton size='small' color='secondary'
                           onClick={() => {
                             change(selectedTime.toString()).then(() => {
                               dispatch(
                                 changeFullySelectedTime(selectedTime.toString()),
                               )
                             })
                           }}
                >
                  ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ВСТРЕЧУ
                </IonButton>
              </IonRow>
            </IonCardContent>
          </IonCard>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonApp>
}

export default App
