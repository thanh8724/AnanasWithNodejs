function start() {
    fetchOrders(renderOrders);
}
start();
async function fetchOrders(callback) {
    const addressApi = `http://localhost:3000/bills`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
function updateData(data, url) {
    fetch(url, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
}
function renderOrders(listOrders) {
    createPagination(listOrders, 9);
    const buttonPagination = document.querySelectorAll('.pagination-item');
    buttonPagination.forEach((item, index) => {
        item.onclick = () => {
            displayItems(listOrders, index); 
        }
    });
    displayItems(listOrders, 1);
}
function displayItems(data, index) {
    let startIndex = (index - 1) * 9;
    let endIndex = startIndex + 9;
    let itemHtml = ``;
    let status = 'Đã giao';
    for (let index = startIndex; index < endIndex; index++) {
        if(index < data.length) {
            if(data[index].productOrderInfo.status == 'waitForConfirmation') status = 'Chờ xác nhận!';
            if(data[index].productOrderInfo.status == 'delivering') status = 'Đang giao!';
            if(data[index].productOrderInfo.status == 'delivered') status = 'Đã giao!';
            itemHtml += `<tr>
                            <td>#<span class="id">${data[index].id}</span></td>
                            <td>${data[index].receiver}</td>
                            <td>${data[index].addressReceiver.adderssSpecific}</td>
                            <td>${data[index].dayOrder}</td>
                            <td>${data[index].productOrderInfo.totalAmount} VND</td>
                            <td class="${data[index].productOrderInfo.status}">${status}</td>
                            <td class="view-order"><span class="create">View</span></td>
                        </tr>`;
        }else {
            endIndex = data.length;
            break;
        }
    }
    if(index >= 2) {
        document.querySelector('.back-page').onclick = () => {
            displayItems(data, index-1);
        }
    }else {
        if(document.querySelector('.back-page')) {
            document.querySelector('.back-page').onclick = () => {
                displayItems(data,  Math.ceil(data.length / 9));
            }
        }
    }
    if(index < Math.ceil(data.length / 9)) {
        if(document.querySelector('.next-page')) {
            document.querySelector('.next-page').onclick = () => {
                displayItems(data, index+1);
            }
        }
    }else if(index == Math.ceil(data.length / 9)) {
        if(document.querySelector('.next-page')) {
            document.querySelector('.next-page').onclick = () => {
                displayItems(data, 1);
            }
        }
    }
    document.querySelector('.content__orders--bottom tbody').innerHTML = itemHtml;
    document.querySelector('.content__orders--top-text2').textContent = `${data.length} New Order`
    document.querySelector('.pagination-title').textContent = `Showing ${startIndex+1} - ${endIndex} of ${data.length}`;
    document.querySelectorAll('.pagination-item .pagination-item__link').forEach(element => {
        element.classList.remove('pagination-item__link-active');
    });
    if(document.querySelector('.pagination-item .pagination-item__link')) {
        document.querySelectorAll('.pagination-item .pagination-item__link')[index].classList.add('pagination-item__link-active');
    }
    itemHtml = '';
    showHiddenFormUpdate(renderFormUpdate);
}
function renderFormUpdate() {
    const idorder = document.querySelector('#idCategory').textContent;
    const containerInfoUser = document.querySelector('.boxInfomation-order');
    const containerOrder = document.querySelector('.boxInfomation-order2');
    const addressApi = `http://localhost:3000/bills`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            const order = data.filter(a => {
                return a.id == idorder;
            })
            return order;
        })
        .then((order) => {
            // hiển thị thông tin bên trái
            containerInfoUser.querySelector('.nameReceiver').textContent = order[0].receiver;
            containerInfoUser.querySelector('.emailReceiver').textContent = order[0].emailReceiver;
            containerInfoUser.querySelector('.phoneReceiver').textContent = order[0].phoneReceiver;
            containerInfoUser.querySelector('.addressReceiver').textContent = `${order[0].addressReceiver.adderssSpecific}, ${order[0].addressReceiver.address}`;
            return order;
        })
        .then(order => {
            // hiển thị thông tin bên phải
            let shippingMethod = 'Giao hàng nhanh';
            if(order[0].shipping == '50.000') shippingMethod = 'Hỏa tốc';
            if(order[0].shipping == '0') shippingMethod = 'Giao hàng miễn phí.';
            let nameProductOrder = '';
            order[0].productOrderInfo.nameproduct.forEach(name => {
                nameProductOrder += name+"</br>";
            });
            containerOrder.querySelector('.infoName').innerHTML = `${nameProductOrder}`;
            containerOrder.querySelector('.infoShipping').textContent = shippingMethod;
            containerOrder.querySelector('.infoTime').innerHTML = `${order[0].dayOrder} <small>${order[0].timeOrder}</small>`;
            containerOrder.querySelector('.infoAddress').textContent = `${order[0].addressReceiver.adderssSpecific}, ${order[0].addressReceiver.address}`;
            const options = document.querySelector('#selectStatusOrder').querySelectorAll('option');
            if(order[0].productOrderInfo.status == 'waitForConfirmation') options[0].selected = true;
            if(order[0].productOrderInfo.status == 'delivering') options[1].selected = true;
            if(order[0].productOrderInfo.status == 'delivered') options[2].selected = true;
            return order;
        })
        .then((order) => {
            updateOrder(order, idorder);
            deleteOrder(order, idorder);
        })
}
function updateOrder(dataOrder, idOrder) {
    const buttonUpdate = document.querySelector('.buttonUpdate');
    buttonUpdate.onclick = (e) => {
        e.preventDefault();
        const newStatus = document.querySelector('#selectStatusOrder').value;
        data = {
            productOrderInfo: {
                nameproduct: [
                    dataOrder[0].productOrderInfo.nameproduct
                ],
                totalAmount: dataOrder[0].productOrderInfo.totalAmount,
                shipping: dataOrder[0].productOrderInfo.shipping,
                status: newStatus
              },
        }
        updateData(data, `http://localhost:3000/bills/${idOrder}`)
    }
}
function deleteOrder(dataOrder, idOrder) {
    document.querySelector('.buttonDeleteOrder').onclick = () => {
        if(dataOrder[0].productOrderInfo.status == "delivered") {
            fetch(`http://localhost:3000/bills/${idOrder}`, {
                method: 'DELETE'
            })
        }else {
            alert('Đơn hàng chưa giao nên không thể xóa!');
        }
    }
}