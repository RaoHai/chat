import React from 'react';
import { connect } from 'dva';
import styles from './ChatPresent.less';
import { getRequestAnimationFrame, easeInOutCubic } from '../../utils/animate';
import moment from 'moment';

const reqAnimFrame = getRequestAnimationFrame();

class ChatPresent extends React.Component {
  componentDidMount() {
    this.scrollIntoView();
  }
  componentDidUpdate() {
    this.scrollIntoView();
  }
  scrollIntoView = () => {
    const startTime = Date.now();
    const scrollTop = this.container.scrollTop;
    const targetScrollTop = this.container.scrollHeight;
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.container.scrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);
      if (time < 450) {
        reqAnimFrame(frameFunc);
      }
    };
    reqAnimFrame(frameFunc);
  }
  render() {
    const { user, sessionType } = this.props;
    return (<div
      ref={c => {this.container = c;}}
      className={styles.chatPresent}
    >
    {this.props.conversations.map((conversation, idx) => {
      const isMe = user && conversation.user && conversation.user.uid === this.props.user.uid;
      const isSolo = sessionType === 'solo';
      const from = isMe ? 'me' : conversation.from || 'chat';
      return (<div key={`present-${idx}`} className={styles[from]}>
        {conversation.user && !isMe ? <img src={conversation.user.photoURL} /> : null }

        <span className={styles.meta}>

          {conversation.user && !isMe && !isSolo ?
            <span className={styles.userName}>
              {conversation.user.displayName}
            </span>
          : null}

          {conversation.from !== 'system' && !(conversation.from === 'chat' && isMe) ?
            <span className={styles.time}>
              {moment(conversation.time).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          : null }

        </span>

        <div className={styles.bubble}>
        <span dangerouslySetInnerHTML={{ __html: conversation.content }} />
        </div>
      </div>);
    })}
    </div>);
  }
}

export default connect(props => ({
  user: props.auth.user,
}))(ChatPresent);
