import { toastMessage } from "./toastMessage.js";
const toast = toastMessage;
function createProduct() {
    const form: HTMLFormElement | null = document.querySelector("#formAddProduct");
    if(form) {
        form.onsubmit = async (event: SubmitEvent) => {
            event.preventDefault();
            const formData = new FormData(form);
            const response = await fetch('/addNewProduct', {
                method: 'POST',
                body: formData,
            });
            const res = await response.json();
            if(response.status == 201) { // 200: OK - Yêu cầu được thực hiện thành công. -- 201: Created - Yêu cầu đã tạo thành công một tài nguyên mới.
                toast ({
                    title: res.title,
                    message: res.message,
                    type: 'toast__success'
                });
                setTimeout(() => {
                    window.location.href = "/products"
                }, 1000)
            }
            if(response.status == 400) {
                toast ({
                    title: res.title,
                    message: res.message,
                    type: 'toast__error'
                });
            }
        }
    }
}
function deleteProduct() {
    const forms: NodeListOf<Element> = document.querySelectorAll("#formDeleteProduct");
    forms.forEach((form: any) => {
        form.onsubmit = async (event: Event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const idProduct = formData.get("idProduct")
            const response = await fetch('/deleteProduct', {
                method: 'POST',
                body: JSON.stringify({idProduct}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            if(response.status == 201) {
                 toast ({
                    title: res.title,
                    message: res.message,
                    type: 'toast__success'
                });
                setTimeout(() => {
                    window.location.href = "/products"
                }, 1000)
            }
        }
    });
}
function getPageUpdate() {
    const forms: NodeListOf<Element> = document.querySelectorAll("#updateProduct");
    forms.forEach((form: any) => {
        form.onsubmit = async (event: Event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const idProduct = formData.get("idProduct")
            const response = await fetch('/popupUpdateProduct', {
                method: 'POST',
                body: JSON.stringify({idProduct}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            if(response.status == 201) {
                toast ({
                    title: res.title,
                    message: res.message,
                    type: 'toast__success'
                });                
                renderFormUpdate(res.dataProduct, res.categories);
            }
        }
    });
}
function updateProduct() {
    const form: HTMLFormElement | null = document.querySelector("#formUpdateProduct");
    if(form) {
        form.onsubmit = async (event: Event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const response = await fetch('/postUpdateProduct', {
                method: 'POST',
                body: formData,
            });
            const res = await response.json();
            if(response.status == 201) { // 200: OK - Yêu cầu được thực hiện thành công. -- 201: Created - Yêu cầu đã tạo thành công một tài nguyên mới.
                toast ({
                    title: res.title,
                    message: res.message,
                    type: 'toast__success'
                });
                setTimeout(() => {
                    window.location.href = "/products"
                }, 1000)
            }
            if(response.status == 400) {
                toast ({
                    title: res.title,
                    message: res.message,
                    type: 'toast__error'
                });
            }
        }
    }
}
createProduct();
deleteProduct();
getPageUpdate();
updateProduct();
function renderFormUpdate(dataProduct: any, categories: any): void {
    const selectCategory: HTMLSelectElement | null = document.querySelector('#selectCategory');
    const nameProductUp: HTMLInputElement | null = document.querySelector('#nameProductUp');
    const priceProductUp: HTMLInputElement | null = document.querySelector('#priceProductUp');
    const idProductUpdate: HTMLInputElement | null = document.querySelector('#idProductUpdate');
    const imageOldProduct: HTMLInputElement | null = document.querySelector('#imageOldProduct');
    const descriptionProductUp: HTMLTextAreaElement | null = document.querySelector('#descriptionProductUp');
    const imageProductShowUp: HTMLImageElement | null = document.querySelector('#imageProductShowUp');
    if(selectCategory && nameProductUp && priceProductUp && descriptionProductUp && imageProductShowUp && idProductUpdate && imageOldProduct) {
        let options: string = '';
        categories.forEach((category: any) => {
            options += `<option value="${category.id}">${category.nameCategory}</option>`
        });
        selectCategory.innerHTML = options;
        nameProductUp.value = dataProduct.nameProduct;
        priceProductUp.value = dataProduct.priceProduct;
        descriptionProductUp.value = dataProduct.descriptionProduct;
        imageProductShowUp.src = dataProduct.imageProduct;
        idProductUpdate.value = dataProduct.id;
        imageOldProduct.value = dataProduct.imageProduct;
        const optionList = selectCategory.querySelectorAll("option");
        if(optionList) {
            optionList[dataProduct.categoriesProduct - 1].selected = true;
        }
        
    }
}