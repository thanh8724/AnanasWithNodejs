const dropMenus = document.querySelectorAll('.drop__menu');
dropMenus.forEach(menu => {
    menu.onmouseover = (e) => {
        const button_dropMenu = e.target.closest('li').querySelector('.button__drop--menu');
        const this_dropMenu = e.target.closest('li').querySelector('ion-icon');
        button_dropMenu.style.color = 'orangered';
        this_dropMenu.style.transform = 'rotate(180deg)';
    };
    menu.onmouseout = (e) => {
        const button_dropMenu = e.target.closest('li').querySelector('.button__drop--menu');
        const this_dropMenu = e.target.closest('li').querySelector('ion-icon');
        button_dropMenu.style.color = 'black';
        this_dropMenu.style.transform = 'rotate(0)';
    };
});
const drop__menuUls = document.querySelectorAll('.drop__menu--ul');
drop__menuUls.forEach(element => {
    const linkedOfUls = element.querySelectorAll('a');
    linkedOfUls.forEach(tag_a => {
        tag_a.onmouseover = (e) => {
            const button_dropMenu = e.target.closest('.drop__menu').closest('li').querySelector('.button__drop--menu');
            const this_dropMenu = e.target.closest('.drop__menu').closest('li').querySelector('ion-icon');
            button_dropMenu.style.color = 'orangered';
            this_dropMenu.style.transform = 'rotate(180deg)';
        };
        tag_a.onmouseout = (e) => {
            const button_dropMenu = e.target.closest('.drop__menu').closest('li').querySelector('.button__drop--menu');
            const this_dropMenu = e.target.closest('li').querySelector('ion-icon');
            button_dropMenu.style.color = 'black';
            this_dropMenu.style.transform = 'rotate(0)';
        };
    });
});
// HIỂN THỊ POPUP CART
const cartIcon = document.querySelector('.box__cart--icon');
if (cartIcon) {
    cartIcon.onclick = () => {
        showPopupCart();
    };
}
const closeIcon = document.querySelector('.close-popup');
if (closeIcon) {
    closeIcon.onclick = () => {
        hiddenPopupCart();
    };
}
const closebtn = document.querySelector('.buyNow');
if (closebtn) {
    closebtn.onclick = () => {
        hiddenPopupCart();
    };
}
function showPopupCart() {
    document.querySelector('.popup-cart').classList.toggle('opacity1');
    document.querySelector('body').classList.add('overflowHidden');
}
function hiddenPopupCart() {
    document.querySelector('.popup-cart').classList.remove('opacity1');
    document.querySelector('body').classList.remove('overflowHidden');
}
// ẨN HIỂN THỊ TỔNG HÓA ĐƠN TRONG POPUP CART
function showHiddenTotal() {
    const btnToggle = document.querySelector('.hidden__cartPopup--bottom');
    const cartPopup__bottom = document.querySelector('.cartPopup__bottom');
    if (btnToggle) {
        btnToggle.onclick = () => {
            cartPopup__bottom.classList.toggle('transformHiddenY');
            btnToggle.classList.toggle('icon-hidden_total');
        };
    }
}
showHiddenTotal();
export {};
//# sourceMappingURL=menu.js.map