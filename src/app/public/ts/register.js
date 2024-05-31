import { toastMessage } from "./toastMessage.js";
const toast = toastMessage;
const registerForm = document.querySelector(".form__register");
if (registerForm) {
    registerForm.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const nameAccount = formData.get('nameAccountRegister');
        const emailAccount = formData.get('emailAccountRegister');
        const passwordAccount = formData.get('passwordAccountRegister');
        const response = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify({ nameAccount, emailAccount, passwordAccount }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const messageData = await response.json();
        if (response.status === 400) {
            toast({
                title: messageData.title,
                message: messageData.message,
                type: 'toast__error'
            });
        }
        else if (response.status === 201) {
            toast({
                title: messageData.title,
                message: messageData.message,
                type: 'toast__success'
            });
            const container = document.querySelector(".container__main");
            if (container) {
                container.classList.remove("translate-container");
            }
        }
    };
}
//# sourceMappingURL=register.js.map