import { ipcRenderer, remote } from 'electron'

window.addEventListener('load', () => {
    cancelButton ()
    requestForInfo ()

    ipcRenderer.on ('here-is-data', (event, partner) => {
        console.log('infowindow: escuche hereisdata')
        fillInfoWindow(partner) 
    }) 
})

function requestForInfo    () {
    let id = parseInt(process.argv[18])
    ipcRenderer.send('give-me-info', id)
}

function cancelButton () {
    const cancelButton = document.getElementById('cancel-button')

    cancelButton.addEventListener('click', () => {
        const infoPartnerWindow = remote.getCurrentWindow()
        infoPartnerWindow.close()
    })
}

function fillInfoWindow (partner) {
    const infoPartner = document.getElementById('info-partner')
    const node = `<li id="id-partner" class="list-group-item">
                    <div class="media-body">
                        <strong>Nombre completo</strong>
                        <p>${partner.name} ${partner.last_name} ${partner.second_last_name}</p>
                    </div>
                    <div class="media-body">
                        <strong>Rut</strong>
                        <p>${partner.rut}</p>
                    </div>
                    <div class="media-body">
                        <strong>Fecha de nacimiento</strong>
                        <p>${partner.birth}</p>
                    </div>
                    <div class="media-body">
                        <strong>Monto pagado</strong>
                        <p>${partner.total_paid}</p>
                    </div>
                    <div class="media-body">
                        <strong>Monto adeudado</strong>
                        <p>${partner.total_debt}</p>
                    </div>
                </li>`
    infoPartner.innerHTML = node
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
    ipcRenderer.send('hola', partner)
}