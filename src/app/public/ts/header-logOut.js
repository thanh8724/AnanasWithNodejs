const accountSesstion = JSON.parse(sessionStorage.getItem('account') || 'null');
const linkUser = document.querySelector("#link_loginHederTop");
if (linkUser) {
    if (accountSesstion) {
        linkUser.href = "/user-general";
        linkUser.textContent = accountSesstion[0].nameAccount;
    }
    else {
        linkUser.href = "/login-register";
        linkUser.textContent = "Đăng nhập";
    }
}
const buttonLogOut = document.querySelector(".button__logOut");
if (buttonLogOut) {
    buttonLogOut.onclick = () => {
        sessionStorage.removeItem('account');
    };
}
export {};
//# sourceMappingURL=header-logOut.js.map