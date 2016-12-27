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
    <Icon type="right-square-o" /> Member: {props.users.length}
    {props.users.map(user =>
      <li className={styles.list} key={user.uid} onClick={ () =>
        props.dispatch({
          type: 'conversations/add',
          payload: { from: props.user, to: user },
        })}
      >
        <img className={styles.image} src={user.photoURL} /> {user.displayName}
      </li>
    )}
    </ul>
  </div>);
});
