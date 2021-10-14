import React, { forwardRef } from 'react';
import style from '../style.less';

const ImageMessage = forwardRef(({ content }, ref) => {
  return (
    <div ref={ref} className={style['message-item_image']}>
      <img src={content}></img>
    </div>
  );
});

export default ImageMessage;
