import { toastMessage } from "./toastMessage.js";
const toast = toastMessage;
const loginForm: HTMLFormElement | null = document.querySelector(".form__login");
if(loginForm) {
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
            toast ({
                    title: res.title,
                    message: res.message,
                    type: 'toast__error'
                })
        }else if(response.status === 201) {
            createCookie('authToken', res.authToken, 1);
            toast ({
                title: res.title,
                message: res.message,
                type: 'toast__success'
            });
            if(res.roleAccount == "user") {
                window.location.href = "/user-general";
            }else {
                window.location.href = "/dashboard";
            }
        }
    }
}
function createCookie(name: string,value: any, days: any) {
     if (days) {
        var date: any = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
     }
     else var expires = "";
     document.cookie = name+"="+value+expires+";";
}