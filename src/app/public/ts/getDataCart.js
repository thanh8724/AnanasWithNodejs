export let valueCartFromLocal = [];
const cartFromLocalStorage = localStorage.getItem('cart');
if (cartFromLocalStorage) {
    valueCartFromLocal = JSON.parse(cartFromLocalStorage);
}
//# sourceMappingURL=getDataCart.js.map