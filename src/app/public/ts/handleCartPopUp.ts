import { itemCart } from "./addToCart.js";
import { valueCartFromLocal } from "./getDataCart.js";
const cartEmply = (): void => {
    const cartPopUpHaveItem = document.querySelector(".popup__cart--container") as HTMLElement;
    const cartPopUpNoItem = document.querySelector(".popupCart-empty") as HTMLElement;
    cartPopUpHaveItem.classList.remove("popup__cart--container-active");
    cartPopUpHaveItem.classList.add("hiddenContentPopupCart");
    cartPopUpNoItem.classList.add("showContentCartEmpty");
}
const cartHaveValue = (): void => {
    const cartPopUpHaveItem = document.querySelector(".popup__cart--container") as HTMLElement;
    const cartPopUpNoItem = document.querySelector(".popupCart-empty") as HTMLElement;
    cartPopUpHaveItem.classList.add("popup__cart--container-active");
    cartPopUpHaveItem.classList.remove("hiddenContentPopupCart");
    cartPopUpNoItem.classList.remove("showContentCartEmpty");
}
const renderPopupCart = (data: any): void => {
    const container__showProducts: HTMLDivElement | null = document.querySelector(".container__showProducts");
    const totalPopup: HTMLSpanElement | null = document.querySelector('.total-popup');
    let productRender: string = ``;
    let total: number = 0;
    data.forEach((element: any) => {
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
    if(container__showProducts !== null && totalPopup !== null) {
        container__showProducts.innerHTML = productRender;
        totalPopup.textContent = `${total.toLocaleString()} VNĐ`;
    }
}
const handlePopUpcart = (cart: itemCart[], callback1: any, callback2: any, renderPopupCart: any): void => {
    if(cart?.length === 0) {
        callback1();
    }else {
        callback2();
        renderPopupCart(cart);
    }
}
const renderQuantityShow = (): void => {
    const quantityCart: HTMLSpanElement | null = document.querySelector(".quantityCart");
    if(quantityCart !== null) {
        if(valueCartFromLocal.length !== 0) {
            quantityCart.innerText = `${valueCartFromLocal.length}`;
            quantityCart.classList.add('opacity1');
        } else {
            quantityCart.classList.remove('opacity1');
        }
    }
}
const deleteProduct = (): void => {
    const deleteProductButtons: NodeListOf<HTMLElement> = document.querySelectorAll("#delete__product-popup");
    if(deleteProductButtons != null) {
        deleteProductButtons.forEach((element, index) => {
            element.onclick = () => {
                valueCartFromLocal.splice(index, 1);
                const cartJSON = JSON.stringify(valueCartFromLocal);
                localStorage.setItem('cart', cartJSON);
                startHandleCart(valueCartFromLocal);
            }
        });
    }
}
export function startHandleCart(value: itemCart[]): void  {
    renderQuantityShow();
    handlePopUpcart(valueCartFromLocal, cartEmply, cartHaveValue, renderPopupCart);
    deleteProduct();
}
startHandleCart(valueCartFromLocal);