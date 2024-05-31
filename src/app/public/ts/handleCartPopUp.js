import { valueCartFromLocal } from "./getDataCart.js";
const cartEmply = () => {
    const cartPopUpHaveItem = document.querySelector(".popup__cart--container");
    const cartPopUpNoItem = document.querySelector(".popupCart-empty");
    cartPopUpHaveItem.classList.remove("popup__cart--container-active");
    cartPopUpHaveItem.classList.add("hiddenContentPopupCart");
    cartPopUpNoItem.classList.add("showContentCartEmpty");
};
const cartHaveValue = () => {
    const cartPopUpHaveItem = document.querySelector(".popup__cart--container");
    const cartPopUpNoItem = document.querySelector(".popupCart-empty");
    cartPopUpHaveItem.classList.add("popup__cart--container-active");
    cartPopUpHaveItem.classList.remove("hiddenContentPopupCart");
    cartPopUpNoItem.classList.remove("showContentCartEmpty");
};
const renderPopupCart = (data) => {
    const container__showProducts = document.querySelector(".container__showProducts");
    const totalPopup = document.querySelector('.total-popup');
    let productRender = ``;
    let total = 0;
    data.forEach((element) => {
        total += Number(element.price) * Number(element.quantity);
        productRender += `<div class="container__showProducts--item">
                                <div class="box__image--item">
                                    <img src="${element.image}" alt="">
                                </div>
                                <span class="name__item--popup">
                                    ${element.name}
                                </span>
                                <input class="number__item--popup" value="${element.quantity}" type="number" name="" id="">
                                <span class="price__product--popup">
                                    ${Number(element.price).toLocaleString()} VNĐ
                                </span>
                                <ion-icon class="delete__product-popup" id="delete__product-popup" name="close-outline"></ion-icon>
                            </div>`;
    });
    if (container__showProducts !== null && totalPopup !== null) {
        container__showProducts.innerHTML = productRender;
        totalPopup.textContent = `${total.toLocaleString()} VNĐ`;
    }
};
const handlePopUpcart = (cart, callback1, callback2, renderPopupCart) => {
    if (cart?.length === 0) {
        callback1();
    }
    else {
        callback2();
        renderPopupCart(cart);
    }
};
const renderQuantityShow = () => {
    const quantityCart = document.querySelector(".quantityCart");
    if (quantityCart !== null) {
        if (valueCartFromLocal.length !== 0) {
            quantityCart.innerText = `${valueCartFromLocal.length}`;
            quantityCart.classList.add('opacity1');
        }
        else {
            quantityCart.classList.remove('opacity1');
        }
    }
};
const deleteProduct = () => {
    const deleteProductButtons = document.querySelectorAll("#delete__product-popup");
    if (deleteProductButtons != null) {
        deleteProductButtons.forEach((element, index) => {
            element.onclick = () => {
                valueCartFromLocal.splice(index, 1);
                const cartJSON = JSON.stringify(valueCartFromLocal);
                localStorage.setItem('cart', cartJSON);
                startHandleCart(valueCartFromLocal);
            };
        });
    }
};
export function startHandleCart(value) {
    renderQuantityShow();
    handlePopUpcart(valueCartFromLocal, cartEmply, cartHaveValue, renderPopupCart);
    deleteProduct();
}
startHandleCart(valueCartFromLocal);
//# sourceMappingURL=handleCartPopUp.js.map