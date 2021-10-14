import React from 'react';
import MessageItem from './message/index';
import style from './style.less';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgList: [
        {
          id: '1',
          message: {
            origin: 'system',
            type: 'system',
            content: '仅显示最近30天的聊天记录'
          }
        },
        {
          id: '2',
          message: {
            origin: 'other',
            type: 'text',
            avatarUrl: 'https://avatars.githubusercontent.com/u/16770486?v=4',
            content: '你好，我将会发送一个二维码给你，你可以右键转发给其他朋友'
          }
        },
        {
          id: '3',
          message: {
            origin: 'other',
            type: 'image',
            avatarUrl: 'https://avatars.githubusercontent.com/u/16770486?v=4',
            content:
              'https://www.ringcentral.com/content/dam/rc-www/cn/images/content/join-us/qr-png-rendition.webp'
          }
        },
        {
          id: '4',
          message: {
            origin: 'system',
            type: 'system',
            content:
              '聊天中涉及隐私，请谨慎点击，或直接<a href="http://www.google.com">举报</a>该内容'
          }
        },
        {
          id: '5',
          message: {
            origin: 'myself',
            type: 'text',
            avatarUrl: 'https://avatars.githubusercontent.com/u/16770486?v=4',
            content: '好的，我已收到'
          }
        }
      ]
    };
  }
  render() {
    const { msgList } = this.state;
    return (
      <div className={style['wrap']}>
        {msgList.map(item => (
          <MessageItem
            key={item.id}
            data={item.message}
            reverse={item.message.origin == 'myself'}
          ></MessageItem>
        ))}
      </div>
    );
  }
}
export default App;
