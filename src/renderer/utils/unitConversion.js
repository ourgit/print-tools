// 取屏幕信息用作当前屏幕计算基本参数
export function getDPI() {
  var arrDPI = new Array()
  if (window.screen.deviceXDPI) {
    arrDPI[0] = window.screen.deviceXDPI
    arrDPI[1] = window.screen.deviceYDPI
  } else {
    var tmpNode = document.createElement('DIV')
    tmpNode.style.cssText =
      'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
    document.body.appendChild(tmpNode)
    arrDPI[0] = parseInt(tmpNode.offsetWidth)
    arrDPI[1] = parseInt(tmpNode.offsetHeight)
    tmpNode.parentNode.removeChild(tmpNode)
  }
  return arrDPI
}

// 像素转毫米
export function pxToMM(value) {
  var inch = value / getDPI()[0]
  var c_value = inch * 25.4
  //      console.log(c_value);
  return c_value
}

// 毫米转像素点
export function mmToPx(value) {
  var inch = value / 25.4
  var c_value = inch * getDPI()[0]
  //      console.log(c_value);
  return c_value
}
