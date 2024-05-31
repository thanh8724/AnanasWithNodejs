import { startHandleCart } from "./handleCartPopUp.js";
import { valueCartFromLocal } from "./getDataCart.js";
const addToCart = () => {
    const buttonAddToCarts = document.querySelectorAll(".icon-addcart");
    if (buttonAddToCarts) {
        buttonAddToCarts.forEach(button => {
            button.onclick = (event) => {
                event.preventDefault();
                const containerProduct = button.parentElement?.parentElement?.parentElement;
                const sizeProduct = containerProduct?.getAttribute("data-idCate") == "1" ? "35" : "S"; // check là giày hay áo để add size
                const imageProduct = containerProduct?.querySelector('img');
                const newItemCart = {
                    id: containerProduct?.dataset.id || "",
                    name: containerProduct?.dataset.name || "",
                    price: containerProduct?.dataset.price || "",
                    image: imageProduct.src,
                    size: sizeProduct,
                    quantity: 1
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
        });
    }
};
function run() {
    addToCart();
}
run();
//# sourceMappingURL=addToCart.js.map