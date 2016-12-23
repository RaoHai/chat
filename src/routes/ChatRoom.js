import React from 'react';
import Slider from '../components/Slider';
import ChatUsers from '../components/Conversations/ChatUsers';
import Header from '../components/Header';
import MainPanel from '../components/MainPanel';
import styles from './Chat.css';
import { connect } from 'dva';

export default connect(
  props => ({ auth: props.auth })
)(() => (<div className={styles.wrapper}>
  <div className={styles.chat}>
    <Header />
    <div className={styles.body}>
      <Slider />
      <MainPanel />
      <ChatUsers />
    </div>
  </div>
</div>)
);

