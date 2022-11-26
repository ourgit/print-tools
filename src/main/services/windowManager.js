import { BrowserWindow, Menu, app, ipcMain } from 'electron'
const path = require('path')
import menuconfig from '../config/menu'
import config from '@config'
import setIpc from './ipcMain'
import { winURL, loadingURL } from '../config/StaticPath'
import Store from 'electron-store'
Store.initRenderer()

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
      webviewTag: true,
      webSecurity: false,
      // 如果是开发模式可以使用devTools
      devTools: process.env.NODE_ENV === 'development' || config.build.openDevTools,
      // devTools: true,
      // 在macos中启用橡皮动画
      scrollBounce: process.platform === 'darwin',
    },
  })
  // 这里设置只有开发环境才注入显示开发者模式
  if (process.env.NODE_ENV === 'development' || config.build.openDevTools) {
    menuconfig.push({
      label: '开发者设置',
      submenu: [
        {
          label: '切换到开发者模式',
          accelerator: 'CmdOrCtrl+I',
          role: 'toggledevtools',
        },
      ],
    })
  }
  // 载入菜单
  // const menu = Menu.buildFromTemplate(menuconfig)
  Menu.setApplicationMenu(null)
  mainWindow.loadURL(winURL)

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.show()
    if (process.env.NODE_ENV === 'development' || config.build.devTools)
      mainWindow.webContents.openDevTools(true)
    if (config.UseStartupChart) loadWindow.destroy()
  })
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('w-max', true)
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('w-max', false)
  })
  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })
  ipcMain.on('getPrinterList', async (event) => {
    const list = await mainWindow.webContents.getPrintersAsync()
    mainWindow.webContents.send('getPrinterList', list)
  })
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
    webPreferences: { experimentalFeatures: true },
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

export default initWindow
