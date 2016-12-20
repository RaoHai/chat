import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './VisitorList.less';
import SpinnerAvatar from './SpinnerAvatar';
import { getColorByChar } from '../../utils/avatar';

const select = props => ({
  active: props.conversations.active,
  conversations: props.conversations.list,
})

export default connect(select)(({ dispatch, conversations, active }) => {
  return <div>
    {conversations.map((conversation, idx) => {
      const { userId, userName, sessionType } = conversation;
      const nameSub = userName.substr(0, 1).toUpperCase();
      const conversationCls = classNames({
        [styles.conversation]: true,
        [styles.active]: active === idx,
      });

      return <div
        onClick={() => dispatch({ type: 'conversations/setActive', idx })}
        className={conversationCls}
        key={idx}
      >
        <SpinnerAvatar duration={300} backgroundColor={getColorByChar(nameSub)}>
          {nameSub}
        </SpinnerAvatar>
        {userName}
        <span className={styles.sessionType}>{sessionType === 'robot' ? <Icon type="android" /> : null}</span>
        <span className={styles.close} onClick={() => dispatch({ type: 'conversations/remove', userId })}>
          <Icon type="close" />
        </span>
      </div>
    })}
  </div>
});
