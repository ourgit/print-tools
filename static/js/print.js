var wps = WewinPrintService()
window.wewin = wps

//修改-标签预览
wps.PageViewPrint = function () {
  wps.StartPreviewTag(
    {
      //预览页面标题
      title: '重庆品胜 - 资管打印 - 打印预览',
      //修改版本号
      version: 'TY_123',
    },
    function (i) {
      //预览标签构建方法

      //解析数据
      //EntityTypeId节点
      var labelType = wps.ParseElement(i, 'TemplateId')
      //Text节点
      var Texts = wps.ParseElement(i, 'Text')
      //Code节点
      var Codes = wps.ParseElement(i, 'Code')

      // 标签1(123)
      if (labelType[0] == 'template6') {
        //检验打印数据是否符合规范
        // wps.SetRightData({
        //   on: false, //是否开启详细说明弹窗(true: 弹窗显示详情; false: 控制台输出，无详情)
        //   name: ['labelType', 'Text', 'Code'],
        //   data: [
        //     { elem: labelType, num: 1 },
        //     { elem: Texts, num: 1 },
        //     { elem: Codes, num: 2 },
        //   ],
        // })

        //添加下拉框标签型号
        wps.SetLabelName({
          '50-50': '0',
        })

        //获取标签下拉列表
        var selValue = wps.GetLabelName()

        if (selValue == '0') {
          //支持的打印机型号
          wps.SetPrintInfo('wewin makeid')

          //-----------------------预览背景图片----------------------------
          wps.AddPreviewBackground({
            index: i, //标签索引
            width: 50, //图片宽度
            height: 50, //图片高度
            scale: {
              on: false, //是否开启缩放
              tagScale: 1, //标签缩放比例(非IE浏览器)
              checkScale: 1, //复选框缩放比例(非IE浏览器)
              tagOffset: 0, //标签左侧偏移值
              firstTagTop: 0, //第一张标签向上偏移值
              otherTagTop: 2, //其他标签向上偏移值
              ratio: 1, //缩小比例(全浏览器)
            },
          })
          //---------------------------------------------------------

          //-----------------------文本预览----------------------------
          //注释
          wps.AddPreviewText({
            str: [Texts[0] + ' ' + Texts[1]], //文本内容
            fontHeight: 2, //字体大小
            printWidth: 34, //换行宽度
            x: 7, //x坐标
            y: 41, //y坐标
            maxH: 8, //最大高度
            xoffset: 0.25,
            loffset: 0.13,
            ptype: wps.ptype.center, //对齐方式
            width: 34, //文本块宽度
            rotate: false, //文本180度翻转
            rotateLowIE: {
              //当旋转开启(rotate:true)时低版本IE浏览器的坐标(覆盖上方xy)
              x: 0,
              y: 0,
            },
            debug: true, //调试模式：打开文本边框
          })
          //---------------------------------------------------------

          //-----------------------动态二维码预览----------------------
          //注释
          wps.AddPreviewQrcode({
            qrcodeName: 'qrcode' + i + '4', //二维码名称
            x: 7, //x坐标
            y: 7, //y坐标
            rotate: false, //二维码180度翻转
            rotateLowIE: {
              //当旋转开启(rotate:true)时低版本IE浏览器的坐标(覆盖上方xy)
              x: 0,
              y: 0,
            },
          })
          //---------------------------------------------------------
        }
      }
    },
    function (i) {
      //预览生成动态二维码方法
      //EntityTypeId节点
      var labelType = wps.ParseElement(i, 'TemplateId')
      //Text节点
      var Texts = wps.ParseElement(i, 'Text')
      //Code节点
      var Codes = wps.ParseElement(i, 'Code')

      //获取标签下拉列表
      var selValue = wps.GetLabelName()

      // 标签1(123)
      if (labelType[0] == 'template6') {
        if (selValue == 0) {
          var printTexts = Codes.slice(0, 1)
          wps.GenerateQrcode({
            qrcodeName: '.qrcode' + i + '4',
            str: printTexts[0],
            width: 34,
            height: 34,
          })
        }
      }
    }
  )
}

//标签打印
wps.PageDoLabelPrint = function () {
  //开始调用标签打印函数
  wps.StartPrintTag(function (i) {
    //EntityTypeId节点
    var labelType = wps.ParseElement(i, 'TemplateId')
    //Text节点
    var Texts = wps.ParseElement(i, 'Text')
    //Code节点
    var Codes = wps.ParseElement(i, 'Code')
    //Code节点
    var Hidden = wps.ParseElement(i, 'Hidden')
    //Code节点
    var Ratio = wps.ParseElement(i, 'Ratio')
    switch (labelType[0]) {
      case 'template1':
        wps.SetPrintFunc(i, template1, [Texts, Codes, Hidden, Ratio])
        break
      case 'template2':
        wps.SetPrintFunc(i, template2, [Texts, Codes, Hidden, Ratio])
        break
      case 'template3':
        wps.SetPrintFunc(i, template3, [Codes, Ratio])
        break
      case 'template4':
        wps.SetPrintFunc(i, template4, [Texts, Codes, Hidden, Ratio])
        break
      case 'template5':
        wps.SetPrintFunc(i, template5, [Texts, Codes, Hidden, Ratio])
        break
      case 'template6':
        wps.SetPrintFunc(i, template6, [Texts, Codes, Hidden, Ratio])
        break
      case 'template7':
        wps.SetPrintFunc(i, template7, [Texts, Codes, Hidden, Ratio])
        break
      case 'template8':
        wps.SetPrintFunc(i, template8, [Texts, Codes, Hidden, Ratio])
        break
      case 'template9':
        wps.SetPrintFunc(i, template9, [Texts, Codes, Hidden, Ratio])
        break
    }
  })
}

