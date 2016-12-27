import React from 'react';
import { Input } from 'antd';
import { connect } from 'dva';
import Cards from './Cards';
import CusomterServiceStatus from './CustomerService/CustomerServiceStatus';
import styles from './Header.less';

const Search = Input.Search;

export default connect()(props => {
  return (<div className={styles.header}>
    <Search
      className={styles.search}
      style={{ width: 200 }}
      onChange={(e) => props.dispatch({
        type: 'conversations/search',
        payload: e.target.value,
      })}
    />
    <Cards className={styles.cards} />
    <CusomterServiceStatus className={styles.avatar}/>
  </div>);
});
