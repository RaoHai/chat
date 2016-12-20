import React from 'react';
import RobotConversation from './Conversations/Conversation.Robot';
import ChatConversation from './Conversations/Conversation.Chat';

import styles from './MainPanel.css';
import { connect } from 'dva';


export default connect(props => ({
  list: props.conversations.list,
  robotParams: props.robotParams,
}))(props => {
  return <div className={styles.mainPanel}>
    {props.list.map(conversation => {
      const PanelComponent = conversation.sessionType === 'robot' ? RobotConversation : ChatConversation;
      return <PanelComponent key={conversation.cid} {...props} {...conversation} />;
    })}
  </div>;
});
