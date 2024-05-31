function start() {
    getAccountByIdUser(renderInfoUser);
    getOrderByIdUser(renderOrders);
}
start();
async function getOrderByIdUser(callback) {
    const addressApi = 'http://localhost:3000/bills';
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
async function getAccountByIdUser(callback) {
    const addressApi = 'http://localhost:3000/accounts';
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
function renderInfoUser(listAccounts) {
    const account = listAccounts.filter(account => {
        return account.id == JSON.parse(localStorage.getItem('account')).idAccount;
    })
    document.querySelectorAll('.avatarImage').forEach(avatar => {
        avatar.src = account[0].avatarAccount;
    })
}
function renderOrders(listOrders) {
    let idUser = JSON.parse(localStorage.getItem('account')).idAccount;
    let orderHtml = ``;
    let statusOrder = "Chờ xác nhận!";
    listOrders.forEach(order => {
        if(order.idAccount == idUser) {
            if(order.productOrderInfo.status == "waitForConfirmation") statusOrder = "Chờ xác nhận!";
            if(order.productOrderInfo.status == "delivering") statusOrder = "Đang giao!";
            if(order.productOrderInfo.status == "delivered") statusOrder = "Đã giao!";
            orderHtml += `<tr>
                            <td>#${order.id}</td>
                            <td>${order.receiver}</td>
                            <td>${order.addressReceiver.adderssSpecific}, ${order.addressReceiver.address}</td>
                            <td>${order.dayOrder} ${order.timeOrder}</td>
                            <td>${((order.productOrderInfo.totalAmount))} VND</td>
                            <td class="${order.status}">${statusOrder}</td>
                        </tr>`;
        }
    });
    document.querySelector('.show__listOrder').innerHTML = orderHtml;
    orderHtml = '';
}