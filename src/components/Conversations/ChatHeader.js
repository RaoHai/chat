import React from 'react';
import { Icon } from 'antd';
import { getColorByChar } from '../../utils/avatar';
import styles from './ChatHeader.less';

export default function ChatHeader({ userName, sessionType, avatar }) {
  const nameSub = userName.substr(0, 1).toUpperCase();
  return <div className={styles.header}>
    <span className={styles.avatar} style={{ backgroundColor: getColorByChar(nameSub) }}>
      {avatar ? <img src={avatar} /> : <span className={styles.nameSub}>nameSub</span>}
    </span>
    <span className={styles.userName}>{userName} {sessionType === 'robot' ? '(机器人)' : null}</span>

    <div className={styles.actions}>
      <Icon type="close" />
    </div>
  </div>
}
