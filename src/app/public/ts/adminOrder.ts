import { toastMessage } from "./toastMessage.js";
const toast = toastMessage;
function getPageUpdate() {
    const forms: NodeListOf<Element> = document.querySelectorAll("#formUpdateOrder");
    forms.forEach((form: any) => {
        form.onsubmit = async (event: Event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const idOrder = formData.get("idOrder")
            const response = await fetch('/renderFormOrder', {
                method: 'POST',
                body: JSON.stringify({idOrder}),
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
                renderPageUpdate(res.data, res.listProduct);
            }
        }
    });
}
function updateOrder() {
    const form: HTMLFormElement | null = document.querySelector("#formUpdate");
    if(form) {
        form.onsubmit = async (event: Event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const idOrder = formData.get("idOrder");
            const oldStatus = formData.get("statusOldOrder");
            const newStatus = formData.get("selectNewStatus");
            const response = await fetch('/updateOrder', {
                method: 'POST',
                body: JSON.stringify({idOrder, oldStatus, newStatus}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            if(response.status == 201) { // 200: OK - Yêu cầu được thực hiện thành công. -- 201: Created - Yêu cầu đã tạo thành công một tài nguyên mới.
                toast ({
                    title: res.title,
                    message: res.message,
                    type: 'toast__success'
                });
                setTimeout(() => {
                    window.location.href = "/orders"
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
getPageUpdate();
updateOrder();
function renderPageUpdate(data: any, listProduct: any) {
    const infoReceivers: NodeListOf<Element> = document.querySelectorAll(".infoReceiver");
    const containerSelectUpdateBill: HTMLDivElement | null = document.querySelector(".selectUpdateBill");
    const buttonUpdateOrder: HTMLButtonElement | null = document.querySelector("#buttonUpdateOrder");
    const boxNameProductPerBill: HTMLDivElement | null = document.querySelector('.boxNameProductPerBill');
    let methodShiping = ""
    if(data.shipping == 50000) {
        methodShiping = "Hỏa tốc."
    }
    if(data.shipping == 0) {
        methodShiping = "Giao hàng tiết kiệm."
    }
    if(data.shipping == 30000) {
        methodShiping = "Giao hàng nhanh.";
    }
    if(infoReceivers) {
        infoReceivers[0].textContent = data.receiver;
        infoReceivers[1].textContent = data.emailReceiver;
        infoReceivers[2].textContent = data.phoneReceiver
        infoReceivers[3].textContent = `${data.address}, ${data.adderssSpecific}`
        infoReceivers[4].textContent = methodShiping
        infoReceivers[5].textContent = "Không sử dụng voucher!"
        infoReceivers[7].textContent = data.timeOrder
        infoReceivers[8].textContent = `${data.address}, ${data.adderssSpecific}`
    }   
    if(boxNameProductPerBill) {
        let listName: string = '';
        listProduct.forEach((item: any) => {
            listName += `<span class="infoReceiver infoName">${item.nameProduct}</span>`;
        });
        boxNameProductPerBill.innerHTML = listName;
    }
    // cập nhật đơn hàng ở trạng thái nào
    if(containerSelectUpdateBill && data.status === "Đã giao") {
        containerSelectUpdateBill.innerHTML = `<span class="cantNotUpdate">Đơn hàng đã được giao không thể cập nhật trạng thái hoặc xóa sửa!</span>`;
        if(buttonUpdateOrder) buttonUpdateOrder.style.display = 'none';
    }else {
        if(containerSelectUpdateBill) {
            containerSelectUpdateBill.innerHTML = `<select name="selectNewStatus" id="selectStatusOrder" class="form__input form__inputSelect" style="width: 100%;">
                                                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                                                        <option value="Đang giao">Đang giao</option>
                                                        <option value="Đã giao">Đã giao</option>
                                                    </select>`
            const listOtion: NodeListOf<HTMLOptionElement> = containerSelectUpdateBill.querySelectorAll('option');
            if(listOtion) {
                if(data.status == "Chờ xác nhận") listOtion[0].selected = true;
                if(data.status == "Đang giao") listOtion[1].selected = true;
            }
        }
        if(buttonUpdateOrder) buttonUpdateOrder.style.display = 'block';
    }
    // gán giá trị cho input hidden để có thể lấy giá trị
    const statusOldOrder: NodeListOf<HTMLInputElement> = document.querySelectorAll("#status-id__OldOrder");
    if(statusOldOrder) {
        statusOldOrder[0].value = data.status;
        statusOldOrder[1].value = data.id;
    }
}