import BigNumber from 'bignumber.js'

/**
 * 生成单件码
 * @param {String} issueId 1位，其中“1”表示由军委改革和编制办公室赋予的组织机构代码；“2”表示由国家统一社会信用代码管理机构赋予的组织机构代码；“3”表示军队资产编目编码机构赋予的组织机构代码。
 * @param {String} orgId 9位，赋码机构为军队单位的，采用军委改革和编制办公室赋予的军队组织机构代码。赋码机构为地方单位的，采用国家统一社会信用代码中的9位主体标识码。其他情况，采用军队资产编目编码机构赋予的组织机构代码。
 * @param {String} seq 6位 优先采用阿拉伯数字，从000001开始编制,数字不够用时采用英文大写字母（I、O除外）。
 * @returns 25位单件码，如果格式错误，返回空串
 */
export function generateSingleCode(issueId, orgId) {
    if (!issueId || !orgId || !seq) return ''
    var date = getTodayDate()
    var seq = generateSeq()
    const tempStr = issueId + '' + orgId + '' + date + '' + seq + ''
    var vcode = generateVcode(tempStr)
    return tempStr + vcode
}

/**
 * 获取当天日期，格式为“YYYYMMDD”
 * @returns
 */
function getTodayDate() {
    var d = new Date()
    var month = d.getMonth() + 1
    month = month < 10 ? '0' + month : month
    var date = d.getDate()
    date = date < 10 ? '0' + date : date
    return d.getFullYear() + '' + month + '' + date
}

/**
 * 生成校验码，1位
 * @param {} issueId 发生单位编号
 * @param {*} orgId 机构编号
 * @param {*} date 日期
 * @param {*} seq 序列号
 */
function generateVcode(str) {
    var sum = 0
    const strcode = String(str)
    for (var i = 0; i < strcode.length; i++) {
        var str = strcode.charAt(i)
        var code = getMapCode(str)
        sum = sum + code * twoPower(i)
    }
    var modValue = new BigNumber(sum).modulo(34)
    return getSecondMapCode(Number(modValue))
}

function twoPower(n) {
    return Math.pow(2, n)
}

function getMapCode(code) {
    switch (code) {
        case '0':
            return 0
        case '1':
            return 1
        case '2':
            return 2
        case '3':
            return 3
        case '4':
            return 4
        case '5':
            return 5
        case '6':
            return 6
        case '7':
            return 7
        case '8':
            return 8
        case '9':
            return 9
        case 'A':
            return 10
        case 'B':
            return 11
        case 'C':
            return 12
        case 'D':
            return 13
        case 'E':
            return 14
        case 'F':
            return 15
        case 'G':
            return 16
        case 'H':
            return 17
        case 'I':
            return 18
        case 'J':
            return 19
        case 'K':
            return 20
        case 'L':
            return 21
        case 'M':
            return 22
        case 'N':
            return 23
        case 'O':
            return 24
        case 'P':
            return 25
        case 'Q':
            return 26
        case 'R':
            return 27
        case 'S':
            return 28
        case 'T':
            return 29
        case 'U':
            return 30
        case 'V':
            return 31
        case 'W':
            return 32
        case 'X':
            return 33
        case 'Y':
            return 34
        case 'Z':
            return 35
        default:
            return 0
    }
}

function getSecondMapCode(code) {
    switch (code) {
        case 0:
            return 'V'
        case 1:
            return 'W'
        case 2:
            return 'X'
        case 3:
            return 'Y'
        case 4:
            return 'Z'
        case 5:
            return '0'
        case 6:
            return '1'
        case 7:
            return '2'
        case 8:
            return '3'
        case 9:
            return '4'
        case 10:
            return '5'
        case 11:
            return '6'
        case 12:
            return '7'
        case 13:
            return '8'
        case 14:
            return '9'
        case 15:
            return 'A'
        case 16:
            return 'B'
        case 17:
            return 'C'
        case 18:
            return 'D'
        case 19:
            return 'E'
        case 20:
            return 'F'
        case 21:
            return 'G'
        case 22:
            return 'H'
        case 23:
            return 'J'
        case 24:
            return 'K'
        case 25:
            return 'L'
        case 26:
            return 'M'
        case 27:
            return 'N'
        case 28:
            return 'P'
        case 29:
            return 'Q'
        case 30:
            return 'R'
        case 31:
            return 'S'
        case 32:
            return 'T'
        case 33:
            return 'U'
    }
}

function generateSeq() {
    const d = new Date();
    const hours = d.getHours() + 1;
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const milliseconds = randomIntFromInterval(100, 999);
    // const milliseconds = d.getMilliseconds();
    const rand = getRandomInt(31);
    return hours.toString(32) + minutes.toString(32)
        + seconds.toString(32) + milliseconds.toString(32) + rand.toString(32)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//
// function to32x(code) {
//     if (code >= 0 && code <= 9) return String(code);
//     switch (code) {
//         case 10:
//             return 'A'
//         case 11:
//             return 'B'
//         case 12:
//             return 'C'
//         case 13:
//             return 'D'
//         case 14:
//             return 'E'
//         case 15:
//             return 'F'
//         case 16:
//             return 'G'
//         case 17:
//             return 'H'
//         case 18:
//             return 'J'
//         case 19:
//             return 'K'
//         case 20:
//             return 'L'
//         case 21:
//             return 'M'
//         case 22:
//             return 'N'
//         case 23:
//             return 'P'
//         case 24:
//             return 'Q'
//         case 25:
//             return 'R'
//         case 26:
//             return 'T'
//         case 27:
//             return 'U'
//         case 28:
//             return 'V'
//         case 29:
//             return 'W'
//         case 30:
//             return 'X'
//         case 31:
//             return 'Y'
//     }
// }
