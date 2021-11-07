import firebase from 'firebase/compat/app' //v9

//to use auth

import 'firebase/compat/auth' //v9

//to use firestore

import 'firebase/compat/firestore' //v9
import firebaseconfig from './firebaseconfig'

const firebaseApp = firebase.initializeApp(firebaseconfig)

const db = firebaseApp.firestore()

export default {
  fbPopup: async () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    let result = await firebaseApp.auth().signInWithPopup(provider)
    return result
  },
  adduser: async u => {
    await db
      .collection('users')
      .doc(u.id)
      .set(
        {
          name: u.name,
          avatar: u.avatar
        },
        { merge: true }
      )
  },

  getcontactlist: async userid => {
    let list = []
    let results = await db.collection('users').get()
    results.forEach(result => {
      let data = result.data()
      if (result.id !== userid) {
        list.push({
          id: result.id,
          name: data.name,
          avatar: data.avatar
        })
      }
    })
    return list
  },
  addnewchat: async (user, user2) => {
    let newchat = await db.collection('chats').add({
      messages: [],
      users: [user.id, user2.id]
    })
    db.collection('users')
      .doc(user.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newchat.id,
          title: user2.name,
          image: user2.avatar,
          with: user2.id
        })
      })
    db.collection('users')
      .doc(user2.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newchat.id,
          title: user.name,
          image: user.avatar,
          with: user.id
        })
      })
  },
  onchatlist: (userId, setchatlist) => {
    return db
      .collection('users')
      .doc(userId)
      .onSnapshot(doc => {
        if (doc.exists) {
          let data = doc.data()
          if (data.chats) {
            setchatlist(data.chats)
          }
        }
      })
  },
  onchatcontent: (chatId, setlist, setusers) => {
    return db
      .collection('chats')
      .doc(chatId)
      .onSnapshot(doc => {
        if (doc.exists) {
          let data = doc.data()
          setlist(data.messages)
          setusers(data.users)
        }
      })
  },
  sendmessage: async (chatdata, userId, type, body, users) => {
    let now = new Date()
    db.collection('chats')
      .doc(chatdata.chatId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          type,
          author: userId,
          body,
          date: now
        })
      })

    for (let i in users) {
      let u = await db
        .collection('users')
        .doc(users[i])
        .get()
      let uData = u.data()
      if (uData.chats) {
        let chats = [...uData.chats]
        for (let e in chats) {
          if (chats[e].chatId == chatdata.chatId) {
            chats[e].lastmessage = body
            chats[e].lastmessagedate = now
          }
        }
        await db
          .collection('users')
          .doc(users[i])
          .update({
            chats
          })
      }
    }
  }
}
