import React, { useEffect, useRef } from 'react';
import BasicMessage from './basic';
import TextMessage from './text';
import ImageMessage from './image';
import style from '../style.less';
import PopContextMenu from './popContextMenu';

const ins = PopContextMenu.getInstance();

function MessageItem(props) {
  const { data, reverse } = props;
  const { type, content, origin, avatarUrl } = data;

  const messageDom = useRef(null);
  let MessageComp;
  switch (type) {
    case 'system':
      MessageComp = BasicMessage;
      break;
    case 'text':
      MessageComp = TextMessage;
      break;
    case 'image':
      MessageComp = ImageMessage;
      break;
    default:
      MessageComp = TextMessage;
      break;
  }
  useEffect(() => {
    const contextmenu = el => {
      el.addEventListener('contextmenu', e => {
        e.preventDefault();
        const { x, y } = e;
        ins.PopContextMenuDom({ data, x, y });
      });
    };
    messageDom.current && contextmenu(messageDom.current);
  }, []);

  return (
    <div
      className={`${style['message-item']} ${reverse ? style['reverse'] : ''}`}
    >
      {avatarUrl && (
        <div className={style['avatar']}>
          <img src={avatarUrl} />
        </div>
      )}
      <MessageComp ref={messageDom} content={content}></MessageComp>
    </div>
  );
}

export default MessageItem;
