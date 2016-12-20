import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button } from 'antd';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.intro}>
      <div className={styles.login}>
        <div className={styles.title}> Dva Chatter </div>
        <Button type="primary" size="large">
          <Link to="/chat">
          SIGN IN TO START TALKING
          </Link>
        </Button>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
