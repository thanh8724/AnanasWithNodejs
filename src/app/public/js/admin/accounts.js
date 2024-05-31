function start() {
    const firebaseConfig = {
        apiKey: "AIzaSyBh5uox4NQaKOIGgmmeeaJzQBimDjHmjT8",
        authDomain: "probable-summer-406516.firebaseapp.com",
        projectId: "probable-summer-406516",
        storageBucket: "probable-summer-406516.appspot.com",
        messagingSenderId: "781752648085",
        appId: "1:781752648085:web:49f47c9c3502b785ddf69c",
        measurementId: "G-TG3NMR4DWP"
    };
    firebase.initializeApp(firebaseConfig);
    const inputRoles = document.querySelectorAll('input[type="checkbox"]');
    inputRoles.forEach((input, index) => {
        input.onchange = () => {
            inputRoles.forEach(element => {
                element.checked = false;
            });
            input.checked = true;
        }
    });
    fetchAccounts(renderAccounts);
    fetchAccounts(createDataAccount);
}
start();
async function fetchAccounts(callback) {
    const addressApi = `http://localhost:3000/accounts`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
async function fetchAddress(callback) {
    const addressApi = `http://localhost:3000/address`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
function createAccount(dataToSend) {
    // nhận dữ liệu từ createDataAccount sau đó đưa dữ liệu lên json sever
    const url = "http://localhost:3000/accounts";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
}
function updateData(data, url) {
    fetch(url, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
}
function renderAccounts(accounts) {
    createPagination(accounts, 7);
    fetchAddress(function (listAddress) {
        const buttonPagination = document.querySelectorAll('.pagination-item');
        buttonPagination.forEach((item, index) => {
            item.onclick = () => {
                displayItems(accounts, index); 
            }
        });
        displayItems(accounts, 1, listAddress);
    })
}
function displayItems(data, index, listAddress) {
    let startIndex = (index - 1) * 7;
    let endIndex = startIndex + 7;
    let itemHtml = ``;
    let showAddress = 'Chưa xác định';
    for (let index = startIndex; index < endIndex; index++) {
        if(index < data.length) {
            let phoneAccount = data[index].phoneAccount;
            if(data[index].phoneAccount.length == 0) phoneAccount = "Không có";
            let addressById = listAddress.filter(address => {
                return address.idAccount == data[index].id;
            });
            if(addressById.length != 0) {
                if(addressById[0].specificAddress || '' && addressById[0].address != "") showAddress = `${addressById[0].specificAddress}, ${addressById[0].address}`
            }
            itemHtml += `<tr>
                            <td>#<span class="id">${data[index].id}</span></td>
                            <td class="tdInfomation">
                                <div class="boxAvatar">
                                    <img src="${data[index].avatarAccount}" alt="">
                                </div>
                                <div class="nameUser">
                                    <span class="nameUser-title">${data[index].nameAccount}</span>
                                    <span class="nameUser-name" style="font-weight: 600;font-size: 15px;">${data[index].emailAccount}</span>
                                    <span class="nameUser-name roleAccount role-${data[index].roleAccount}" style="font-weight: 600;font-size: 15px; display: flex;">${data[index].roleAccount}</span>
                                </div>
                            </td>
                            <td>${showAddress}</td>
                            <td>${phoneAccount}</td>
                            <td>${data[index].passwordAccount}</td>
                            <td class="td-action">
                                <ion-icon id="" class="create" name="create-outline"></ion-icon>
                                |
                                <ion-icon class="deleteAccount" name="close-outline"></ion-icon>
                            </td>
                        </tr>`;
        }else {
            endIndex = data.length;
            break;
        }
    }
    if(index >= 2) {
        document.querySelector('.back-page').onclick = () => {
            displayItems(data, index-1, listAddress);
        }
    }else {
        if(document.querySelector('.back-page')) {
            document.querySelector('.back-page').onclick = () => {
                displayItems(data,  Math.ceil(data.length / 7), listAddress);
            }
        }
    }
    if(index < Math.ceil(data.length / 7)) {
        if(document.querySelector('.next-page')) {
            document.querySelector('.next-page').onclick = () => {
                displayItems(data, index+1, listAddress);
            }
        }
    }else if(index == Math.ceil(data.length / 7)) {
        if(document.querySelector('.next-page')) {
            document.querySelector('.next-page').onclick = () => {
                displayItems(data, 1, listAddress);
            }
        }
    }
    document.querySelector('.content__orders--bottom tbody').innerHTML = itemHtml;
    document.querySelector('.content__orders--top-text2').textContent = `${data.length} New Accounts`
    document.querySelector('.pagination-title').textContent = `Showing ${startIndex+1} - ${endIndex} of ${data.length}`;
    document.querySelectorAll('.pagination-item .pagination-item__link').forEach(element => {
        element.classList.remove('pagination-item__link-active');
    });
    if(document.querySelector('.pagination-item .pagination-item__link')) {
        document.querySelectorAll('.pagination-item .pagination-item__link')[index].classList.add('pagination-item__link-active');
    }
    itemHtml = '';
    deleteAccount();
    showHiddenFormUpdate(renderFormUpdate);
}
async function createDataAccount(data) {
    const inputs = document.querySelector('.form__group-role').querySelectorAll('input');
    const role = Array.from(inputs).filter((a) => {
        return a.checked == true;
    }).map(function(checkbox) {
        return checkbox.value;
    });
    let idAccount = 1;
    if(data != undefined && data.length != 0) {
      idAccount = Number(data[data.length - 1].id) + 1;
    }
    // kiểm tra - lấy dữ liệu từ form sau đó gọi hàm create account để đưa dữ liệu lên json sever
    const buttonCreate = document.querySelector(".button__addItem");
    const form = document.querySelector("#formAddAccount");
    if (buttonCreate) {
      buttonCreate.onclick = (e) => {
        e.preventDefault();
        checkAccountAndSubmit();
      };
    }
  
    async function checkAccountAndSubmit() {
      try {
        if (handleForm(form)) {
          const accountExist = await isAccountExist(
            "","",
            form.querySelector(".email--input"),
            form.querySelector(".password--input"),
            false
          );
          console.log(accountExist);
          if (accountExist == true) {
            if(document.querySelector('.input_file').value == "") {
                const data = {
                  id: `${idAccount}`,
                  nameAccount: form.querySelector(".nameAccount--input").value,
                  emailAccount: form.querySelector(".email--input").value,
                  passwordAccount: form.querySelector(".password--input").value,
                  phoneAccount: "",
                  avatarAccount: "https://i.pinimg.com/564x/c7/89/24/c78924c5ea7cd7ae22d35b6cb38bfe47.jpg",
                  roleAccount: role[0],
                };
                createAccount(data);
            }else {
                const data = {
                    id: `${idAccount}`,
                    nameAccount: form.querySelector(".nameAccount--input").value,
                    emailAccount: form.querySelector(".email--input").value,
                    passwordAccount: form.querySelector(".password--input").value,
                    phoneAccount: "",
                    avatarAccount: "",
                    roleAccount: role[0],
                };
                postImageToFireBase(document.querySelector('.input_file'), data, 'post');
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
}
function deleteAccount() {
    const buttonDelete = document.querySelectorAll('.deleteAccount');
    buttonDelete.forEach(button => {
        button.onclick = (event) => {
            const idAccount = button.parentElement.parentElement.querySelector('.id').textContent;
            const roleAccount = button.parentElement.parentElement.querySelector('.roleAccount').textContent;
            if(roleAccount != "admin") {
                fetch(`http://localhost:3000/accounts/${idAccount}`, {
                    method: 'DELETE'
                })
            }else {
                toastMessage();
            }
        }
    });
}
function toastMessage() {
    document.querySelector(".containerToast").innerHTML = `
        <div class="toast">
        <div class="toast__icon">
            <ion-icon name="warning-outline"></ion-icon>
        </div>
        <div class="toastMessage">
            <span class="toastMessage__title">Warning</span>
            <span class="toastMessage__content">Tài khoản Admin không thể xóa!</span>
        </div>
        <div class="toastButton">
            <!-- <ion-icon name="home-outline"></ion-icon> -->
        </div>
      </div> `;
}
function renderFormUpdate() {
    const id = document.querySelector('#idCategory').textContent;
    const addressApi = `http://localhost:3000/accounts/${id}`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            let isAdmin = false;
            document.querySelector('#userName').value = data.nameAccount;
            document.querySelector('#emailAccount').value = data.emailAccount;
            document.querySelector('#phoneAccount').value = data.phoneAccount;
            document.querySelector('#passwordAccount').value = data.passwordAccount;
            document.querySelector('#avatarAccount').src = data.avatarAccount;
            if(data.roleAccount == "admin") isAdmin = true;

            if(isAdmin){
                document.querySelector('#roleAdmin').checked = true;
                document.querySelector('#roleUser').checked = false;
            }else {
                document.querySelector('#roleAdmin').checked = false;
                document.querySelector('#roleUser').checked = true;
            }
            const inputRoles = document.querySelectorAll('input[type="checkbox"]');
            inputRoles.forEach((input, index) => {
                input.onchange = () => {
                    inputRoles.forEach(element => {
                        element.checked = false;
                    });
                    input.checked = true;
                }
            });
            createDataUpdate(data.emailAccount, data.passwordAccount);
        })
}
function createDataUpdate(emailActive, passwordActive) {
    const buttonUpdate = document.querySelector('.buttonUpdate');
    const form = document.querySelector('#formUpdate');
    buttonUpdate.onclick = (e) => {
        e.preventDefault();
        if(handleForm(form)) {
            checkAccountAndSubmit(emailActive, passwordActive)
        }
    }
    async function checkAccountAndSubmit(emailActive, passwordActive) {
        try {
            const inputs = document.querySelector('.form__group-role').querySelectorAll('input');
            const role = Array.from(inputs).filter((a) => {
                return a.checked == true;
            }).map(function(checkbox) {
                return checkbox.value;
            });
            const avatarOld = document.querySelector('#avatarAccount').src;
            const accountExist = await isAccountExist(
                emailActive,
                passwordActive,
                form.querySelector('.email--input'),
                form.querySelector('.password--input'),
                false
            );
            if(accountExist) {
                if(document.querySelector('.upLoadAvatar').value == "" || document.querySelector('.upLoadAvatar').value == avatarOld) {
                    data = {
                        nameAccount:  document.querySelector('#userName').value,
                        emailAccount: document.querySelector('#emailAccount').value,
                        passwordAccount: document.querySelector('#passwordAccount').value,
                        phoneAccount: document.querySelector('#phoneAccount').value,
                        roleAccount: role[0]
                    }
                    // hiddenUpdate();
                    updateData(data, `http://localhost:3000/accounts/${document.querySelector('#idCategory').textContent}`);
                }else {
                    data = {
                        nameAccount:  document.querySelector('#userName').value,
                        emailAccount: document.querySelector('#emailAccount').value,
                        passwordAccount: document.querySelector('#passwordAccount').value,
                        phoneAccount: document.querySelector('#phoneAccount').value,
                        roleAccount: role[0]
                    }
                    // hiddenUpdate();
                    if(!avatarOld.includes('https://i.pinimg.com/564x/c7/89/24/c78924c5ea7cd7ae22d35b6cb38bfe47.jpg')) {
                        deleteImageFireBase(avatarOld);
                    }
                    postImageToFireBase(document.querySelector('.upLoadAvatar'), data, 'update');
                }
            }
        }catch (error) {
            console.error(error);
        }
    }
}
async function fetchAccount(callback) {
    const apiUrl = "http://localhost:3000/accounts";
    try {
      await fetch(apiUrl)
        .then((response) => response.json())
        .then(callback);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
}
function getAccountAsync() {
    // -> return the accounts list from the server
    return new Promise((resolve) => {
      fetchAccount((accounts) => {
        resolve(accounts);
      });
    });
}
async function isAccountExist(emailActive, passwordActive, emailInput, passwordInput, getAccountExist) {
    try {
      const accounts = await getAccountAsync();
      for (const account of accounts) {
        if (!getAccountExist) {
            if(emailInput.value != emailActive || passwordInput.value != passwordActive) {
                if (emailInput.value != emailActive && emailInput.value == account.emailAccount) {
                    emailInput.focus();
                    emailInput.parentElement.querySelector(".form__message").textContent =
                        "Email đã tồn tại!";
                    hasError = true;
                    return false;
                }
                if (passwordInput.value != passwordActive && passwordInput.value == account.passwordAccount) {
                    passwordInput.focus();
                    passwordInput.parentElement.querySelector(
                        ".form__message"
                    ).textContent = "Mật khẩu đã tồn tại!";
                    return false;
                }
            }
        }
      }
      return true;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ server:", error);
    }
}
function isValidEmail(email) {
    // -> check is Email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}
function validatePhoneNumber(phoneNumber) {``
    // Định dạng số điện thoại: (xxx) xxx-xxxx hoặc xxx-xxx-xxxx
    const regex = /^(0[2|3|5|6|7|8|9])+([0-9]{8})$/;
    return regex.test(phoneNumber);
}
function handleForm(form) {
    // -> validate form
    const inputs = form.querySelectorAll("input");
    const errorMessages = form.querySelectorAll(".form__message");
    errorMessages.forEach((message) => (message.textContent = ""));
    let firstEmptyInput = null;
    let hasError = false;
    inputs.forEach((input, index) => {
        if(input.type != "file") {
            if (input.value.trim() === "") {
              if (firstEmptyInput === null) {
                firstEmptyInput = input;
              }
              hasError = true;
              return;
            }
        }
        if(form.querySelector(".email--input")) {
            if (!isValidEmail(form.querySelector(".email--input").value)) {
                form.querySelector(".email--input").focus();
                form.querySelector(".email--input").parentElement.querySelector(".form__message").textContent =
                "Đây không phải là Email!";
                hasError = true;
                return;
            }
        }
        if(form.querySelector(".phone--input")) {
            if(!validatePhoneNumber(form.querySelector(".phone--input").value)) {
                form.querySelector(".phone--input").focus();
                form.querySelector(".phone--input").parentElement.querySelector(".form__message").textContent =
                "Số điện thoại không hợp lệ!";
                hasError = true;
                return;
            }
        }
      if (form.querySelector(".password--input").value.length < 8) {
            form.querySelector(".password--input").focus();
            form.querySelector(".password--input").parentElement.querySelector(".form__message").textContent =
          "Mật khẩu có ít nhẩt 8 kí tự!";
            hasError = true;
            return;
      }
    });
    if (hasError) {
      if (firstEmptyInput !== null) {
        console.log(firstEmptyInput);
        firstEmptyInput.focus();
        firstEmptyInput.parentElement.querySelector(
          ".form__message"
        ).textContent = "Vui lòng điền thông tin!";
      }
      return false;
    }
    return true;
}
function postImageToFireBase(fileInput, dataToSend, options) {
    let storageRef = firebase.storage().ref();
    let file = fileInput.files[0];
    loadingTiktok();
    if(fileInput.value.length != 0 && options == 'post') {
        let imagePostRef = storageRef.child("avatarAccount/" + file.name);
        imagePostRef.put(file).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
            data = {
                id: dataToSend.id,
                nameAccount: dataToSend.nameAccount,
                emailAccount: dataToSend.emailAccount,
                passwordAccount: dataToSend.passwordAccount,
                phoneAccount: "",
                avatarAccount: downloadURL,
                roleAccount: dataToSend.roleAccount
            }
            createAccount(data);
            });
        })
    }else if(fileInput.value.length != 0 && options == "update") {
        loadingTiktok();
        let imagePostRef = storageRef.child("avatarAccount/" + file.name);
        imagePostRef.put(file).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                data = {
                    nameAccount: dataToSend.nameAccount,
                    emailAccount: dataToSend.emailAccount,
                    passwordAccount: dataToSend.passwordAccount,
                    phoneAccount: dataToSend.phoneAccount,
                    avatarAccount:  downloadURL,
                    roleAccount: dataToSend.roleAccount
                }
                updateData(data, `http://localhost:3000/accounts/${document.querySelector('#idCategory').textContent}`);
            });
        })
    }else if(fileInput.value.length == 0 && options == "update") {
        updateData(data, `http://localhost:3000/accounts/${document.querySelector('#idCategory').textContent}`);
    }
}
function deleteImageFireBase(imageURL) {
    loadingTiktok();
    let imageRef = firebase.storage().refFromURL(imageURL);
    imageRef
    .delete()
}
function loadingTiktok() {
    document.querySelector('#loadingTiktok').classList.add('opacity1');
}
function hiddenPopupUpdate() {
    const formUpdate = document.querySelector('.container__content2');
    const container__content = document.querySelector('.container__content--main');
    formUpdate.classList.add('transform0');
    container__content.classList.add('transform100');
}