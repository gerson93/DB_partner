import { createDataBase, showPartnerList, showPayList, deleteAll, addPartner, lookForId } from './main-window/dexie'
import observer from './main-window/Observer'
import createMenu from './main-window/menu'
import { OpenAddPartnerWindow } from './main-window/openWindows'

import { ipcRenderer } from 'electron'

window.addEventListener('load', () => {
    createDataBase()
    showPartnerList()
    buttonEvent('add-partner-button', OpenAddPartnerWindow)
    buttonEvent('watch-partner-button', WatchPartnerList)
    buttonEvent('pay-partner-button', WatchPayList)
    /* buttonEvent('delete-partner-button', deleteAll) */
    observer
    createMenu()

    ipcRenderer.on ('add-partner', (event, partner) => {
        addPartner(partner)
    })

    ipcRenderer.on ('give-me-info', (event, id) => {
        lookForId(id)
    })

})

function buttonEvent (id, func) {
    const object = document.getElementById(id)
    object.addEventListener('click', func)
}

function WatchPartnerList () {
    showPartnerList()
}

function WatchPayList () {
    showPayList()
}

