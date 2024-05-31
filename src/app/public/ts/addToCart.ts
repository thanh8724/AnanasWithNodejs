import { startHandleCart } from "./handleCartPopUp.js";
import { valueCartFromLocal } from "./getDataCart.js";
export interface itemCart {
    id: string|number,
    name: string,
    price: string,
    image: string,
    size: string|number,
    quantity: string|number
}
const addToCart = () => {
    const buttonAddToCarts: NodeListOf<Element> = document.querySelectorAll(".icon-addcart");
    if(buttonAddToCarts) {
        buttonAddToCarts.forEach(button => {
            (button as HTMLElement).onclick = (event: MouseEvent) => {
                event.preventDefault();
                const containerProduct = button.parentElement?.parentElement?.parentElement;
                const sizeProduct: string = containerProduct?.getAttribute("data-idCate") == "1" ? "35" : "S"; // check là giày hay áo để add size
                const imageProduct = containerProduct?.querySelector('img') as HTMLImageElement;
                const newItemCart: itemCart = { // create new item cart
                    id: containerProduct?.dataset.id || "",
                    name: containerProduct?.dataset.name || "",
                    price: containerProduct?.dataset.price || "",
                    image: imageProduct.src,
                    size: sizeProduct,
                    quantity: 1
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
        });
    }
}
function run() {
    addToCart();
}
run();