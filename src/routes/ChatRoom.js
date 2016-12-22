import React from 'react';
import Slider from '../components/Slider';
import ChatUsers from '../components/Conversations/ChatUsers';
import Header from '../components/Header';
import Login from '../components/Login';
import MainPanel from '../components/MainPanel';
import styles from './Chat.css';
import { connect } from 'dva';

export default connect(props => ({ auth: props.auth }))(props => <div className={styles.wrapper}>
  <div className={styles.chat}>
    <Header />
    <div className={styles.body}>
      <Slider />
      {props.auth.user || props.auth.isAnonymous ? <MainPanel /> : <Login />}
      <ChatUsers />
    </div>
  </div>
</div>);

