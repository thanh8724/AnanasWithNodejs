export function toastMessage(options) {
    const main = document.querySelector(".container__toast");
    if (main) {
        const toast = document.createElement("div");
        const icons = {
            toast__success: 'checkmark-circle',
            toast__error: 'warning'
        };
        toast.innerHTML = `
                            <div class="toast__icon">
                                <ion-icon name="${icons[options.type]}"></ion-icon>
                            </div>
                            <div class="toast__body">
                                <h3 class="toast__title">${options.title}</h3>
                                <span class="toast__message">${options.message}</span>
                            </div>
                            <div class="toast__close">
                                <ion-icon name="close"></ion-icon>
                            </div>
                            `;
        main.appendChild(toast);
        toast.classList.add("toast", options.type);
        setTimeout(() => {
            main.removeChild(toast);
        }, 4000);
        const closeButton = toast.querySelector(".toast__close");
        if (closeButton) {
            closeButton.addEventListener("click", () => {
                toast.remove(); // Remove the toast on close button click
            });
        }
    }
}
// const button: HTMLButtonElement | null = document.querySelector('#loginButton');
// if(button) {
//     button.onclick = (e) => {
//         e.preventDefault();
// toastMessage({
//     title: "Đăng nhập thành công!",
//     message: 'Bạn đã đăng nhập thành công!',
//     type: 'toast__success'
// });
//     }
// }
