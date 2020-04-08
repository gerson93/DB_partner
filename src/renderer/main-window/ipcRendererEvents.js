import { ipcRenderer, remote, clipboard } from 'electron'
import settings from 'electron-settings'

function setIpc(){
    ipcRenderer.on ('add-partner', (event, dir, images) => {
    })
}

function addPartnerEvent() {
    openPreferences()
}


module.exports = {
    setIpc: setIpc,
    addPartnerEvent: addPartnerEvent
}