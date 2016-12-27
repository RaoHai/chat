import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './VisitorList.less';
import SpinnerAvatar from './SpinnerAvatar';
import { getColorByChar } from '../../utils/avatar';

const select = props => ({
  filterValue: props.conversations.filterValue,
  active: props.conversations.active,
  conversations: props.conversations.list,
});

function highlight(text, highlightValue) {
  if (!highlightValue) return text;
  return text.replace(
    new RegExp(`(${highlightValue})`, 'g'),
    (str, p1) => `<span style="color: #38b8f2">${p1}</span>`
  );
}

export default connect(select)(({ filterValue, dispatch, conversations, active }) => {
  return (<div>
    {conversations
      .filter(({ userName }) => !filterValue || userName.indexOf(filterValue) !== -1)
      .map((conversation, idx) => {
        const { cid, userId, userName, sessionType, avatar } = conversation;
        const nameSub = userName.substr(0, 1).toUpperCase();
        const conversationCls = classNames({
          [styles.conversation]: true,
          [styles.active]: active === idx,
        });
        return (<div
          onClick={() => dispatch({ type: 'conversations/setActive', idx })}
          className={conversationCls}
          key={idx}
        >
          <SpinnerAvatar duration={300} backgroundColor={getColorByChar(nameSub)}>
            {avatar ? <img src={avatar} /> : <span className={styles.nameSub}>{nameSub}</span>}
          </SpinnerAvatar>
          <span dangerouslySetInnerHTML={{ __html: highlight(userName, filterValue) }} />
          <span className={styles.sessionType}>
            {sessionType === 'robot' ? <Icon type="android" /> : null}
          </span>
          <span
            className={styles.close}
            onClick={() => dispatch({ type: 'conversations/remove', payload: { sessionType, cid, userId } })}
          >
            <Icon type="close" />
          </span>
        </div>);
      })
    }
  </div>);
});
