import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Icon, Button } from 'antd';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.intro}>
      <div className={styles.login}>
        <div className={styles.title}>
          <img src="https://zos.alipayobjects.com/rmsportal/hXPAkjiVgmrxvEYufwRO.png" />
        </div>
        <Button.Group>
          <Button type="primary">
            <Link to="/chat">
            <Icon type="message" /> START TALKING
            </Link>
          </Button>
          <Button >
            <Link to="/chatroom">
            <Icon type="team" /> CHAT ROOM
            </Link>
          </Button>
        </Button.Group>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
