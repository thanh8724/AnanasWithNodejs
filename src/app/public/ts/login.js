import { toastMessage } from "./toastMessage.js";
const toast = toastMessage;
const loginForm = document.querySelector(".form__login");
if (loginForm) {
    loginForm.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const emailAccount = formData.get('emailLogin');
        const passwordAccount = formData.get('passwordLogin');
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ emailAccount, passwordAccount }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if (response.status === 404) {
            toast({
                title: res.title,
                message: res.message,
                type: 'toast__error'
            });
        }
        else if (response.status === 200) {
            sessionStorage.setItem("account", res.data);
            toast({
                title: res.title,
                message: res.message,
                type: 'toast__success'
            });
            window.location.href = "/user-general";
        }
    };
}
//# sourceMappingURL=login.js.map