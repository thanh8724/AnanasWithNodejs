import { toastMessage } from "./toastMessage.js";
const toast = toastMessage;
function createAccount() {
    const form = document.querySelector("#formAddAccount");
    if (form) {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const response = await fetch('/createAccount', {
                method: 'POST',
                body: formData,
            });
            const res = await response.json();
            if (response.status == 201) { // 200: OK - Yêu cầu được thực hiện thành công. -- 201: Created - Yêu cầu đã tạo thành công một tài nguyên mới.
                toast({
                    title: res.title,
                    message: res.message,
                    type: 'toast__success'
                });
                setTimeout(() => {
                    window.location.href = "/accounts";
                }, 1000);
            }
            if (response.status == 400) {
                toast({
                    title: res.title,
                    message: res.message,
                    type: 'toast__error'
                });
            }
        };
    }
}
function deleteAccount() {
    const forms = document.querySelectorAll("#formDeleteAccount");
    forms.forEach((form) => {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const idAccount = formData.get("idAccoutDelete");
            const response = await fetch('/deleteAccount', {
                method: 'POST',
                body: JSON.stringify({ idAccount }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            if (response.status == 201) {
                toast({
                    title: res.title,
                    message: res.message,
                    type: 'toast__success'
                });
                setTimeout(() => {
                    window.location.href = "/accounts";
                }, 1000);
            }
            if (response.status == 404) {
                toast({
                    title: res.title,
                    message: res.message,
                    type: 'toast__error'
                });
            }
        };
    });
}
createAccount();
deleteAccount();
selectRole();
function selectRole() {
    function toggleRoleCheckbox(checkbox) {
        const checkboxRoleAdmin = document.getElementById("checkboxRoleAdmin");
        const checkboxRoleUser = document.getElementById("checkboxRoleUser");
        if (checkbox.checked) {
            if (checkbox.id === "checkboxRoleAdmin") {
                checkboxRoleUser.checked = false;
            }
            else if (checkbox.id === "checkboxRoleUser") {
                checkboxRoleAdmin.checked = false;
            }
        }
    }
    const checkboxRoleAdmin = document.getElementById("checkboxRoleAdmin");
    const checkboxRoleUser = document.getElementById("checkboxRoleUser");
    checkboxRoleAdmin.addEventListener("click", () => {
        toggleRoleCheckbox(checkboxRoleAdmin);
    });
    checkboxRoleUser.addEventListener("click", () => {
        toggleRoleCheckbox(checkboxRoleUser);
    });
}
