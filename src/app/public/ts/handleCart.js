let cart = [];
const cartFromLocalStorage = localStorage.getItem('cart');
if (cartFromLocalStorage) {
    cart = JSON.parse(cartFromLocalStorage);
}
class HandleCart {
    valueCartFromStorage;
    constructor(valueCartFromStorage) {
        this.valueCartFromStorage = valueCartFromStorage;
        console.log(">>> Class Handle Cart");
    }
    renderCart = () => {
        let HtmlShow = '';
        this.valueCartFromStorage.forEach(element => {
            let priceProduct = Number(element.price) * Number(element.quantity);
            HtmlShow += `
                <tr class="table__cart--tbody-tr">
                    <td class="tbody-td--infoProduct">
                        <div class="box__img--product-cart">
                            <img src="${element.image}" alt="">
                        </div>
                        <div class="box__info--product-cart">
                            <span class="name__product">${element.name}</span>
                            <span class="price__product"><span class="">Size: ${element.size}</span></span>
                            <span class="price__product">${Number(element.price).toLocaleString()}<span class="">VNĐ</span></span>
                        </div>
                    </td>
                    <td class="tbody-td">
                        <div class="box_quantity-size-content">
                            <button class="subtraction">-</button>
                            <input class="input_quantityProduct" type="number" min="1" max="10" value="${element.quantity}">
                            <button class="plus">+</button>
                        </div>
                    </td>
                    <td class="tbody-td total_product">
                        <span class="total_product-span">
                            ${Number(priceProduct).toLocaleString()}
                            <span class="vnd">VNĐ</span>
                        </span>
                    </td>
                    <td class="tbody-td td-delProduct">
                        <ion-icon class="delete" name="close-outline"></ion-icon>
                    </td>
                </tr>
            `;
        });
        const tbodyShow = document.querySelector(".table__cart--tbody");
        const headerCart = document.querySelector(".main__section--title");
        if (tbodyShow && headerCart) {
            tbodyShow.innerHTML = HtmlShow;
            headerCart.innerHTML = `<span class="title__cart">GIỎ HÀNG / </span>
                                            <span class="title__cart2">${this.valueCartFromStorage.length} Sản phẩm</span>`;
        }
    };
    renderInfoCart = () => {
        const containerShow = document.querySelector(".main__info--bottom");
        let provisional = 0;
        this.valueCartFromStorage.forEach(element => {
            provisional += Number(element.price) * Number(element.quantity);
        });
        const HtmlShow = `<div class="info--bottom-container">
                        <span class="info--bottom-container--left">
                            Tạm tính: 
                        </span>
                        <div class="info--bottom-container--right">
                            <span class="container--right-price">
                                ${provisional.toLocaleString()}
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
                                ${(provisional + 30000).toLocaleString()}
                            </span>
                            <span class="box__total--cart-right-vnd">
                                VNĐ
                            </span>
                        </div>
                    </div>

                    <button class="checkout__buttonCart">
                        Thanh Toán
                    </button>`;
        if (containerShow != null) {
            containerShow.innerHTML = HtmlShow;
        }
    };
    deleteProduct = () => {
        const deleteProductButtons = document.querySelectorAll(".delete");
        deleteProductButtons.forEach((element, index) => {
            element.onclick = (event) => {
                cart.splice(index, 1);
                const cartJSON = JSON.stringify(cart);
                localStorage.setItem('cart', cartJSON);
                const handleCart = new HandleCart(cart);
                handleCart.handleRenderCart();
            };
        });
    };
    handleRenderCart = () => {
        const cart__empty = document.querySelector(".cart__empty");
        const mainCarts = document.querySelectorAll(".mainCart");
        if (this.valueCartFromStorage.length == 0) {
            cart__empty?.classList.remove("displayNone");
            mainCarts.forEach(element => {
                element.classList.add("displayNone");
            });
        }
        else {
            cart__empty?.classList.add("displayNone");
            mainCarts.forEach(element => {
                element.classList.remove("displayNone");
                this.renderCart();
                this.renderInfoCart();
                this.deleteProduct();
            });
        }
    };
    changeQuantityProduct = () => {
    };
}
const handleCart = new HandleCart(cart);
handleCart.handleRenderCart();
export {};
//# sourceMappingURL=handleCart.js.map