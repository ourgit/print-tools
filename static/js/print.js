
var wps = WewinPrintService()
window.wewin = wps


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

    wps.SetPrintFunc(i, labelType[0], [Texts, Codes])
  })
}

// 打印标签1
function template1(Texts, Codes) {
  wps.StartTag(40, 15)

  //---------------------------------------
  //条形码打印
  printTexts = Codes.slice(1, 2)
  wps.PrintBarcode({
    codeType: 4,
    str: Codes[0],
    x: 5,
    y: 2.5,
    rotate: wps.rotate.rotate90,
    height: 10,
    pwidth: 1,
    width: 30
  })
  //---------------------------------------

  //---------------------------------------
  //文字打印
  wps.PrintText({
    str: Texts[0],
    fontHeight: 2.0,
    fontWeight: 500,
    printWidth: 20.0,
    x: 23.46,
    y: 3.13,
    rotate: wps.rotate.rotate90,
    xoffset: 0.25,
    loffset: 0.13,
    maxH: 25,
    singleLine: true,
    ptype: wps.ptype.left,
  })

  wps.EndTag()
}


// 打印标签2
function template1(Texts, Codes) {
  var printTexts = []
  wps.StartTag(50, 50)

  //---------------------------------------
  //二维码打印-注释
  printTexts = Codes.slice(0, 1)
  wps.PrintQrcode({
    str: printTexts[0],
    x: 8,
    y: 8,
    width: 34,
    rotate: 0,
  })
  //---------------------------------------

  //---------------------------------------
  //文字打印-注释
  printTexts = Texts.slice(0, 1)
  console.log('printTexts', printTexts)
  wps.PrintText({
    str: Texts[0],
    fontHeight: 2.0,
    fontWeight: 500,
    printWidth: 20.0,
    x: 23.46,
    y: 3.13,
    rotate: wps.rotate.rotate90,
    xoffset: 0.25,
    loffset: 0.13,
    maxH: 25,
    singleLine: true,
    ptype: wps.ptype.left,
  })

  wps.EndTag()
}

// 打印标签3
function template1(Texts, Codes) {
  var printTexts = []
  wps.StartTag(50, 50)

  //---------------------------------------
  //二维码打印-注释
  printTexts = Codes.slice(0, 1)
  wps.PrintQrcode({
    str: printTexts[0],
    x: 8,
    y: 8,
    width: 34,
    rotate: 0,
  })
  //---------------------------------------

  //---------------------------------------
  //文字打印-注释
  printTexts = Texts.slice(0, 1)
  console.log('printTexts', printTexts)
  wps.PrintText({
    str: Texts[0],
    fontHeight: 2.0,
    fontWeight: 500,
    printWidth: 20.0,
    x: 23.46,
    y: 3.13,
    rotate: wps.rotate.rotate90,
    xoffset: 0.25,
    loffset: 0.13,
    maxH: 25,
    singleLine: true,
    ptype: wps.ptype.left,
  })

  wps.EndTag()
}