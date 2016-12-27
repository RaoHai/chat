import React from 'react';
import Slider from '../components/Slider';
import ChatUsers from '../components/Conversations/ChatUsers';
import Header from '../components/Header';
import MainPanel from '../components/MainPanel';
import styles from './Chat.css';
import { CHAT_TAB, FRIEND_TAB } from '../constants';
import { connect } from 'dva';

export default connect(
  props => ({ auth: props.auth, activeTab: props.ui.activeTab })
)(({ activeTab }) => (<div className={styles.wrapper}>
  <div className={styles.chat}>
    <Header />
    {activeTab === CHAT_TAB ? <div className={styles.body}>
      <Slider />
      <MainPanel />
      <ChatUsers />
    </div> : <div className={styles.body}> friends</div>}
  </div>
</div>)
);

