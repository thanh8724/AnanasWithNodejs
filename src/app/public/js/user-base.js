function start() {
    logOut();
    backAction();
    showPopupAddress();
}
start();

function logOut() {
    const button__logOut = document.querySelector('.button__logOut');
    if(button__logOut) {
        button__logOut.onclick = () => {
            if(localStorage.getItem('account')) {
                localStorage.removeItem('account');
                window.location.href = "index.html";
            }
        }
    }
}
function backAction() {
    const buttonBack = document.querySelector('.button__back');
    if(buttonBack) {
        buttonBack.onclick = () => {
            window.history.back();
        }
    }
}

function showPopupAddress() {
    const buttonAddAddress = document.querySelectorAll('.togglePopupAddress');
    if(buttonAddAddress) {
        buttonAddAddress.forEach(button => {
            button.onclick = () => {
                document.querySelector('.popup__add-address').classList.toggle('show-popup__add-address');
            }
        });
    }
}