import { toastMessage } from "./toastMessage.js";
const toast = toastMessage;
function createProduct() {
    const form = document.querySelector("#formAddProduct");
    if (form) {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const response = await fetch('/addNewProduct', {
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
                    window.location.href = "/products";
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
function deleteProduct() {
    const forms = document.querySelectorAll("#formDeleteProduct");
    forms.forEach((form) => {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const idProduct = formData.get("idProduct");
            const response = await fetch('/deleteProduct', {
                method: 'POST',
                body: JSON.stringify({ idProduct }),
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
                    window.location.href = "/products";
                }, 1000);
            }
        };
    });
}
function getPageUpdate() {
    const forms = document.querySelectorAll("#updateProduct");
    forms.forEach((form) => {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const idProduct = formData.get("idProduct");
            const response = await fetch('/popupUpdateProduct', {
                method: 'POST',
                body: JSON.stringify({ idProduct }),
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
                renderFormUpdate(res.dataProduct, res.categories);
            }
        };
    });
}
function updateProduct() {
    const form = document.querySelector("#formUpdateProduct");
    if (form) {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const response = await fetch('/postUpdateProduct', {
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
                    window.location.href = "/products";
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
createProduct();
deleteProduct();
getPageUpdate();
updateProduct();
function renderFormUpdate(dataProduct, categories) {
    const selectCategory = document.querySelector('#selectCategory');
    const nameProductUp = document.querySelector('#nameProductUp');
    const priceProductUp = document.querySelector('#priceProductUp');
    const idProductUpdate = document.querySelector('#idProductUpdate');
    const imageOldProduct = document.querySelector('#imageOldProduct');
    const descriptionProductUp = document.querySelector('#descriptionProductUp');
    const imageProductShowUp = document.querySelector('#imageProductShowUp');
    if (selectCategory && nameProductUp && priceProductUp && descriptionProductUp && imageProductShowUp && idProductUpdate && imageOldProduct) {
        let options = '';
        categories.forEach((category) => {
            options += `<option value="${category.id}">${category.nameCategory}</option>`;
        });
        selectCategory.innerHTML = options;
        nameProductUp.value = dataProduct.nameProduct;
        priceProductUp.value = dataProduct.priceProduct;
        descriptionProductUp.value = dataProduct.descriptionProduct;
        imageProductShowUp.src = dataProduct.imageProduct;
        idProductUpdate.value = dataProduct.id;
        imageOldProduct.value = dataProduct.imageProduct;
        const optionList = selectCategory.querySelectorAll("option");
        if (optionList) {
            optionList[dataProduct.categoriesProduct - 1].selected = true;
        }
    }
}
