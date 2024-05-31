export function handleFormRegister() {
    const form = document.querySelector('.form__register');
    let haveError = false;
    if (form !== null) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach((input) => {
            if (input.value.trim() === '') {
                haveError = true;
            }
        });
    }
    return haveError;
}
