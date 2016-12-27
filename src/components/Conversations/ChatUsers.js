import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';

import styles from './ChatUser.css';

export default connect(props => ({
  user: props.auth.user,
  users: props.users.users,
}))(props => {
  return (<div className={styles.chatUser}>
    <ul>
    <Icon type="right-square-o" /> [{props.users.length}] 点击发起私聊
    {props.users.map(user =>
      <li className={styles.list} key={user.uid} onClick={ () =>
        props.user && props.user.uid && props.user.uid !== user.uid ? props.dispatch({
          type: 'conversations/add',
          payload: { from: props.user, to: user },
        }) : null }
      >
        <img className={styles.image} src={user.photoURL} /> {user.displayName}
      </li>
    )}
    </ul>
  </div>);
});
