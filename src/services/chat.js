import firebase from '../utils/firebase';

export async function fetch() {
  return firebase.database().ref('chat').limitToLast(100);
}

export async function send({ message, user }) {
  const newChatKey = firebase.database().ref().child('chat').push().key;
  const chat = {
    content: message,
    time: Date.now(),
    user: {
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
    },
  };

  const chatData = {}
  chatData[`/chat/${newChatKey}`] = chat;
  return firebase.database().ref().update(chatData);
}

export async function login(user) {
  const newUserKey = firebase.database().ref().child('user').push().key;
  const userData = {};
  userData[`/user/${user.uid}`] = {
    displayName: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL,
  };
  return firebase.database().ref().update(userData);
}

export async function logout(uid) {
  return firebase.database().ref(`/user/${uid}`).remove();
}
