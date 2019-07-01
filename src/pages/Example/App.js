import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.less';

class Example extends PureComponent {
  render() {
    return (
      <div className={styles['App']}>
        <div className={styles['App-logo']}></div>
        <Link to="/example" className={styles['LinkButton']}>
          <i>Example</i>
        </Link>
      </div>
    );
  }
}
export default Example;
