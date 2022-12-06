// 打印类属性、方法定义
/* eslint-disable */
const Print = function (dom, printName, webview, pageWidth, pageHeight) {
  if (!(this instanceof Print)) return new Print(dom, printName, webview, pageWidth, pageHeight)
  this.printName = printName
  this.webview = webview
  this.pageWidth = pageWidth
  this.pageHeight = pageHeight
  if (typeof dom === 'string') {
    this.dom = document.querySelector(dom)
  } else {
    this.isDOM(dom)
    this.dom = this.isDOM(dom) ? dom : dom.$el
  }

  this.init()
}
Print.prototype = {
  init: function () {
    var content = this.getStyle() + this.getHtml()
    content = content.replace(/\<\!\----\>/g, '')
    console.log(content)
    this.webview.send('webview-print-render', {
      printName: this.printName,
      html: content,
    })
  },
  getStyle: function () {
    var str =
      '<style>html,body,div{margin:0;padding:0;box-sizing: border-box;}@page{size:' +
      this.pageWidth +
      ' ' +
      this.pageHeight +
      '!important;margin: 0px;}</style>'
    return str
  },

  getHtml: function () {
    var inputs = document.querySelectorAll('input')
    var textareas = document.querySelectorAll('textarea')
    var selects = document.querySelectorAll('select')
    var canvass = document.querySelectorAll('canvas')
    var isNeedRemove = document.querySelectorAll('.isNeedRemove')
    for (var k = 0; k < inputs.length; k++) {
      if (inputs[k].type == 'checkbox' || inputs[k].type == 'radio') {
        if (inputs[k].checked == true) {
          inputs[k].setAttribute('checked', 'checked')
        } else {
          inputs[k].removeAttribute('checked')
        }
      } else if (inputs[k].type == 'text') {
        inputs[k].setAttribute('value', inputs[k].value)
      } else {
        inputs[k].setAttribute('value', inputs[k].value)
      }
    }

    for (var k2 = 0; k2 < textareas.length; k2++) {
      if (textareas[k2].type == 'textarea') {
        textareas[k2].innerHTML = textareas[k2].value
      }
    }

    for (var k3 = 0; k3 < selects.length; k3++) {
      console.log(isNeedRemove)
      if (selects[k3].type == 'select-one') {
        var child = selects[k3].children
        for (var i in child) {
          if (child[i].tagName == 'OPTION') {
            if (child[i].selected == true) {
              child[i].setAttribute('selected', 'selected')
            } else {
              child[i].removeAttribute('selected')
            }
          }
        }
      }
    }
    // canvass echars图表转为图片
    for (var k4 = 0; k4 < canvass.length; k4++) {
      if (isNeedRemove.length == 0) {
        var imageURL = canvass[k4].toDataURL('image/png')
        var img = document.createElement('img')
        img.src = imageURL
        img.setAttribute('style', 'display: block;')
        img.className = 'isNeedRemove'
        canvass[k4].style.display = 'none'
        canvass[k4].parentNode.insertBefore(img, canvass[k4].nextElementSibling)
      }
    }
    return this.dom.outerHTML
  },
  isDOM:
    typeof HTMLElement === 'object'
      ? function (obj) {
          return obj instanceof HTMLElement
        }
      : function (obj) {
          return (
            obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
          )
        },
}
const PrintPlugin = {}
PrintPlugin.install = function (Vue, options) {
  // 4. 添加实例方法
  Vue.prototype.$print = Print
}
export default PrintPlugin
