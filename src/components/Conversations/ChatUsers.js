import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';

import styles from './ChatUser.css';

export default connect(props => ({
  users: props.users.users,
}))(props => {
  return (<div className={styles.chatUser}>
    <ul>
    <Icon type="right-square-o" /> Member: {props.users.length}
    {props.users.map(user =>
      <li className={styles.list} key={user.uid}>
        <img className={styles.image} src={user.photoURL} /> {user.displayName}
      </li>
    )}
    </ul>
  </div>);
});
