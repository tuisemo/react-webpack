import React from 'react';
import styles from './index.less';

function NotFound() {
  return (
    <div className={styles['wrap']}>
      <b className={styles['NotFound']}>404</b>
    </div>
  );
}
export default NotFound;
