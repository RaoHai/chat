import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu, Dropdown, Icon, Button } from 'antd';
import styles from './IndexPage.css';
import firebase from 'firebase';

function IndexPage(props) {
  const menu = (
    <Menu onClick={(e) => props.dispatch({ type: 'auth/login', payload: e.key }) }>
      <Menu.Item key="google"><Icon type="chrome" /> Sign with Google</Menu.Item>
      <Menu.Item key="github"><Icon type="github" /> Sign with Github</Menu.Item>
    </Menu>
  );
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
