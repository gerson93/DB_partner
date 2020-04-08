import { remote }  from 'electron'


function createMenu() {

    const template = [
        {
            label: 'Archivo',
            submenu:[
                {
                    label: 'Abrir ubicación',
                    accelerator: 'CmdOrCtrl+o',
                    
                },
                {
                    label: 'Guardar imagen',
                    accelerator: 'CmdOrCtrl+s',
                    
                },
                {
                    label: 'Cerrar',
                    role: 'close'
                },
            ]
            
        },
        {
            label: 'Preferencias',
            submenu:[
                {
                    label: 'Usuario',
                    accelerator: 'CmdOrCtrl+,',
                    /* click () { openPreferences() } */
                }
            ]
        },
        {
            label: 'Edicion',
            submenu: [
                {
                    label: 'Imprimir',
                    accelerator: 'CmdOrCtrl+p',
                    
                },
                {
                    label: 'Pegar',
                    accelerator: 'CmdOrCtrl+v',
                    
                }
            ]
                
        },

    ]

    const menu = remote.Menu.buildFromTemplate(template)
    remote.Menu.setApplicationMenu (menu)
    
}

module.exports = createMenu