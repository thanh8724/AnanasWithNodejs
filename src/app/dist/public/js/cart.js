function renderCart() {
    let dataCart = JSON.parse(localStorage.getItem("mycart"));
    let itemHtml = ``;
    let temporaryPayment = 0;
    let totalPayment = 0;
    dataCart.forEach((product) => {
        itemHtml += `<tr class="table__cart--tbody-tr">
                        <td class="tbody-td--infoProduct">
                            <div class="box__img--product-cart">
                                <img src="${product.image}" alt="">
                            </div>
                            <div class="box__info--product-cart">
                                <span class="name__product">${product.name}</span>
                                <span class="price__product">${formatMoney(strToNumber(product.price))}<span class=""> VNĐ</span></span>
                                <span class="size__product">Size:${product.sizeProduct}</span>
                            </div>
                        </td>
                        <td class="tbody-td">
                            <div class="box_quantity-size-content">
                                <button class="subtraction">-</button>
                                <input class="input_quantityProduct" type="number" min="1" max="10" value="${product.quantity}">
                                <button class="plus">+</button>
                            </div>
                        </td>
                        <td class="tbody-td total_product">
                            <span class="total_product-span">
                                ${formatMoney(strToNumber(product.price) *
            parseInt(product.quantity))}
                                <span class="vnd">VNĐ</span>
                            </span>
                        </td>
                        <td class="tbody-td td-delProduct">
                            <ion-icon class="delete" name="close-outline"></ion-icon>
                        </td>
                    </tr>`;
        temporaryPayment += strToNumber(product.price) * parseInt(product.quantity);
    });
    totalPayment = temporaryPayment;
    //  hiển thị bảng bên phải
    function renderBoxLeftCart() {
        if (localStorage.getItem("account")) {
            var link = "checkout.html";
        }
        else {
            link = "account.html";
        }
        document.querySelector(".main__info--bottom").innerHTML = `<div class="info--bottom-container">
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
                                                                            <span class="container--right-price">
                                                                                30.000
                                                                            </span>
                                                                            <div class="container--right-vnd">
                                                                                VNĐ
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="box__total-cart">
                                                                        <span class="box__total--cart-left">
                                                                            Tổng tiền:
                                                                        </span>
                                                                        <div class="box__total--cart-right">
                                                                            <span class="total-price">
                                                                                ${formatMoney(totalPayment +
            30000)}
                                                                            </span>
                                                                            <span class="box__total--cart-right-vnd">
                                                                                VNĐ
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <a href="${link}" class="checkout__buttonCart">
                                                                        Thanh Toán
                                                                    </a>`;
    }
    renderBoxLeftCart();
    // show
    document.querySelector(".main__section--title").innerHTML = `<span class="title__cart">GIỎ HÀNG / </span>
                                            <span class="title__cart2">${dataCart.length} Sản phẩm</span>`; // ->  hiển thị header của giỏ hàng
    document.querySelector(".table__cart--tbody").innerHTML = itemHtml; // -> hiển thị sản phẩm
    //   app voucher
    const inputVoucher = document.querySelector(".voucher");
    if (inputVoucher) {
        inputVoucher.onblur = (e) => {
            if (e.target.value == "ThanhDepTrai") {
                totalPayment = totalPayment - 30000;
                console.log(totalPayment);
                renderBoxLeftCart();
            }
            else {
                console.log("saiiiii");
            }
        };
    }
    // xoa san pham
    function deleteProduct() {
        const deleteProduct = document.querySelectorAll(".delete");
        deleteProduct.forEach((product, indexProduct) => {
            product.onclick = () => {
                total = total - arrayProduct[indexProduct].price;
                arrayProduct.splice(indexProduct, 1);
                localStorage.setItem("mycart", JSON.stringify(arrayProduct));
                renderCart(); // -> gọi lại hàm show sản phẩm tron giỏ hàng để reder lại
                renderProductCart(); // ->  gọi lại hàm show sản phẩm trong popup nhằm render lại
            };
        });
        changeShowCart();
    }
    deleteProduct();
    changeQuantity(); // -> hàm thay đổi số lượng
}
renderCart();
function changeQuantity() {
    const subtractionButton = document.querySelectorAll(".subtraction");
    const plusButton = document.querySelectorAll(".plus");
    subtractionButton.forEach((button) => {
        let newQuantity = 0;
        button.onclick = (e) => {
            const inputQuantity = e.target.parentElement.querySelector(".input_quantityProduct");
            if (parseInt(inputQuantity.value) <= 1) {
                newQuantity = parseInt(inputQuantity.value) - 0;
            }
            else {
                newQuantity = parseInt(inputQuantity.value) - 1;
            }
            inputQuantity.value = newQuantity;
            test();
            renderCart();
            renderProductCart();
        };
    });
    plusButton.forEach((button) => {
        let newQuantity = 0;
        button.onclick = (e) => {
            const inputQuantity = e.target.parentElement.querySelector(".input_quantityProduct");
            if (parseInt(inputQuantity.value) >= 10) {
                newQuantity = parseInt(inputQuantity.value) + 0;
            }
            else {
                newQuantity = parseInt(inputQuantity.value) + 1;
            }
            inputQuantity.value = newQuantity;
            test();
            renderCart();
            renderProductCart();
        };
    });
    function test() {
        let dataCart = JSON.parse(localStorage.getItem("mycart"));
        const quantityValue = document.querySelectorAll(".input_quantityProduct");
        console.log(quantityValue);
        for (let index = 0; index < dataCart.length; index++) {
            if (dataCart[index].quantity != quantityValue[index].value) {
                arrayProduct[index].quantity = quantityValue[index].value;
                break;
            }
        }
        localStorage.setItem("mycart", JSON.stringify(arrayProduct));
    }
}
function changeShowCart() {
    const mainCart = document.querySelectorAll(".mainCart");
    const cartEmpty = document.querySelector(".cart__empty");
    if (JSON.parse(localStorage.getItem("mycart")).length > 0) {
        mainCart.forEach((element) => {
            element.classList.remove("displayNone");
        });
        cartEmpty.classList.add("displayNone");
    }
    else {
        mainCart.forEach((element) => {
            element.classList.add("displayNone");
        });
        cartEmpty.classList.remove("displayNone");
    }
}
export {};
//# sourceMappingURL=cart.js.map