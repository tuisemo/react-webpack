import React from 'react';
import ReactDOM from 'react-dom';
import style from '../style.less';

class PopContextMenu {
  constructor() {
    this.init();
    this.instance = null;
  }
  init() {
    this.el = document.createElement('div');
    document.querySelector('body').appendChild(this.el);
    document.addEventListener('click', e => {
      this.el.style.display = 'none';
    });
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new PopContextMenu();
    }
    return this.instance;
  }
  PopContextMenuDom({ data, x, y }) {
    const { origin } = data;
    const MenuMap = {
      myself: [
        {
          name: '撤回消息',
          callback: () => {}
        },
        {
          name: '转发消息',
          callback: () => {}
        },
        {
          name: '引用消息',
          callback: () => {}
        },
        {
          name: '删除消息',
          callback: () => {}
        }
      ],
      other: [
        {
          name: '转发消息',
          callback: () => {}
        },
        {
          name: '引用消息',
          callback: () => {}
        },
        {
          name: '删除消息',
          callback: () => {}
        }
      ]
    };
    const dom = (
      <div
        className={style['message-contextmenu']}
        style={{
          top: `${y}px`,
          left: `${x - 50}px`
        }}
      >
        {MenuMap[origin].map(config => {
          return (
            <div
              className={style['message-contextmenu_item']}
              onClick={config.callback}
            >
              {config.name}
            </div>
          );
        })}
      </div>
    );
    this.el.style.display = '';
    ReactDOM.render(dom, this.el);
  }
}
export default PopContextMenu;
