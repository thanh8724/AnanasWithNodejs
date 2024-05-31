import { valueCartFromLocal } from "./getDataCart.js";
import { startHandleCart } from "./handleCartPopUp.js";
function handleAddToCart() {
    const buttonAddCart = document.querySelector(".button-add_toCart");
    if (buttonAddCart !== null) {
        buttonAddCart.onclick = (event) => {
            event.preventDefault();
            const id = buttonAddCart.getAttribute("data-idCate");
            const imageProduct = buttonAddCart.getAttribute("data-image");
            let sizeProduct;
            if (id == "1") {
                sizeProduct = document.querySelector(".option-sizeShoe").value;
            }
            else {
                sizeProduct = document.querySelector(".option-sizeTee").value;
            }
            const newItemCart = {
                id: id || "",
                name: buttonAddCart?.dataset.name || "",
                price: buttonAddCart?.dataset.price || "",
                image: imageProduct || "",
                size: sizeProduct || "",
                quantity: document.querySelector(".input_quantityProduct").value
            };
            // check trung san pham
            let indexExistingProduct = valueCartFromLocal.reduce((acc, product, indexProduct) => {
                if (product.id == newItemCart.id && product.size == newItemCart.size) {
                    acc.push(indexProduct);
                }
                return acc;
            }, []);
            if (indexExistingProduct.length === 0) {
                valueCartFromLocal.push(newItemCart);
            }
            else {
                indexExistingProduct.forEach((index) => {
                    let newQuantityProduct = Number(valueCartFromLocal[index].quantity) + 1;
                    valueCartFromLocal[index].quantity = newQuantityProduct;
                });
            }
            const cartJSON = JSON.stringify(valueCartFromLocal);
            localStorage.setItem('cart', cartJSON);
            startHandleCart(valueCartFromLocal);
        };
    }
}
handleAddToCart();
