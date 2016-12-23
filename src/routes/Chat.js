import React from 'react';
import Slider from '../components/Slider';
import Header from '../components/Header';
import MainPanel from '../components/MainPanel';
import styles from './Chat.css';

export default function Chat() {
  return (<div className={styles.wrapper}>
    <div className={styles.chat}>
      <Header />
      <div className={styles.body}>
        <Slider />
        <MainPanel />
      </div>
    </div>
  </div>);
}
