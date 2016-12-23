import React from 'react';
import { connect } from 'dva';
import { Icon, Button } from 'antd';
import styles from './MainPanel.less';

export default connect(props =>
  ({ auth: props.auth })
)(props => {
  return <div className={styles.input}>
    <h3> LOGIN TO CHAT </h3>
    <Button.Group className={styles.button}>
      <Button
        onClick={() => props.dispatch({ type: 'auth/login', payload: 'google' })}
      >
        <Icon type="chrome" /> LOGIN WITH GOOGLE
      </Button>
      <Button
        onClick={() => props.dispatch({ type: 'auth/login', payload: 'github' })}
      >
        <Icon type="github" /> LOGIN WITH GITHUB
      </Button>

       <Button
         onClick={() => props.dispatch({ type: 'auth/login', payload: 'anony' })}
       >
        <Icon type="smile" /> ANONYMOUSLY LOGIN
      </Button>
    </Button.Group>
  </div>
});
