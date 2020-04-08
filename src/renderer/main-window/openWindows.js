import { remote, ipcRenderer } from 'electron'
import path from 'path'

function OpenAddPartnerWindow () {
    const browserWindow = remote.BrowserWindow

    const AddPartnerWindow = new browserWindow ({
        width: 400,
        height: 400,
        tittle: 'Preferencias',
        center: true,
        frame: false,
        show: false
    })

    AddPartnerWindow.once ('ready-to-show', () => {
        AddPartnerWindow.show ()
        AddPartnerWindow.focus ()
    })

    AddPartnerWindow.loadURL(`file://${path.join(__dirname, '..')}/addWindow.html`)

    ipcRenderer.on ('here-is-jhony', (event, partner) => {
        console.log('test')
    })

}

function OpenInfoWindow (partner) {
    const browserWindow = remote.BrowserWindow

    let infoWindow = new browserWindow ({
        width: 400,
        height: 400,
        tittle: 'Preferencias',
        center: true,
        frame: false,
        show: false,
        webPreferences: {additionalArguments: [partner.id] } 
    })

    infoWindow.once ('ready-to-show', () => {
        infoWindow.show ()  
        infoWindow.focus ()        
    })
    
    infoWindow.loadURL(`file://${path.join(__dirname, '..')}/infoWindow.html`)
    
    infoWindow.on('closed', () => {
        console.log(ipcRenderer.eventNames())
        console.log(infoWindow)
        infoWindow = null;
        /* ipcRenderer.removeListener('here-is-data', (event, partner) => {
            console.log('openwindow: escuche y envie hereisdata')
            infoWindow.webContents.send('here-is-data', partner)
        }) */
    })
        
    ipcRenderer.on ('here-is-data', (event, partner) => {
        
        infoWindow.webContents.send ('here-is-data', partner)
    })
}

module.exports = {
    OpenAddPartnerWindow: OpenAddPartnerWindow,
    OpenInfoWindow: OpenInfoWindow
}