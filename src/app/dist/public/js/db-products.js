const listProducts = [
    {
        id: 1,
        image: '../img_product/1.jpg',
        name: 'TRACK 6 I.S.E.E - PURE WHITE/ICY BLUE',
        price: 650.000
    },
    {
        id: 2,
        image: '../img_product/2.jpg',
        name: 'BASAS RAW - HIGH TOP - RUSTIC',
        price: 750.000
    },
    {
        id: 3,
        image: '../img_product/3.jpg',
        name: 'BASAS WORKADAY - LOW TOP - BLACK',
        price: 550.000
    },
    {
        id: 4,
        image: '../img_product/4.jpg',
        name: 'BASAS EVERGREEN - MULE - EVERGREEN',
        price: 580.000
    },
    {
        id: 5,
        image: '../img_product/5.jpg',
        name: 'BASAS RAW - LOW TOP - RUSTIC',
        price: 690.000
    },
];
// console.log(listProducts);
// show product
const boxShowProducts = document.querySelector(".box__showProducts--items");
listProducts.forEach(product => {
    if (boxShowProducts) {
        boxShowProducts.innerHTML += `<div class="product__item">
                                            <div class="product__link">
                                                <div class="container__product--item">
                                                    <div class="product__item--boxImg">
                                                        <span class="idProduct" style="display: none">${product.id}</span>
                                                        <img class="imgProduct" src="${product.image}" alt="">
                                                        <div class="product__item--boxAction">
                                                            <ion-icon class="icon-share" name="share-social-outline"></ion-icon>
                                                            <ion-icon onclick="like(this)" class="icon-heart" name="heart"></ion-icon>
                                                            <ion-icon class="icon-addcart" name="bag-add-outline"></ion-icon>
                                                        </div>
                                                    </div>
                                                    <div class="product__item--content">
                                                        <span class="name__product">${product.name}</span>
                                                        <span class="price__product">${product.price}</span>
                                                        <div class="product__content--bottom">
                                                            <span class="views__product">2,4m+ views</span>
                                                            <span class="evaluate">
                                                                <span>4.4 </span>
                                                                <ion-icon name="star"></ion-icon>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
    }
});
// add cart
var arrayProduct = [];
var total = 0;
let htmlProduct = ``;
function addToCart() {
    const addcart = document.querySelectorAll('.icon-addcart');
    addcart.forEach(element => {
        element.onclick = (e) => {
            const containerProduct = e.target.parentElement.parentElement.parentElement;
            let idProduct = containerProduct.querySelector('.idProduct').innerText;
            let imgProduct = containerProduct.querySelector('.imgProduct').src;
            let nameProduct = containerProduct.querySelector('.name__product').textContent;
            let quantityProduct = 1;
            let priceProduct = containerProduct.querySelector('.price__product').textContent;
            // console.log(imgProduct, nameProduct, priceProduct);
            let flag = false;
            for (let index = 0; index < arrayProduct.length; index++) {
                if (arrayProduct[index].id == idProduct) {
                    let newQuantity = parseInt(arrayProduct[index].quantity) + 1;
                    arrayProduct[index].quantity = newQuantity;
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                arrayProduct.push({
                    id: idProduct,
                    image: imgProduct,
                    name: nameProduct,
                    quantity: quantityProduct,
                    price: priceProduct
                });
            }
            localStorage.setItem('mycart', JSON.stringify(arrayProduct));
            changeTypePopupCart(); // thay đổi trạng thái của popup khi có sản phẩm
            showProductPopup(); // hiển thị popup  cart
        };
    });
    if (JSON.parse(localStorage.getItem('mycart')) && JSON.parse(localStorage.getItem('mycart')).length != 0) {
        arrayProduct = JSON.parse(localStorage.getItem('mycart')); // -> kiểm tra nếu local có tồn tại thì và có value thì arrayProdut = local
    }
}
function showProductPopup() {
    showPopupCart(); // -> show popup cart
    renderProductCart(); // -> call renderProductCart when this is called
}
function renderProductCart() {
    let totalTemporary = 0;
    changeTypePopupCart();
    document.querySelector('.quantityCart').textContent = (JSON.parse(localStorage.getItem('mycart'))).length; // -> số lượng product trên header
    var dataCart = JSON.parse(localStorage.getItem('mycart'));
    const containerPopupCart = document.querySelector('.container__showProducts');
    dataCart.forEach(product => {
        htmlProduct += `<div class="container__showProducts--item">
                                            <div class="box__image--item">
                                                <img src="${product.image}" alt="">
                                            </div>
                                            <span class="name__item--popup">
                                            ${product.name}
                                            </span>
                                            <input class="number__item--popup" value="${product.quantity}" type="number" name="" id="">
                                            <span class="price__product--popup">
                                            ${formatMoney(product.price * product.quantity)}.000 VNĐ
                                            </span>
                                            <ion-icon class="delete__product-popup" name="close-outline"></ion-icon>
                                        </div>`;
        // tổng tiền
        totalTemporary += (product.quantity * product.price);
    });
    total = totalTemporary;
    document.querySelector('.box__totalPopup-cart').innerHTML = `<span class="total-popup-title">TỔNG TIỀN: </span>
                                                            <span class="total-popup">${formatMoney(total)}.000 VNĐ</span>`;
    containerPopupCart.innerHTML = htmlProduct;
    htmlProduct = ``;
    // xoa san pham
    function deleteProduct() {
        const deleteProduct = document.querySelectorAll('.delete__product-popup');
        for (let index = 0; index < deleteProduct.length; index++) {
            deleteProduct[index].onclick = () => {
                total = total - arrayProduct[index].price;
                arrayProduct.splice(index, 1);
                localStorage.setItem('mycart', JSON.stringify(arrayProduct));
                renderProductCart();
            };
        }
    }
    deleteProduct();
    if (arrayProduct.length == 0) {
        changeTypePopupCart();
        hiddenPopupCart();
    }
}
function showPopupCart() {
    document.querySelector('.popup-cart').classList.add('opacity1');
    document.querySelector('body').classList.add('overflowHidden');
}
function hiddenPopupCart() {
    document.querySelector('.popup-cart').classList.remove('opacity1');
    document.querySelector('body').classList.remove('overflowHidden');
}
function formatMoney(number) {
    return number.toLocaleString('vi-VN');
}
function changeTypePopupCart() {
    const cartHaveItems = document.querySelector('.popup__cart--container');
    const cartEmpty = document.querySelector('.popupCart-empty');
    const labelQuantity = document.querySelector('.quantityCart');
    if (!JSON.parse(localStorage.getItem('mycart')) || JSON.parse(localStorage.getItem('mycart')).length == 0) {
        cartHaveItems.classList.add('displayNone');
        cartEmpty.classList.remove('displayNone');
        labelQuantity.classList.remove('opacity1');
    }
    else {
        cartHaveItems.classList.remove('displayNone'); // ->hiển thị box show sản phẩm
        cartEmpty.classList.add('displayNone'); // -> ẩn box không có sản phẩm
        //  hiển thị label số lượng trên header
        labelQuantity.classList.add('opacity1');
    }
}
addToCart();
export {};
//# sourceMappingURL=db-products.js.map