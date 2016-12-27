export default function getUserMeta(userData, uid) {
  const userMeta = {
    userId: null,
    userName: '',
    avatar: [],
  };
  const { participants } = userData;
  for (const key in participants) {
    if (participants.hasOwnProperty(key) && key !== uid) {
      userMeta.userId = participants[key].uid;
      userMeta.userName += participants[key].displayName;
      userMeta.avatar.push(participants[key].photoURL);
    }
  }
  return userMeta;
}


