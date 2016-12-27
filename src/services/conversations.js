import request from '../utils/request';
import firebase from '../utils/firebase';

function buildUser(user) {
  return {
    displayName: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL,
  };
}

export async function fetch(entry) {
  return new Promise(resolve =>
    firebase.database().ref(`chat/${entry}`).once('value', resolve)
  );
}

export async function query(times) {
  return request(`/api/fetchMessage?t=${times}`);
}

export async function remove({ userId }) {
  return request(`/api/visitorOffline/${userId}`);
}

export async function createConversation({ from, to }) {
  const key = `${from.uid}-${to.uid}`;
  const defaultChat = {
    participants: {
      [from.uid]: buildUser(from),
      [to.uid]: buildUser(to),
    },
  };
  return firebase.database().ref(`/conversations/${key}`).transaction(currentData => {
    if (currentData === null) {
      return defaultChat;
    }
  });
}

export async function deleteConversation({ cid }) {
  return firebase.database().ref(`conversations/${cid}`).remove();
}
