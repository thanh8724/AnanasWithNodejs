import { toastMessage } from "./toastMessage.js";
// import { readFileJson } from "../../fs.readFile.js";
const toast = toastMessage;
function createCategory() {
    const form = document.querySelector("#form__addCate");
    if (form) {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const response = await fetch('/postCategories', {
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
                    window.location.href = "/categories";
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
function deleteCategory() {
    const forms = document.querySelectorAll("#formDeleteCate");
    forms.forEach((form) => {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const idCategory = formData.get("idCategory");
            const response = await fetch('/deleteCategory', {
                method: 'POST',
                body: JSON.stringify({ idCategory }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            console.log(">>> check client");
            if (response.status == 201) {
                toast({
                    title: res.title,
                    message: res.message,
                    type: 'toast__success'
                });
                setTimeout(() => {
                    window.location.href = "/categories";
                }, 1000);
            }
        };
    });
}
function updateCategory() {
    const form = document.querySelector("#formUpdateCategory");
    if (form) {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const response = await fetch('/updateCategory', {
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
                    window.location.href = "/categories";
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
function getPageUpdate() {
    const forms = document.querySelectorAll("#formGetPageUpdate");
    forms.forEach((form) => {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const idCategory = formData.get("idCategory");
            const response = await fetch('/getPageUpdate', {
                method: 'POST',
                body: JSON.stringify({ idCategory }),
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
                renderFormUpdate(res.data);
            }
        };
    });
}
createCategory();
deleteCategory();
getPageUpdate();
updateCategory();
showHiddenFormUpdate();
//  ẩn hiện form cập nhật danh mục
function showHiddenFormUpdate() {
    const buttonShowForm = document.querySelectorAll(".create");
    const formUpdate = document.querySelector(".container__content2");
    const container__content = document.querySelector(".container__content--main");
    if (buttonShowForm) {
        buttonShowForm.forEach((button) => {
            button.onclick = (e) => {
                const id = button.getAttribute("data-id");
                container__content?.classList.add("transform100");
                formUpdate?.classList.add("transform0");
            };
        });
        const exit = document.querySelector(".exitUpdate");
        if (exit) {
            exit.onclick = () => {
                formUpdate?.classList.remove("transform0");
                container__content?.classList.remove("transform100");
            };
        }
    }
}
// hiển thị thông tin theo danh mục được chọn
function renderFormUpdate(data) {
    const idCategoryHidden = document.querySelector("#idCategoryHidden");
    const urlImageHidden = document.querySelector("#urlImageHidden");
    const inputNameCateUpdate = document.querySelector("#inputNameCateUpdate");
    const descriptionCateUpdate = document.querySelector("#inputDescCateUpdate");
    const imageShowUpdateCate = document.querySelector("#imageShowUpdateCate");
    if (idCategoryHidden && urlImageHidden && inputNameCateUpdate && descriptionCateUpdate && imageShowUpdateCate) {
        idCategoryHidden.value = data.id;
        urlImageHidden.value = data.imageCategory;
        inputNameCateUpdate.value = data.nameCategory;
        descriptionCateUpdate.value = data.descriptionCategory;
        imageShowUpdateCate.src = data.imageCategory;
    }
}
