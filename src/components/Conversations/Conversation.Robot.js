import React from 'react';
import ChatHeader from './ChatHeader';
import ChatPresent from './ChatPresent';
import ChatInput from './ChatInput';
import styles from './Conversation.css';

export default function RobotConversation(props) {
  const { cid, robotParams, active } = props;
  return <div className={styles.panel} style={active ? { display: 'flex' } : { display: 'none' }}>
    <ChatHeader {...props} />
    <ChatPresent conversations={props.conversations} />
    <ChatInput onSendMessage={(message) => props.dispatch({
      type: 'robot/sendMessage',
      payload: { message, cid, robotParams },
    })}
    />
  </div>
}
