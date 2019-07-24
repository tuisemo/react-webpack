import React, { PureComponent } from 'react';
import LoginPage from './index';
import styles from './app.less';

class Example extends PureComponent {
  render() {
    return (
      <div className={styles['App']}>
        <div className={styles['App-wrap']}>
          <div className={styles['taiji']}>
            <div className={styles['yang']}>
              <div className={styles['inner']}></div>
            </div>
            <div className={styles['yin']}>
              <div className={styles['inner']}></div>
            </div>
          </div>
        </div>
        <LoginPage></LoginPage>
      </div>
    );
  }
}
export default Example;