// 打印标签1
function template1(Texts, Codes, Hidden, Ratio) {
  wps.StartTag(40, 15)

  //---------------------------------------
  //条形码打印
  wps.PrintQrcode({
    str: Codes[0],
    x: 5,
    y: 2.5,
    width: 30,
    rotate: wps.rotate.rotate0,
  })
  //---------------------------------------

  //---------------------------------------
  //文字打印
  wps.PrintText({
    str: Texts[0],
    fontHeight: 3.8,
    fontWeight: 500,
    printWidth: 30,
    x: 5,
    y: 13,
    rotate: wps.rotate.rotate0,
    maxH: 2.5,
    singleLine: true,
    ptype: wps.ptype.center,
    singleLine: true,
  })

  wps.EndTag()
}

// 打印标签2
function template2(Texts, Codes, Hidden, Ratio) {
  wps.StartTag(50, 50)

  //---------------------------------------
  //二维码打印
  wps.PrintQrcode({
    str: Codes[0],
    x: 7,
    y: 7,
    width: wps.rotate.rotate0,
    rotate: 0,
  })
  //---------------------------------------

  //---------------------------------------
  //文字打印
  wps.PrintText({
    str: Texts[0],
    fontHeight: 3.8,
    fontWeight: 500,
    printWidth: 34,
    x: 7,
    y: 41,
    rotate: wps.rotate.rotate0,
    maxH: 8,
    singleLine: true,
    ptype: wps.ptype.center,
    singleLine: true,
  })

  wps.EndTag()
}

// 打印标签3
function template3(Codes, Ratio) {
  wps.StartTag(15, 15)

  //---------------------------------------
  //二维码打印
  wps.PrintQrcode({
    str: Codes[0],
    x: 2.5,
    y: 2.5,
    width: 10,
    rotate: wps.rotate.rotate0,
  })
  //---------------------------------------

  wps.EndTag()
}

// 打印标签4
function template4(Texts, Codes, Hidden, Ratio) {
  wps.StartTag(70, 30)

  //---------------------------------------
  //二维码打印
  wps.PrintQrcode({
    str: Codes[0],
    x: 2.5,
    y: 2.5,
    width: 10,
    rotate: wps.rotate.rotate0,
  })
  //---------------------------------------

  wps.EndTag()
}

// 打印标签5
function template5(Texts, Codes, Hidden, Ratio) {
  wps.StartTag(70, 30)

  //---------------------------------------
  //二维码打印
  wps.PrintQrcode({
    str: Codes[0],
    x: 2.5,
    y: 2.5,
    width: 10,
    rotate: wps.rotate.rotate0,
  })
  //---------------------------------------

  wps.EndTag()
}

// 打印标签6
function template6(Texts, Codes, Hidden, Ratio) {
  wps.StartTag(50, 50)

  //---------------------------------------
  //二维码打印
  wps.PrintQrcode({
    str: Codes[0],
    x: 7,
    y: 7,
    width: wps.rotate.rotate0,
    rotate: 0,
  })
  //---------------------------------------

  //---------------------------------------
  //文字打印
  wps.PrintText({
    str: [Texts[0] + ' ' + Texts[1]], //文本内
    fontHeight: 2,
    fontWeight: 500,
    printWidth: 34,
    x: 7,
    y: 41,
    rotate: wps.rotate.rotate0,
    maxH: 8,
    singleLine: true,
    ptype: wps.ptype.center,
    singleLine: true,
  })

  wps.EndTag()
}

// 打印标签7
function template7(Texts, Codes, Hidden, Ratio) {
  wps.StartTag(70, 30)

  //---------------------------------------
  //二维码打印
  wps.PrintQrcode({
    str: Codes[0],
    x: 2.5,
    y: 2.5,
    width: 10,
    rotate: wps.rotate.rotate0,
  })
  //---------------------------------------

  wps.EndTag()
}

// 打印标签8
function template8(Texts, Codes, Hidden, Ratio) {
  wps.StartTag(70, 30)

  //---------------------------------------
  //二维码打印
  wps.PrintQrcode({
    str: Codes[0],
    x: 2.5,
    y: 2.5,
    width: 10,
    rotate: wps.rotate.rotate0,
  })
  //---------------------------------------

  wps.EndTag()
}

// 打印标签9
function template9(Texts, Codes, Hidden, Ratio) {
  wps.StartTag(70, 30)

  //---------------------------------------
  //二维码打印
  wps.PrintQrcode({
    str: Codes[0],
    x: 2.5,
    y: 2.5,
    width: 10,
    rotate: wps.rotate.rotate0,
  })
  //---------------------------------------

  wps.EndTag()
}
