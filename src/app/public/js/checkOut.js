function startCheckOut() {
    renderCheckOut();
    selectMethods();
    getAccount();
    createDataCheckOut();
}
startCheckOut();
async function getAllBill(callback) {
    const addressApi = `http://localhost:3000/bills`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
function createBill(dataToSend) // nhận dữ liệu từ createDataAccount sau đó đưa dữ liệu lên json sever
{
    const url = "http://localhost:3000/bills";
    fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
    })
}
function createDataCheckOut(account) {
    const buttonCheckOut = document.querySelector('#buttonCheckOut');
    const formAddress = document.querySelector('.container__address');
    if(buttonCheckOut) {
        buttonCheckOut.onclick = (e) => {
            e.preventDefault();
            if(handleFormAddress(formAddress)) {
                function getIdBill(listBill) {
                    let idBill = 1;
                    if(listBill != undefined && listBill.length != 0) {
                        idBill = Number(listBill[listBill.length - 1].id) + 1;
                    }
                    let nameproduct = [];
                    JSON.parse(localStorage.getItem('mycart')).forEach(product => {
                        nameproduct.push(product.name);
                    });
                    const bill = {
                        id: `${idBill}`,
                        idAccount: account[0].id,
                        receiver: account[0].nameAccount,
                        emailReceiver: document.querySelector('.email__input').value,
                        phoneReceiver: document.querySelector('.phone__input').value,
                        addressReceiver: {
                            address: document.querySelector('.address__input').value,
                            adderssSpecific: document.querySelector('.addressDetail__input').value
                        },
                        productOrderInfo: {
                            nameproduct,
                            totalAmount: document.querySelector('.total-price').innerText,
                            shipping: document.querySelector('.shippingMoney').innerText,
                            status: "waitForConfirmation",
                        },
                        dayOrder: getTime().day,
                        timeOrder: getTime().time
                    }
                    toast();
                    setTimeout(function() {
                        createBill(bill);
                        localStorage.removeItem('mycart');
                        window.location.href = 'index.html';
                    }, 2000);
                }
                getAllBill(getIdBill);
            }
        }
    }
}
function fetchAddress(callback) // dùng callbackn để lấy địa chỉ
{
    const addressApi = 'http://localhost:3000/address';
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
async function getAccount() // -> lấy tài khoản trên json sau đó kiểm tra tài khoản trùng với tài khoản đang đăng nhập
{
  try {
    await getAccountAsync()
        .then(accounts => {
            const infoAccount = accounts.filter(account => {
                return account.emailAccount == JSON.parse(localStorage.getItem('account')).emailAccount;
            });
            return infoAccount;
        })
        .then((infoAccount) => {
            const account = infoAccount;
            fetchAddress(function getAddressByID(listAddress) {
                const addressByID = listAddress.filter((address) => {
                    return address.idAccount == account[0].id;
                });
                loadInfoAddress(addressByID, account[0])
            });
            return account;
        })
        .then(account => {
            createDataCheckOut(account);
        })
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ server:", error);
  }
}
function loadInfoAddress(listAddress, account) // tải dữ liệu của địa chỉ lên UI
{
    listAddress.forEach(address => {
        if(address.isDefault) {
            document.querySelector('.address__input').value = address.address;
            document.querySelector('.addressDetail__input').value = address.specificAddress
            document.querySelector('.email__input').value = JSON.parse(localStorage.getItem('account')).emailAccount;
        }
    });
    document.querySelector('.phone__input').value = account.phoneAccount;
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
        if(!isValidEmail(form.querySelector('input[name="email"]').value)) {
            form.querySelector('input[name="email"]').focus();
            hasError = true;
            return;
        }
        if(!isValidPhone(form.querySelector('input[name="phone"]').value)) {
            form.querySelector('input[name="phone"]').focus();
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
function isValidEmail(email) // -> check is Email
{
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}
function isValidPhone(phone)
{
    const phoneRegex = /^(0[2|3|5|6|7|8|9])+([0-9]{8})$/;
    return phoneRegex.test(phone);
}
function renderCheckOut() 
{
    let dataCart = JSON.parse(localStorage.getItem('mycart'));
    let temporaryPayment = 0;
    let totalPayment = 0;
    dataCart.forEach(product => {
        temporaryPayment += strToNumber(product.price) * parseInt(product.quantity);
    });
    totalPayment = temporaryPayment
    //  hiển thị bảng bên phải
    function renderBoxLeftCart() {
        let totalAll = temporaryPayment + strToNumber(getValueShippings());
        let shipping = getValueShippings();
        
        document.querySelector('.main__info--bottom').innerHTML = `<div class="info--bottom-container">
                                                                        <span class="info--bottom-container--left">
                                                                            Tạm tính: 
                                                                        </span>
                                                                        <div class="info--bottom-container--right">
                                                                            <span class="container--right-price">
                                                                                ${formatMoney(temporaryPayment)}
                                                                            </span>
                                                                            <div class="container--right-vnd">
                                                                                VNĐ
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="info--bottom-container">
                                                                        <span class="info--bottom-container--left">
                                                                            Phí vận chuyển: 
                                                                        </span>
                                                                        <div class="info--bottom-container--right">
                                                                            <span class="container--right-price shippingMoney">
                                                                                ${formatMoney(shipping)}
                                                                            </span>
                                                                            <div class="container--right-vnd">
                                                                                VNĐ
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="info--bottom-container">
                                                                        <span class="info--bottom-container--left">
                                                                            Voucher: 
                                                                        </span>
                                                                        <div class="info--bottom-container--right">
                                                                            <input type="text" class="voucher" placeholder="Mã giảm giá">
                                                                        </div>
                                                                    </div>
    
                                                                    <div class="box__total-cart">
                                                                        <span class="box__total--cart-left">
                                                                            Tổng tiền:
                                                                        </span>
                                                                        <div class="box__total--cart-right">
                                                                            <span class="total-price">
                                                                                ${formatMoney(totalAll)}
                                                                            </span>
                                                                            <span class="box__total--cart-right-vnd">
                                                                                VNĐ
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <a href="checkout.html" id="buttonCheckOut" class="checkout__buttonCart">
                                                                        Đặt Hàng
                                                                    </a>`;
    }
    renderBoxLeftCart();
    // check method shupping
    if(temporaryPayment < 1000000) {
        document.querySelector('.methodShipping1').classList.add('shippingMethod-disabled');
    }else {
        document.querySelector('.methodShipping1').classList.remove('shippingMethod-disabled');
    }
    //   app voucher
    const inputVoucher = document.querySelector('.voucher');
    inputVoucher.onblur = (e) => {
        if(e.target.value == 'ThanhDepTrai') {
            totalPayment = (totalPayment - 30000);
            console.log(totalPayment);
            renderBoxLeftCart();
        }else {
            console.log('saiiiii');
        }
    }
}
function getValueShippings() {
    const methodShippingInputs = document.querySelectorAll('.form__methodShipping--input');
    let valueShippings = 0;
        methodShippingInputs.forEach(input => {
            if(input.checked) {
                valueShippings = input.value;
            }
        });
    return valueShippings;
}
function selectMethods() 
{
    const buttonMethods = document.querySelector('.shippingMethodBox').querySelectorAll('.form__methodShipping');
    buttonMethods.forEach(button => {
        button.onclick = (event) => {
            document.querySelectorAll('.form__methodShipping--input').forEach(input => {
                input.checked = false;
            });
            button.querySelector('input[type="radio"]').checked = true;
            getValueShippings();
            renderCheckOut();
            getAccount();
        };
    });
}
function selectPaymentMethod()
{
    document.querySelector('.paymentMethodButton').onclick = () => {
        document.querySelector('.paymentMethodButton').querySelector('.form__paymentMethod--input').checked = true;
    };
}
function toast() {
            document.querySelector('.containerToast').innerHTML = `<div class="toast">
                <div class="toast__icon">
                    <ion-icon name="cloud-done-outline"></ion-icon>
                </div>
                <div class="toastMessage">
                    <span class="toastMessage__title">Success</span>
                    <span class="toastMessage__content">Đặt hàng thành công! <br>Có thể xem thông tin chi tiết tại trang quản lý.</span>
                </div>
                <div class="toastButton">
                    <ion-icon name="close-outline"></ion-icon>
                </div>
            </div> `;
}
function getTime() {
    let dmy = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
    let time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    return {
        day: dmy,
        time: time
    };
}