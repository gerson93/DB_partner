'use strict'

import { ipcMain } from 'electron'


function setIpcMain (win) {
    ipcMain.on('add-partner', (event, partner) => {
        win.webContents.send('add-partner', partner)
    })

    ipcMain.on('give-me-info', (event, id) => {
        win.webContents.send('give-me-info', id )
    })

    ipcMain.on('here-is-data', (event, partner) => {
        win.webContents.send('here-is-data', partner)
        console.log('main: escuche y send hereisdata')
    })
}


module.exports = setIpcMain