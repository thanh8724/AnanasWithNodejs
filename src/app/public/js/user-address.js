function start() {
    getAccountByIdUser(renderInfoUser);
    getAddressByIdUser(renderAddress);
    getAddressByIdUser(createDataAddress);
    createDataAddress();
    getAddressByIdUser(setDefaultAddress);
}
start();
const idAccount = JSON.parse(localStorage.getItem('account')).idAccount;
async function getAddressByIdUser(callback) {
    const addressApi = 'http://localhost:3000/address';
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
function postAddress(dataToSend) // nhận dữ liệu từ createDataAddress sau đó đưa dữ liệu lên json sever
{
    const url = "http://localhost:3000/address";
    fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error(
            `Gửi dữ liệu không thành công. Mã trạng thái: ${response.status}`
            );
        }
        return response.json();
        })
        .then((data) => {
        console.log("Dữ liệu đã được gửi thành công lên server:", data);
        })
        .catch((error) => {
        console.error("Lỗi khi gửi dữ liệu:", error);
        });
}
function renderAddress(listAddress) {
    let addressDefaultHtml = ``;
    let addressHtml = '';
    listAddress.forEach(address => {
        if(address.idAccount == idAccount) {
            if(address.isDefault) {
                addressDefaultHtml += `<div class="container--item addressDefault">
                    <div class="item__content-left">
                        <span class="idAddress" style="display: none;">${address.id}</span>
                        <span class="namephone">
                            <span class="name">${JSON.parse(localStorage.getItem('account')).nameAccount}</span> |
                            <span>0352431477</span>
                        </span>
                        <span>${address.address}</span>
                        <span>${address.specificAddress}</span>
                    </div>
                    <div class="item__content-right">
                        <span class="edit-addressNone">Xóa</span>
                        <button class="buttonAddress-default">Thiết lập mặc định</button>
                    </div>
                </div>`;
            }else {
                addressHtml += `<div class="container--item">
                    <div class="item__content-left">
                        <span class="idAddress" style="display: none;">${address.id}</span>
                        <span class="namephone">
                            <span class="name">${JSON.parse(localStorage.getItem('account')).nameAccount}</span> |
                            <span>0352431477</span>
                        </span>
                        <span>${address.address}</span>
                        <span>${address.specificAddress}</span>
                    </div>
                    <div class="item__content-right">
                        <span class="edit-address">Xóa</span>
                        <button class="buttonAddress-default">Thiết lập mặc định</button>
                    </div>
                </div>`;
            }
        }
    });
    document.querySelector('.box_showAddressDefault').innerHTML = addressDefaultHtml;
    document.querySelector('#box_showAddress').innerHTML = addressHtml;
    addressHtml = '';
    deleteAddress();
}
function createDataAddress(listAddress)
{
    let finalIdAddress = 0;
    let isDefault = true;
    if(listAddress != undefined && listAddress.length != 0) {
        listAddress.forEach(address => {
            if(address.idAccount == idAccount) {
                isDefault= false;
            }
        });
        finalIdAddress = listAddress[listAddress.length - 1].id;
    }
    const submitUpload = document.querySelector('.submit__upload');
    submitUpload.onclick = (event) => {
        event.preventDefault();
        const form = submitUpload.parentElement.parentElement;
        if(handleFormAddress(form)) {
            const data = {
                id: `${Number(finalIdAddress)+1}`,
                address: document.querySelector('#address').value,
                specificAddress: document.querySelector('#specificAddress').value,
                idAccount: idAccount,
                isDefault: isDefault
            }
            postAddress(data);
            getAddressByIdUser(renderAddress);
        }
    }
}
function handleFormAddress(form) // xử lí form
{
    const inputs = form.querySelectorAll('input');
    let hasError = false;
    let firstEmptyInput = null;
    inputs.forEach((input, index) => {
        if (input.value.trim() === "") {
            if (firstEmptyInput === null) {
                firstEmptyInput = input;
            }
            hasError = true;
            return;
        }
    });
    if (hasError) {
        if (firstEmptyInput !== null) {
          firstEmptyInput.focus();
          firstEmptyInput.classList.add('errorInput');
          firstEmptyInput.parentElement.querySelector(
            ".form__message"
          ).textContent = "Vui lòng điền thông tin!";
          firstEmptyInput.oninput = () => {
            firstEmptyInput.classList.remove('errorInput');
            firstEmptyInput.parentElement.querySelector(
                ".form__message"
              ).textContent = "";
          }
        }
        return false;
    }
    return true;
}
function setDefaultAddress(listAddress) {
    const buttonDefaults = document.querySelectorAll('.buttonAddress-default');
    if(buttonDefaults) {
        buttonDefaults.forEach(button => {
            button.onclick = (e) => {
                const idAddressSetDefault = button.parentElement.parentElement.querySelector('.idAddress').textContent;
                const listAddressByIdAccount = listAddress.filter(address => {
                    return address.idAccount == idAccount && address.account != idAddressSetDefault;
                });
                /* lặp qua các address có idAccount bằng idAccount đang login để
                    lấy id của các address để cập nhật thay đổi
                */
                listAddressByIdAccount.forEach(address => {
                    // cập nhật tất cả thành false (địa chỉ không mặc định)
                    fetch(`http://localhost:3000/address/${address.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({isDefault: false})
                    })
                });
                fetch(`http://localhost:3000/address/${idAddressSetDefault}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({isDefault: true})
                })
            }
        });
    }
}
function deleteAddress() {
    const buttonDeleteAddress = document.querySelectorAll('.edit-address');
    if(buttonDeleteAddress) {
        buttonDeleteAddress.forEach(button => {
            button.onclick = () => {
                const idAddress = button.parentElement.parentElement.querySelector('.idAddress').textContent;
                fetch(`http://localhost:3000/address/${idAddress}`, {
                    method: 'DELETE'
                })
            }
        });
    }
}