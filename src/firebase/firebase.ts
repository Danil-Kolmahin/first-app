import firebase from 'firebase/app'
import 'firebase/firestore'


const config = {
  apiKey: 'AIzaSyAxF6XJ1QEgHLHtvA4OPyooV5lbGhR7Yi0',
  authDomain: 'first-fire-88ec6.firebaseapp.com',
  projectId: 'first-fire-88ec6',
  storageBucket: 'first-fire-88ec6.appspot.com',
  messagingSenderId: '189250449854',
  appId: '1:189250449854:web:1758a020a611b0dd6d09ef',
}

const place = firebase
  .initializeApp(config)
  .firestore()
  .collection('times')
  .doc('HcvMM5Up4Uo8Th4wa9sU')

export const change = async (newTime: string) => await place.set({ cur: newTime })

export const get = async () => ((await place.get()).data() ?? { cur: new Date() }).cur

