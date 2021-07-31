/**
 * 浏览器通知
 * [带图带事件的桌面通知]
 */
function doNotify(title, options = {}, events = {}) {
  const notification = new Notification(title, options);
  /**
   * [options]:Object
   * dir:文字的方向
   * lang:通知中所使用的的语言
   * body:通知中额外显示的字符串
   * tag:赋予通知一个ID，以便在必要的时候对通知进行刷新、替换或更新
   * icon:一个图片的URL，将被用于显示通知的图标
   */
  for (let event in events) {
    notification[event] = events[event];
  }
}
// demo
function notify(title, options = {}, events = {}) {
  if (!('Notification' in window)) {
    return console.error('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    doNotify(title, options, events);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        doNotify(title, options, events);
      }
    });
  }
}
// 拓展属性：表明当前通知显示授权状态【浏览器是否允许弹出通知】
Notification.permission; // granted || denied
