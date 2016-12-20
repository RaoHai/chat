import React from 'react';
import Slider from '../components/Slider';
import MainPanel from '../components/MainPanel';
import styles from './Chat.css';

export default function Chat(props) {
  return <div className={styles.wrapper}>
    <div className={styles.chat}>
      <Slider />
      <MainPanel />
    </div>
  </div>
}
