import {
    IonApp, IonGrid, IonRow, IonCol, IonContent,
    IonCard, IonCardContent, IonButton,
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React, {useState} from "react";
import {UserHeader} from "./components/UserHeader";
import {FreeDays} from "./components/FreeDays";
import {FreeHours, nextCons, parseTime} from "./components/FreeHours";

const App: React.FC = () => {
    const [curTime] = useState(new Date()) // new Date(0, 0, 0, 15, 50)
    const [selectedTime, setSelectedTime] = useState(() => {
        const date = new Date(curTime)
        date.setHours(nextCons(curTime)[0].getHours())
        date.setMinutes(nextCons(curTime)[0].getMinutes())
        return date
    })
    const [fullySelectedTime, setFullySelectedTime] = useState(selectedTime)
    return <IonApp>
        <IonContent>
            <IonGrid>
                <UserHeader/>
                <FreeDays {...{selectedTime, curTime, setSelectedTime}}/>
                <FreeHours {...{selectedTime, curTime, setSelectedTime}}/>
                <IonRow>
                    <IonCard>
                        <IonCardContent>
                            <IonRow className="ion-text-center">
                                <IonCol>
                                    <div>Дата</div>
                                    <div style={{fontWeight: 700, color: 'black'}}>
                                        {
                                            fullySelectedTime.getDate() + ' ' +
                                            new Intl.DateTimeFormat('ru', {month: 'short'})
                                                .format(fullySelectedTime)
                                        }
                                    </div>
                                </IonCol>
                                <IonCol>
                                    <div>Время</div>
                                    <div style={{fontWeight: 700, color: 'black'}}>
                                        {parseTime(fullySelectedTime)}
                                    </div>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonButton size="small" color="secondary"
                                           onClick={() => setFullySelectedTime(selectedTime)}
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
};

export default App;
