import { app, dialog } from 'electron'

function relaunchApp (win) {
    dialog.showMessageBox (win, {
        type: 'error',
        title: 'pics',
        message: 'Ha ocurrido un error inesperado. Se reiniciará la aplicación'
    }, () => {
        app.relaunch()
        app.exit(0)
    }) 
}


function setupErrors (win) {
    win.webContents.on('crashed', () => {
        relaunchApp(win)
    })
    
    win.on('unresponsive', () => {
        dialog.showMessageBox (win, {
            type: 'warning',
            title: 'pics',
            message: 'Un proceso está tardando demasiado. Puede esperar o reiniciar la aplicación'
        })
    })

    process.on ('uncaughtException', () => {
        relaunchApp (win)
    })

}

module.exports = setupErrors