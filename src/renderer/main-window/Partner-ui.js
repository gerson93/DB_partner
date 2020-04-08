function fillPartnerList (partner) { 
    const partnerList = document.querySelector('tbody.partner-table-body')
    const node = `<tr class="list-partner-item" id="${partner.id}">
                    <td>${partner.name} </td>
                    <td>${partner.last_name} </td>
                    <td>${partner.birth} </td>
                    <td>${partner.rut} </td>
                 </tr>`
    partnerList.insertAdjacentHTML('beforeend', node)
}

function fillPayList (partner) { 
    const partnerList = document.querySelector('tbody.pay-table-body')
    const node = `<tr class="list-pay-item" id="${partner.id}">
                    <td>${partner.partner.rut} </td>
                    <td>${partner.total_debt} </td>
                    <td>${partner.total_paid} </td>
                 </tr>`
    partnerList.insertAdjacentHTML('beforeend', node)
}

function deleteAllList () {
    const partnerList = document.getElementById('list-window')
    const node = ``
    partnerList.innerHTML = node
}

function partnerListFrame () {
    const partnerList = document.getElementById('list-window')
    const node = `<table id="partner-table" class="table-striped">
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Rut</th>
                        </tr>
                    </thead>
                    <tbody class="partner-table-body">
                        <!-- Aquí va la data -->
                    </tbody>
                    </table>`
    partnerList.innerHTML = node
}

function payListFrame () {
    const partnerList = document.getElementById('list-window')
    const node = `<table id="pay-table" class="table-striped">
                    <thead>
                    <tr>
                        <th>Rut</th>
                        <th>Deuda total</th>
                        <th>Pagado</th>
                    </tr>
                    </thead>
                    <tbody id="pay-table-body" class="pay-table-body">
                    <!-- Aquí va la data -->
                    </tbody>
                </table>`
    partnerList.innerHTML = node
}



module.exports = {
    fillPartnerList: fillPartnerList,
    fillPayList: fillPayList,
    deleteAllList: deleteAllList,
    partnerListFrame: partnerListFrame,
    payListFrame: payListFrame,
}