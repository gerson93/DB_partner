import { OpenInfoWindow } from './openWindows'

const targetNode = document.querySelector('.window-content')
const config = { attributes: true, childList: true, subtree: true }

function addTableEvent () {
    const partnerItems = document.querySelectorAll('tr.list-partner-item')
    const payItems = document.querySelectorAll('tr.list-pay-item')

    if (partnerItems.length){
        for (let index = 0; index < partnerItems.length; index++) {
            partnerItems[index].addEventListener('click', function (){
                OpenInfoWindow(partnerItems[index])
            })
        }   
    }

    if (payItems.length){
        for (let index = 0; index < payItems.length; index++) {
            payItems[index].addEventListener('click', function (){
                console.log(payItems[index].id)
            })
        }   
    }
}

const observer = new MutationObserver (addTableEvent)

observer.observe(targetNode, config)

module.exports = observer
