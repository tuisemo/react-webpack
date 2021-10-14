import React, { forwardRef } from 'react';
import style from '../style.less';

const BasicMessage = forwardRef(({ content }, ref) => {
  return (
    <div
      className={style['message-item_sys']}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
});
export default BasicMessage;
