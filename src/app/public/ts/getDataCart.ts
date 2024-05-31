import { itemCart } from "./addToCart.js";
export let valueCartFromLocal: itemCart[] = [];
const cartFromLocalStorage: string|null = localStorage.getItem('cart');
if (cartFromLocalStorage) {
    valueCartFromLocal = JSON.parse(cartFromLocalStorage);
}