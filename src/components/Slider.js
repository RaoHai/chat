import React from 'react';
import CusomterServiceStatus from './CustomerService/CustomerServiceStatus';
import VisitorList from './Conversations/VisitorList';
import styles from './Slider.css';

export default function Slider() {
  return <div className={styles.slider}>
    <CusomterServiceStatus />

    <div className={styles.visitorList}>
      <VisitorList />
    </div>
  </div>
}
