import { itemCart } from "./addToCart.js";
import { valueCartFromLocal } from "./getDataCart.js";
import { startHandleCart } from "./handleCartPopUp.js";
function handleAddToCart (): void {
    const buttonAddCart: HTMLElement | null = document.querySelector(".button-add_toCart");
    if(buttonAddCart !== null) {
        buttonAddCart.onclick = (event) => {
            event.preventDefault();
            const id: string | null = buttonAddCart.getAttribute("data-idCate");
            const imageProduct: string | null = buttonAddCart.getAttribute("data-image");
            let sizeProduct: string | number;
            if(id == "1") {
                sizeProduct = (document.querySelector(".option-sizeShoe") as HTMLSelectElement).value
            } else {
                sizeProduct = (document.querySelector(".option-sizeTee") as HTMLSelectElement).value
            }
             const newItemCart: itemCart = { // create new item cart
                id: id || "",
                name: buttonAddCart?.dataset.name || "",
                price: buttonAddCart?.dataset.price || "",
                image: imageProduct || "",
                size: sizeProduct || "",
                quantity: (document.querySelector(".input_quantityProduct") as HTMLInputElement).value
            };
            // check trung san pham
                let indexExistingProduct: number[] = valueCartFromLocal.reduce((acc: any, product: itemCart, indexProduct: number) => {
                    if(product.id == newItemCart.id && product.size == newItemCart.size) {
                        acc.push(indexProduct);
                    }
                    return acc;
                }, []);

                if(indexExistingProduct.length === 0) {
                    valueCartFromLocal.push(newItemCart);
                }else {
                    indexExistingProduct.forEach((index) => {
                        let newQuantityProduct: number = Number(valueCartFromLocal[index].quantity) + 1;
                        valueCartFromLocal[index].quantity = newQuantityProduct;
                    });
                }
                const cartJSON = JSON.stringify(valueCartFromLocal);
                localStorage.setItem('cart', cartJSON);
                startHandleCart(valueCartFromLocal);
        }
    }
}
handleAddToCart();