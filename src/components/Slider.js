import React from 'react';
import VisitorList from './Conversations/VisitorList';
import styles from './Slider.css';

export default function Slider() {
  return <div className={styles.slider}>

    <div className={styles.visitorList}>
      <VisitorList />
    </div>
  </div>
}
