/**
 * <Blod>
 * size:表示数据大小
 * type:是MIME类型的字符串
 */
var aBlob = new Blob(blobParts, options);
//  blobParts：它是一个由ArrayBuffer,ArrayBufferView,Blod,DOMString等对象构成

function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(',')[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}

// 保存文件
function saveFile(blob, filename) {
  const a = document.createElement('a');
  a.download = filename;
  a.href = URL.createObjectURL(blob);
  a.click();
  URL.revokeObjectURL(a.href);
}
