import React from 'react';
import { Icon } from 'antd';
import { getColorByChar } from '../../utils/avatar';
import styles from './ChatHeader.css';

export default function ChatHeader({ userName, sessionType }) {
  const nameSub = userName.substr(0, 1).toUpperCase();
  return <div className={styles.header}>
    <span className={styles.avatar} style={{ backgroundColor: getColorByChar(nameSub) }}>
      {nameSub}
    </span>
    <span className={styles.userName}>{userName} {sessionType === 'robot' ? '(机器人)' : null}</span>

    <div className={styles.actions}>
      <Icon type="close" />
    </div>
  </div>
}
