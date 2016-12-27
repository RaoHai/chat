import firebase from '../utils/firebase';

export async function fetch() {
  return firebase.database().ref('chat').limitToLast(100);
}

function buildUser(user) {
  return {
    displayName: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL,
  };
}

export async function enterDefaultChatRoom(user) {
  const defaultParticipants = {
    [user.uid]: buildUser(user),
  };
  return firebase.database().ref(`/conversations/default/participants/`).transaction(currentData => {
    if (currentData === null) {
      return defaultParticipants;
    } else {
      return {
        ...currentData,
        ...defaultParticipants,
      };
    }
  });
}

export async function send({ message, user, cid }) {
  const newChatKey = firebase.database().ref().child(`conversations/${cid}/chats`).push().key;
  const chat = {
    content: message,
    time: Date.now(),
    user: buildUser(user),
  };

  const chatData = {};
  chatData[`/conversations/${cid}/chats/${newChatKey}`] = chat;
  return firebase.database().ref().update(chatData);
}

export async function login(user) {
  firebase.database().ref().child('user').push();
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
