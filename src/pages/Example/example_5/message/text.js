import React, { forwardRef } from 'react';
import style from '../style.less';

const TextMessage = forwardRef(({ content }, ref) => {
  return (
    <div ref={ref} className={style['message-item_text']}>
      {content}
    </div>
  );
});
export default TextMessage;
