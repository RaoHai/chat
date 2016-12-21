import React from 'react';
import styles from './ChatPresent.less';
import { getRequestAnimationFrame, easeInOutCubic } from '../../utils/animate';
import moment from 'moment';

const reqAnimFrame = getRequestAnimationFrame();

export default class ChatPresent extends React.Component {
  componentDidUpdate() {
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
    return <div
      ref={c => this.container = c}
      className={styles.chatPresent}
    >
    {this.props.conversations.map((conversation, idx) =>
      <div key={`present-${idx}`} className={styles[conversation.from]}>
        {conversation.from !== 'system'
        ? <span className={styles.time}>{moment(conversation.time).format('HH:mm:ss')}</span>
        : null }
        <div className={styles.bubble}>
        <span dangerouslySetInnerHTML={{ __html: conversation.content }} />
        </div>
      </div>
    )}
    </div>
  }
}
