function start() {
    base();
    fetchAccount(createDataAccount);
    loginAccount();
}
start();
async function fetchAccount(callback) {
    const apiUrl = "http://localhost:3000/accounts";
    try {
        await fetch(apiUrl)
            .then((response) => response.json())
            .then(callback);
    }
    catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}
function createAccount(dataToSend) {
    // nhận dữ liệu từ createDataAccount sau đó đưa dữ liệu lên json sever
    const url = "http://localhost:3000/accounts";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
    });
}
async function createDataAccount(data) {
    let idAccount = 1;
    if (data != undefined && data.length != 0) {
        idAccount = Number(data[data.length - 1].id) + 1;
    }
    // kiểm tra - lấy dữ liệu từ form sau đó gọi hàm create account để đưa dữ liệu lên json sever
    const buttonCreate = document.querySelector("#registerButton");
    const form = document.querySelector(".form__register");
    if (buttonCreate) {
        buttonCreate.onclick = (e) => {
            e.preventDefault();
            checkAccountAndSubmit();
        };
    }
    async function checkAccountAndSubmit() {
        try {
            if (handleForm(form)) {
                const accountExist = await isAccountExist(form.querySelector(".email--input"), form.querySelector(".password--input"), false);
                if (accountExist.hasError == false) {
                    const nameAccount = form.querySelector(".nameAccount--input").value;
                    const emailAccount = form.querySelector(".email--input").value;
                    const passwordAccount = form.querySelector(".password--input").value;
                    const data = {
                        id: `${idAccount}`,
                        nameAccount: nameAccount,
                        emailAccount: emailAccount,
                        passwordAccount: passwordAccount,
                        phoneAccount: "",
                        avatarAccount: "../images/avatarNone.png",
                        roleAccount: "user",
                    };
                    console.log('register successfuly');
                    createAccount(data);
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}
async function loginAccount() {
    // -> đăng nhập
    const buttonLogin = document.querySelector("#loginButton");
    const form = document.querySelector(".form__login");
    if (buttonLogin) {
        buttonLogin.onclick = (e) => {
            e.preventDefault();
            checkAccountAndSubmit(form);
        };
    }
    async function checkAccountAndSubmit(form) {
        try {
            if (handleForm(form)) {
                const accountExist = await isAccountExist(form.querySelector(".email--input"), form.querySelector(".password--input"), true);
                if (accountExist.hasError == false) {
                    console.log(accountExist);
                    const data = {
                        nameAccount: accountExist.account.nameAccount,
                        emailAccount: accountExist.account.emailAccount,
                        passwordAccount: accountExist.account.passwordAccount,
                        idAccount: accountExist.account.id,
                    };
                    toastMessage(accountExist.type, "Thành công!", accountExist.messageToast);
                    localStorage.setItem("account", JSON.stringify(data));
                    const isFromCart = document.referrer;
                    setTimeout(() => {
                        if (accountExist.account.roleAccount == "user") {
                            if (isFromCart.includes("cart.html")) {
                                window.location.href = "checkout.html";
                            }
                            else {
                                window.location.href = "index.html";
                            }
                        }
                        else if (accountExist.account.roleAccount == "admin") {
                            window.location.href = "../admin-page/dashboard.html";
                        }
                    }, 1000);
                }
                else {
                    toastMessage(accountExist.type, "Thất bại!", accountExist.messageToast);
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}
function getAccountAsync() {
    // -> return the accounts list from the server
    return new Promise((resolve) => {
        fetchAccount((accounts) => {
            resolve(accounts);
        });
    });
}
getAccountAsync();
async function isAccountExist(emailInput, passwordInput, getAccountExist) {
    try {
        const accounts = await getAccountAsync();
        let hasError = true;
        let typeError = 'success';
        let messageToast = 'Đăng nhập thành công!';
        let emailMatch = false;
        let passwordMatch = false;
        let account_temp = null;
        for (const account of accounts) {
            if (!getAccountExist) {
                if (emailInput.value == account.emailAccount || passwordInput.value == account.passwordAccount) {
                    if (emailInput.value == account.emailAccount) {
                        emailInput.focus();
                        emailInput.parentElement.querySelector(".form__message").textContent =
                            "Email đã tồn tại!";
                        hasError = true;
                        return { hasError: true, errorMessage: "Email đã tồn tại!", typeError: "error" };
                    }
                    if (passwordInput.value == account.passwordAccount) {
                        passwordInput.focus();
                        passwordInput.parentElement.querySelector(".form__message").textContent = "Mật khẩu đã tồn tại!";
                        hasError = true;
                        return { hasError: true, errorMessage: "Mật khẩu đã tồn tại!", typeError: "error" };
                    }
                }
            }
            if (getAccountExist) {
                if (emailInput.value == account.emailAccount && passwordInput.value == account.passwordAccount) {
                    hasError = false;
                    account_temp = account;
                    return { hasError: false, type: typeError, messageToast: messageToast, account: account };
                }
                else {
                    if (emailInput.value == account.emailAccount && passwordInput.value != account.passwordAccount) {
                        emailMatch = true;
                        passwordMatch = false;
                    }
                    if (passwordInput.value == account.passwordAccount && emailInput.value != account.emailAccount) {
                        emailMatch = false;
                        passwordMatch = true;
                    }
                }
            }
        }
        if (getAccountExist) {
            if (emailMatch && !passwordMatch) {
                passwordInput.focus();
                passwordInput.parentElement.querySelector(".form__message").textContent = "Mật khẩu không đúng!";
                hasError = true;
                typeError = 'error';
                messageToast = "Mật khẩu không đúng!";
                return { hasError: true, type: typeError, messageToast: messageToast, account: null };
            }
            if (!emailMatch && passwordMatch) {
                emailInput.focus();
                emailInput.parentElement.querySelector(".form__message").textContent = "Email không đúng!";
                hasError = true;
                typeError = 'error';
                messageToast = "Email không đúng!";
                return { hasError: true, type: typeError, messageToast: messageToast, account: null };
            }
            if (!emailMatch && !passwordMatch) {
                emailInput.parentElement.querySelector(".form__message").textContent = "Email không tồn tại!";
                passwordInput.parentElement.querySelector(".form__message").textContent = "Mật khẩu không tồn tại!";
                hasError = true;
                typeError = 'error';
                messageToast = "Email không tồn tại! - Mật khẩu không tồn tại!";
                return { hasError: true, type: typeError, messageToast: messageToast, account: null };
            }
        }
        if (!getAccountExist) {
            return { hasError: false, errorMessage: "Thành công!", typeError: "success" };
        }
        else {
            return { hasError: hasError, type: typeError, messageToast: messageToast, account: account_temp };
        }
    }
    catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server:", error);
    }
}
function isValidEmail(email) {
    // -> check is Email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}
function handleForm(form) {
    // -> validate form
    const inputs = form.querySelectorAll("input");
    const errorMessages = form.querySelectorAll(".form__message");
    errorMessages.forEach((message) => (message.textContent = ""));
    let firstEmptyInput = null;
    let hasError = false;
    inputs.forEach((input, index) => {
        if (input.value.trim() === "") {
            if (firstEmptyInput === null) {
                firstEmptyInput = input;
            }
            hasError = true;
            return;
        }
        if (!isValidEmail(form.querySelector(".email--input").value)) {
            form.querySelector(".email--input").focus();
            form
                .querySelector(".email--input")
                .parentElement.querySelector(".form__message").textContent =
                "Đây không phải là Email!";
            hasError = true;
            return;
        }
        if (form.querySelector(".password--input").value.length < 8) {
            form.querySelector(".password--input").focus();
            form
                .querySelector(".password--input")
                .parentElement.querySelector(".form__message").textContent =
                "Mật khẩu có ít nhẩt 8 kí tự!";
            hasError = true;
            return;
        }
    });
    if (hasError) {
        if (firstEmptyInput !== null) {
            firstEmptyInput.focus();
            firstEmptyInput.parentElement.querySelector(".form__message").textContent = "Vui lòng điền thông tin!";
        }
        return false;
    }
    return true;
}
function base() {
    const container_main = document.querySelector(".container__main");
    if (document.querySelector(".form_register") ||
        document.querySelector(".form_login")) {
        document.querySelector(".form_register").onclick = () => {
            container_main.classList.add("translate-container");
        };
        document.querySelector(".form_login").onclick = () => {
            container_main.classList.remove("translate-container");
        };
    }
    function show_hiddenPassword() {
        // const inputPassword = document.querySelector('.input__password');
        const input_showPassword = document.querySelector(".input_show--password");
        // hidden - show password
        const hiddenShowPasswordButtons = document.querySelectorAll(".show-hidden_password");
        if (hiddenShowPasswordButtons) {
            hiddenShowPasswordButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const input_password = button
                        .closest(".form__group")
                        .querySelector(".form__input");
                    input_password.type =
                        input_password.type === "password" ? "text" : "password";
                    button.querySelectorAll(".eye-icon").forEach((item) => {
                        item.classList.toggle("eye-active");
                    });
                });
            });
        }
    }
    show_hiddenPassword();
}
function toastMessage(type, title, message) {
    document.querySelector(".containerToast").innerHTML = `
      <div class="toast ${type}">
      <div class="toast__icon">
      <ion-icon name="alert-circle-outline" class="icon__error"></ion-icon>
      <ion-icon name="cloud-done-outline" class="icon__success"></ion-icon>
      </div>
      <div class="toastMessage">
          <span class="toastMessage__title">${title}</span>
          <span class="toastMessage__content">${message}</span>
      </div>
      <div class="toastButton">
          <!-- <ion-icon name="home-outline"></ion-icon> -->
      </div>
    </div> `;
}
export {};
//# sourceMappingURL=account.js.map