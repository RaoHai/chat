import firebase from '../utils/firebase';

export async function fetch() {
  return firebase.database().ref('user').limitToLast(100);
}
