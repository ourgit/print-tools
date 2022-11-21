import { BrowserWindow, Menu, app, ipcMain } from 'electron'
const path = require('path');
import menuconfig from '../config/menu'
import config from '@config'
import setIpc from './ipcMain'
import { winURL, loadingURL } from '../config/StaticPath'

var loadWindow = null
var mainWindow = null
setIpc.Mainfunc(config.IsUseSysTitle)

function createMainWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'renderer/assets/icon.png'),
    height: 800,
    useContentSize: true,
    width: 1700,
    minWidth: 1366,
    show: false,
    frame: config.IsUseSysTitle,
    titleBarStyle: 'default',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
      // 如果是开发模式可以使用devTools
      devTools: process.env.NODE_ENV === 'development' || config.build.openDevTools,
      // devTools: true,
      // 在macos中启用橡皮动画
      scrollBounce: process.platform === 'darwin'
    }
  })
  // 这里设置只有开发环境才注入显示开发者模式
  if (process.env.NODE_ENV === 'development' || config.build.openDevTools) {
    menuconfig.push({
      label: '开发者设置',
      submenu: [{
        label: '切换到开发者模式',
        accelerator: 'CmdOrCtrl+I',
        role: 'toggledevtools'
      }]
    })
  }
  // 载入菜单
  // const menu = Menu.buildFromTemplate(menuconfig)
  Menu.setApplicationMenu(null)
  mainWindow.loadURL(winURL)


  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.show()
    if (process.env.NODE_ENV === 'development' || config.build.devTools) mainWindow.webContents.openDevTools(true)
    if (config.UseStartupChart) loadWindow.destroy()
  })
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send("w-max", true)
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send("w-max", false)
  })
  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit();
  })
  createPrintWindow()
}

function loadingWindow() {
  loadWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    backgroundColor: '#222',
    skipTaskbar: true,
    transparent: true,
    resizable: false,
    webPreferences: { experimentalFeatures: true }
  })

  loadWindow.loadURL(loadingURL)

  loadWindow.show()

  setTimeout(() => {
    createMainWindow()
  }, 200)

  loadWindow.on('closed', () => {
    loadWindow = null
  })
}

function initWindow() {
  if (config.UseStartupChart) {
    return loadingWindow()
  } else {
    return createMainWindow()
  }
}

let printWindow
function createPrintWindow() {
  printWindow = new BrowserWindow({
    show: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const fileUrl = path.join(__static, 'printer.html')
  printWindow.loadFile(fileUrl)
  initPrinters()
}
// 打印窗体事件
function initPrinters() {
  // 获取打印机列表
  ipcMain.on('get-printers', (event, data) => {
    const printers = printWindow.webContents.getPrinters()
    mainWindow.webContents.send('get-printers', printers)
  })
  // 获取渲染进程传递过来的打印指令
  ipcMain.on('do-print', (event, data) => {
    const list = mainWindow.webContents.getPrinters()
    const defaultPrinter = list.find(x => x.status === 0 && x.isDefault)
    const dataResult = {
      html: data.html,
      deviceName: data.printerName || defaultPrinter.name
    }
    // 发送指令到printer.html
    printWindow.webContents.send('render-print', dataResult)
  })
  // 从printer.html传递过来的指令
  ipcMain.on('print-do', (e, data) => {
    printWindow.webContents.print({
      silent: true,
      printBackground: false,
      deviceName: data
    })
  })
}

export default initWindow
