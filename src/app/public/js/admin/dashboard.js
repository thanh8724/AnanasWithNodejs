function start() {
    getAllAccounts(renderNewAccounts);
    getAllBill(renderNewOrder);
}
start();
async function getAllAccounts(callback) {
    const addressApi = `http://localhost:3000/accounts`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
async function getAllBill(callback) {
    const addressApi = `http://localhost:3000/bills`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
function renderNewAccounts(accounts) {
    const listAccountUsers = accounts.filter(account => {
        return account.roleAccount == 'user';
    });
    listAccountUsers.sort(function(a, b) {
        return parseInt(b.id) - parseInt(a.id);
    });
    const listNewAccounts = listAccountUsers.slice(0, 3); // -> lấy 3 tài khoản mới nhất theo id giảm dần để render ra

    let accountHtml = '';
    listNewAccounts.forEach(account => {
        accountHtml += `<div class="container__newUser--item">
                            <div class="container__newUser--item--img">
                                <img src="${account.avatarAccount}" alt="">
                            </div>
                            <span class="name__newUser--item">
                                ${account.nameAccount}
                            </span>
                            <small class="time__online">Offline</small>
                        </div>`;
    });

    document.querySelector('.container__newUser--showNewItem').innerHTML = accountHtml;
    accountHtml = '';
}
function renderNewOrder(listOrders) {
    listOrders.sort(function(a, b) {
        return parseInt(b.id) - parseInt(a.id);
    });
    const listNewsOrders = listOrders.slice(0, 3);
    let billHtml = '';
    let statusOrder = '';
    listNewsOrders.forEach((bill, index) => {
        if(bill.productOrderInfo.status == "waitForConfirmation") statusOrder = "Chờ xác nhận!";
        if(bill.productOrderInfo.status == "delivering") statusOrder = "Đang giao!";
        if(bill.productOrderInfo.status == "delivered") statusOrder = "Đã giao!";
        billHtml += `<tr>
        <td>${bill.productOrderInfo.nameproduct}</td>
                        <td>${bill.receiver}</td>
                        <td>${bill.productOrderInfo.totalAmount} VND</td>
                        <td class="${bill.productOrderInfo.status}">${statusOrder}</td>
                    </tr>`;
    });
    document.querySelector('.recentOrders tbody').innerHTML = billHtml;
    billHtml = '';
}