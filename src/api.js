
import firebase from 'firebase/compat/app'; //v9

//to use auth

import 'firebase/compat/auth'; //v9

//to use firestore

import 'firebase/compat/firestore'; //v9
import firebaseconfig from './firebaseconfig'

const firebaseApp = firebase.initializeApp(firebaseconfig)

const db = firebaseApp.firestore()

export default {
  fbPopup: async () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    let result = await firebaseApp.auth().signInWithPopup(provider);
    return result;
  }
}
