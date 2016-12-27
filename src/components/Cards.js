import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './Cards.css';
import { CHAT_TAB, FRIEND_TAB } from '../constants';

export default connect(props => ({
  activeTab: props.ui.activeTab,
}))(props => {
  return (<div className={props.className}>
  </div>);
});
