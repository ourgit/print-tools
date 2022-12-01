export function parseTime(time, format) {
  time = time || new Date()
  format = format || '{y}-{m}-{d} {h}:{i}'
  let date
  if (time instanceof Date) {
    date = time
  } else {
    if (String(time).length === 10) time *= 1000
    date = new Date(parseInt(time) || 0)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function parseMoney(e) {
  let flag = false
  if (e < 0) {
    flag = true
    e = -e
  }
  e = (e < 10 ? '0' + e : e) || 0
  const arr = String(e).split('').reverse()
  let tmp = []
  arr.forEach((item, index, arr) => {
    tmp.push(item)
    if (index === 1) {
      tmp.push('.')
      if (index === arr.length - 1) {
        tmp.push('0')
      }
    } else if ((index - 1) % 3 === 0 && index !== arr.length - 1 && arr[index + 1] !== '-') {
      tmp.push(',')
    }
  })
  if (Number(tmp[0]) === 0 && Number(tmp[1]) === 0) {
    tmp = tmp.slice(3)
  } else if (Number(tmp[0]) === 0 && tmp[2] === '.') {
    tmp = tmp.slice(1)
  }
  let data = tmp.reverse().join('')
  if (flag) {
    data = '-' + data
  }
  return data
}


/**参数说明：
 * 根据长度截取先使用字符串，超长部分追加…
 * str 对象字符串
 * len 目标字节长度
 * 返回值： 处理结果字符串
 */
export function cutString(str, len) {
  //length属性读出来的汉字长度为1
  if (str.length * 2 <= len) {
    return str;
  }
  var strlen = 0;
  var s = "";
  for (var i = 0; i < str.length; i++) {
    s = s + str.charAt(i);
    if (str.charCodeAt(i) > 128) {
      strlen = strlen + 2;
      if (strlen >= len) {
        return s.substring(0, s.length - 1) + "...";
      }
    } else {
      strlen = strlen + 1;
      if (strlen >= len) {
        return s.substring(0, s.length - 2) + "...";
      }
    }
  }
  return s;
}


export function timeContrast(beginTime, endTime) {
  var dateDiff = endTime - beginTime;//时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000)  //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000)  //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000)   //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  var leave4 = leave3 % (60 * 1000)   //计算分钟数后剩余的毫秒数
  var minseconds = Math.round(leave4 / 1000)
  var timeFn = ""
  if (dayDiff > 0) {
    timeFn = dayDiff + "天";
  }
  if (hours > 0) {
    timeFn = timeFn + hours + "小时"
  }
  if (minutes > 0) {
    timeFn = timeFn + minutes + "分"
  }
  timeFn = timeFn + seconds + "秒";
  return timeFn;
}


export function parseDate(time) {
  const dateTmp = time.replace(/-/g, '/')
  const timestamp = Date.parse(dateTmp) / 1000
  return timestamp
}

export function hasLetter(str) {
  for (var i in str) {
    var asc = str.charCodeAt(i);
    if ((asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
      return true;
    }
  }
  return false;
}

export function roundFun(value, n) {
  return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
}


export function generateSerialNumber(num, length) {
  num = num.toString();
  while (length > num.length) {
    num = '0' + num;
  }
  return num;
}