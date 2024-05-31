export function handleFormRegister(): boolean {
    const form = document.querySelector('.form__register');
    let haveError: boolean = false;
    if(form !== null) {
        const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
        inputs.forEach((input) => {
          if (input.value.trim() === '') {
              haveError = true;
          }
        });
    }
    return haveError;
}