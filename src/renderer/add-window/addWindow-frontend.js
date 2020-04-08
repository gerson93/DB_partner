import { ipcRenderer, remote } from 'electron'

window.addEventListener('load', () => {
    cancelButton()
    saveButton()

    
})

function cancelButton () {
    const cancelButton = document.getElementById('cancel-button')

    cancelButton.addEventListener('click', () => {
        const addWindowPartner = remote.getCurrentWindow()
        addWindowPartner.close()
    })
}

function saveButton () {
    const saveButton = document.getElementById('save-button')
    const prefsForm = document.getElementById('preferences-form')
    
    saveButton.addEventListener('click', (event) => {
        if (prefsForm.reportValidity()){
            event.preventDefault()
            let partner = {name: document.getElementById('partner-name').value,
                        last_name: document.getElementById('partner-last-name').value,
                        second_last_name: document.getElementById('partner-second-last-name').value,
                        birth: document.getElementById('partner-birth').value,
                        rut: document.getElementById('partner-rut').value}

            senData(partner)
            const addWindowPartner = remote.getCurrentWindow()
            addWindowPartner.close()
        } 

    })
}

function senData (partner) {
    ipcRenderer.send('add-partner', partner)
}