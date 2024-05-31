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
export {};
//# sourceMappingURL=header.js.map