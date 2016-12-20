import React from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import { ONLINE } from '../../services/customerService';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './CustomerServiceStatus.css';

const select = props => ({
  serviceName: props.customerService.serviceName,
  status: props.customerService.status,
})

export default connect(select)(({ status, serviceName, dispatch }) => {
  const menu = <Menu>
    <Menu.Item>
      <a onClick={() => dispatch({ type: 'customerService/online' })}> 上线 </a>
    </Menu.Item>
    <Menu.Item>
      <a onClick={() => dispatch({ type: 'customerService/offline' })}> 离线 </a>
    </Menu.Item>
  </Menu>;
  const avatarColor = status === ONLINE ? '#57C6F7' : '#999';
  const statusColor = status === ONLINE ? '#87D068' : '#999';

  return <div className={styles.server}>
    <Dropdown overlay={menu}>
      <div className={styles.avatar} style={{ backgroundColor: avatarColor }}>
        <Icon type="customer-service" className={styles.anticon}/>
        <span className={styles.status} style={{ backgroundColor: statusColor }} />
      </div>
    </Dropdown>
    <div className={styles.serviceName}>
      {serviceName}
    </div>
  </div>
})

