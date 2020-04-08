'use strict'

import { app, BrowserWindow, Tray, globalShortcut, protocol } from 'electron'
import devtools from './devtools'
import setupErrors from './handle-error'
import setIpcMain from './ipcMainEvents'
import { screen } from 'electron'
import path from 'path'

global.win //eslint-disable-line

if (process.env.NODE_ENV === 'development') {
    devtools()
}
app.on('before-quit', () => {
    globalShortcut.unregisterAll()
})

app.on('ready', () => {
    protocol.registerFileProtocol('plp', (request, callback) => {
        const url = request.url.substr(6)
        callback({ path: path.normalize(url) })
      }, (error) => {
        if (error) throw error
      })

    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    global.win = new BrowserWindow({
        width: width,
        height: height,
        title: 'PICs',
        center: true,
        maximizable: true,
        show: false,
        nodeIntegration: false
    })

    globalShortcut.register('CommandOrControl+Alt+v', () => {
        global.win.show()
        global.win.focus()
    })
    setupErrors (global.win)
    setIpcMain (global.win)
    
    global.win.once('ready-to-show', () => {
        global.win.show()
    })

    global.win.on('closed', () => {
        global.win = null /* se iguala a null para que no quede en memoria el objeto */
        app.quit() /* cuando el objeto win escucha un "closed", app se cierra */
    }) 
    

    global.win.loadURL(`file://${__dirname}/renderer/index.html`)
    global.win.toggleDevTools() /*Abre herramientas de desarrollo en la ventana de trabajo  */
})

