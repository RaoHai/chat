import React from 'react';
import { Input } from 'antd';
import { connect } from 'dva';
import styles from './Header.less';
import CusomterServiceStatus from './CustomerService/CustomerServiceStatus';

const Search = Input.Search;

export default connect()(props => {
  return (<div className={styles.header}>
    <Search
      style={{ width: 200 }}
      onChange={(e) => props.dispatch({
        type: 'conversations/search',
        payload: e.target.value,
      })}
    />
    <CusomterServiceStatus />
  </div>);
});
