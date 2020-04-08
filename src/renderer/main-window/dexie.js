import Dexie from 'dexie'
import relationships from 'dexie-relationships'
import { fillPartnerList, fillPayList, deleteAllList, partnerListFrame, payListFrame } from './Partner-ui'
import { ipcRenderer } from 'electron'

const db = new Dexie ('db_weightlifting', {addons: [relationships]});

function createDataBase () {
    db.version(1).stores({
        partner: 'id++, name, last_name, second_last_name, birth, rut',
        subscription: 'id++, nameId -> partner.id, total_debt, total_paid'
    })

    db.open().catch(function (e) {
        console.error("Open failed: " + e);
    })
}

function deleteAll () {
    db.delete().then (()=>{
        console.log('base de datos borrada')
    })
}

function showPartnerList () {
    deleteAllList()
    partnerListFrame()
    db.partner.orderBy('name').toArray()
    .then(list => {
    list.forEach(partner => {
        fillPartnerList (partner)
    })})
}

function showPayList () {
    deleteAllList()
    payListFrame()
    db.subscription.orderBy('id')
    .with({partner: 'nameId'})
    .then(list => {
    list.forEach(partner => {
        fillPayList (partner)
    })})
}

function addPartner (partner) {
    db.partner.add({name: partner.name, last_name: partner.last_name, 
        second_last_name: partner.second_last_name, birth: partner.birth,
        rut: partner.rut})
    
    db.partner.orderBy('id').last().then((result) => {
        fillPartnerList(result)
    }
    )
}

function addTestData () {
    db.transaction('rw', db.partner, db.subscription, () => {
        /* db.partner.bulkPut([{
            name: 'Gersoncito',
            last_name: 'García',
            second_last_name: 'Campos',
            birth: '08-08-2020',
            rut: '184170167'

        }]) */
        db.subscription.bulkPut([{
            nameId: 2,
            total_debt: '1000',
            total_paid: '7000'
        },
        {
            nameId: 3,
            total_debt: '0',
            total_paid: '8000'
        }])
    })
}

function lookForId (id) {

    db.subscription.where('id').equals(id)
    .with({partner: 'nameId'})
    .then(list => {
    list.forEach(partner => {
        let joinPartner = Object.assign(partner, partner.partner)
        ipcRenderer.send('here-is-data', joinPartner)
        console.log('dexie: send hereisdata')
    })})
}
 module.exports = {
    createDataBase: createDataBase,
    addPartner: addPartner,
    showPartnerList: showPartnerList,
    showPayList: showPayList,
    deleteAll: deleteAll,
    lookForId: lookForId
}