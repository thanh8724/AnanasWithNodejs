console.log("check out active");
import { toastMessage } from "./toastMessage.js";
const toast = toastMessage;
const myLocal = localStorage.getItem("cart");
let provisional = 0;
let shipping = 30000;
let totalAmountValue = 0;
if (myLocal) {
    const cartJsonParse = JSON.parse(myLocal);
    cartJsonParse.forEach((item) => {
        provisional += Number(item.price) * Number(item.quantity);
    });
    renderInfoBill(provisional, shipping);
    selectMethodShipping(renderInfoBill);
}
function renderInfoBill(provisional, shipping) {
    const showPrices = document.querySelectorAll(".container--right-price");
    const totalPrice = document.querySelector(".total-price");
    const priceShipping = document.querySelector(".container--right-price");
    if (showPrices && totalPrice && priceShipping) {
        showPrices[0].textContent = provisional.toLocaleString("vi-VN");
        showPrices[1].textContent = shipping.toLocaleString('vi-VN');
        totalPrice.textContent = Number(provisional + shipping).toLocaleString("vi-VN");
        totalAmountValue = Number(provisional + shipping);
    }
}
function selectMethodShipping(renderInfoBill) {
    const methodShippingGroups = document.querySelectorAll('.form__methodShipping1');
    methodShippingGroups.forEach(group => {
        group.addEventListener('click', () => {
            const input = group.querySelector('input');
            methodShippingGroups.forEach(group => {
                const input = group.querySelector('input');
                input.checked = false;
            });
            input.checked = true;
            shipping = Number(input.value);
            renderInfoBill(provisional, shipping);
        });
    });
}
function checkOut() {
    let arrayNameProduct = [];
    if (myLocal) {
        const cartJsonParse = JSON.parse(myLocal);
        arrayNameProduct = cartJsonParse.map((item) => item.name);
    }
    const form = document.querySelector('.form__checkOut');
    if (form) {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const selectedMethodShipping = form.querySelector('input[name="form__methodShipping--input"]:checked');
            const formData = new FormData(form);
            const address = formData.get('address');
            const adderssSpecific = formData.get('adderssSpecific');
            const totalAmount = totalAmountValue;
            const emailReceiver = formData.get('emailReceiver');
            const phoneReceiver = formData.get('phoneReceiver');
            const shipping = selectedMethodShipping?.value;
            const paymentMethod = "Tiền mặt";
            const response = await fetch('/checkOut', {
                method: 'POST',
                body: JSON.stringify({ address, adderssSpecific, emailReceiver, phoneReceiver, shipping, paymentMethod, totalAmount, arrayNameProduct }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            if (response.status == 201) { // 200: OK - Yêu cầu được thực hiện thành công. -- 201: Created - Yêu cầu đã tạo thành công một tài nguyên mới.
                toast({
                    title: res.title,
                    message: res.message,
                    type: 'toast__success'
                });
                localStorage.removeItem('cart');
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            }
            if (response.status == 400) {
                toast({
                    title: res.title,
                    message: res.message,
                    type: 'toast__error'
                });
            }
        };
    }
}
checkOut();
