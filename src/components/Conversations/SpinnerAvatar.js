import React from 'react';
import classnames from 'classnames';
import styles from './SpinnerAvatar.css';

export default function SpinnerAvatar(props) {
  const { backgroundColor, duration } = props;
  const style = {
    animationDuration: `${duration || 10}s`,
  };

  const cls = classnames({
    [styles['avatar-wrapper']]: true,
    active: true,
  });
  return (<div className={cls}>
    <span className={styles['avatar-spinner-mask']} style={style}/>
    <span className={styles['avatar-spinner-mask2']} style={style} />
    <span className={styles['avatar-spinner-mask3']} style={style} />
    <span className={styles['avatar-image']} style={{ backgroundColor }}>
      {props.children}
    </span>
  </div>);
}
