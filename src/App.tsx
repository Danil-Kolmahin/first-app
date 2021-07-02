// import {Redirect, Route} from 'react-router-dom';
// import {IonApp, IonCol, IonImg, IonRouterOutlet} from '@ionic/react';
// import {IonReactRouter} from '@ionic/react-router';
// import Home from './pages/Home';
// import ViewMessage from './pages/ViewMessage';
import img from './assets/img.png';
import {
    IonApp, IonGrid, IonRow, IonCol, IonContent,
    IonImg, IonChip, IonLabel, IonText, IonCard, IonCardContent, IonButton, //IonCardHeader, IonItem, IonInput
} from '@ionic/react';
import firstMode from './assets/firstMode.svg'
import secondMode from './assets/secondMode.svg'

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
import {useState} from "react";

const CONSULT_DURATION = 50 // minutes

const nextCons = (date: Date): [Date, boolean] => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const rest = CONSULT_DURATION - (hours * 60 + minutes) % CONSULT_DURATION
    const newHour = minutes + rest > 60 ? hours + 1 : hours
    const newMin = minutes + rest > 60 ? minutes + rest - 60 : minutes + rest
    return [new Date(0, 0, 0, newHour, newMin), newHour >= 24]
}

const parseTime = (date: Date) => {
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
    const resArr = [copyTime]
    while (true) {
        const [res, isCircled] = nextCons(resArr[resArr.length - 1])
        if (isToday && res.getHours() < first) return resArr
        if (isCircled) wasFirst = true
        if (wasFirst && first <= res.getHours()) return resArr
        resArr.push(res)
    }
}

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

const App: React.FC = () => {
    const [curTime, setCurTime] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState(new Date(0, 0, 5, 15, 50)) //new Date(0, 0, 0, 15, 50)
    // func(new Date(0, 0, 0, 0, 40))
    return <IonApp>
        <IonContent>
            <IonGrid>
                <IonRow><IonCol>
                    <div className="ion-text-center">Алексей Карачинский</div>
                </IonCol></IonRow>
                <IonRow class="ion-justify-content-center">
                    <IonCol size="3">
                        <IonImg src={img} style={{maxWidth: 100}}/>
                    </IonCol>
                    <IonCol size="3">
                        <IonRow>Длительность консультации</IonRow>
                        <IonRow><span style={{textAlign: 'center',}}>50 минут</span></IonRow>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonRow>Возможная дата</IonRow>
                    <IonRow>
                        <IonImg src={firstMode}/>
                        <IonImg src={secondMode}/>
                    </IonRow>
                </IonRow>
                <IonRow className="ion-nowrap" style={{overflowX: 'auto',}}>
                    {
                        getDays(curTime).map((obj: day) => (
                            selectedTime.getDate() === obj.number ?
                                <IonCol><IonCard><IonCardContent>
                                    <IonRow><IonLabel>{obj.dayOfWeek}</IonLabel></IonRow>
                                    <IonRow><IonLabel>{obj.number}</IonLabel></IonRow>
                                </IonCardContent></IonCard></IonCol> :
                                <IonCol><IonCard><IonCardContent>
                                    <IonRow><IonLabel>{obj.dayOfWeek}</IonLabel></IonRow>
                                    <IonRow><IonLabel>{obj.number}</IonLabel></IonRow>
                                </IonCardContent></IonCard></IonCol>
                        ))
                    }
                </IonRow>
                <IonRow>Свободное время</IonRow>
                <IonRow className="ion-nowrap" style={{overflowX: 'auto',}}>
                    {/*<IonDatetime disabled displayFormat="HH mm" value={new Date().toISOString()} />*/}
                    {
                        getHours(curTime, false).map((time: Date, i: number) => (
                            parseTime(selectedTime) === parseTime(time) ?
                                <IonCol><IonText key={i} color="secondary">
                                    <h3>{parseTime(time)}</h3>
                                </IonText></IonCol> :
                                <IonCol><IonText key={i} color="dark">
                                    <h4>{parseTime(time)}</h4>
                                </IonText></IonCol>
                        ))
                    }
                </IonRow>
                <IonRow>
                    <IonCard>
                        <IonCardContent>
                            <IonRow>
                            <IonCol>
                                <IonRow>Дата</IonRow>
                                <IonRow>26 мая</IonRow>
                            </IonCol>
                            <IonCol>
                                <IonRow>Время</IonRow>
                                <IonRow>18:30</IonRow>
                            </IonCol>
                                </IonRow>
                            <IonRow>
                                <IonButton size="small" color="secondary">
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
