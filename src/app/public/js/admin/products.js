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
    fetchProducts(renderProducts);
    fetchProducts(createDataProduct);
    fetchCategories(renderFormAddProduct);
}
start();
async function fetchProducts(callback) {
    const addressApi = `http://localhost:3000/products`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
async function fectchImgDetailProduct(callback) {
    const addressApi = `http://localhost:3000/imageProducts`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
async function fetchCategories(callback) {
    const addressApi = `http://localhost:3000/categories`
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
function createProduct(dataToSend) {
    // nhận dữ liệu từ createDataAccount sau đó đưa dữ liệu lên json sever
    const url = "http://localhost:3000/products";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
}
function createImageProduct(dataToSend) {
    // nhận dữ liệu từ createDataAccount sau đó đưa dữ liệu lên json sever
    const url = "http://localhost:3000/imageProducts";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
}
function renderProducts(products) {
    createPagination(products, 7);
    const buttonPagination = document.querySelectorAll('.pagination-item');
    buttonPagination.forEach((item, index) => {
        item.onclick = () => {
            displayItems(products, index);
        }
    });
    displayItems(products, 1);
}
function displayItems(data, index) {
    let startIndex = (index - 1) * 7;
    let endIndex = startIndex + 7;
    let itemHtml = ``;
    for (let index = startIndex; index < endIndex; index++) {
        if(index < data.length) {
            itemHtml += `<tr>
                            <td>#<span class="id">${data[index].id}</span></td>
                            <td class="tdInfomation">
                                <div class="boxAvatar">
                                    <img id="avatarProduct" src="${data[index].imageProduct}" alt="">
                                </div>
                                <div class="nameUser">
                                    <span class="nameUser-title">Quantity Items</span>
                                    <span class="nameUser-name" style="display: flex; justify-content: flex-start;">... Items</span>
                                </div>
                            </td>
                            <td style="word-wrap: break-word;">${data[index].nameProduct}</td>
                            <td>${formatMoney((data[index].priceProduct))} VND</td>
                            <td class="td-action">
                                <ion-icon class="create" name="create-outline"></ion-icon>
                                |
                                <ion-icon class="deleteAccount" id="deleteProduct" name="close-outline"></ion-icon>
                            </td>
                        </tr>`;
        }else {
            endIndex = data.length;
            break;
        }
    }
    if(index >= 2) {
        document.querySelector('.back-page').onclick = () => {
            displayItems(data, index-1);
        }
    }else {
        document.querySelector('.back-page').onclick = () => {
            displayItems(data,  Math.ceil(data.length / 7));
        }
    }
    if(index < Math.ceil(data.length / 7)) {
        if(document.querySelector('.next-page')) {
            document.querySelector('.next-page').onclick = () => {
                displayItems(data, index+1);
            }
        }
    }else if(index == Math.ceil(data.length / 7)) {
        if(document.querySelector('.next-page')) {
            document.querySelector('.next-page').onclick = () => {
                displayItems(data, 1);
            }
        }
    }
    document.querySelector('.content__orders--bottom tbody').innerHTML = itemHtml;
    document.querySelector('.pagination-title').textContent = `Showing ${startIndex+1} - ${endIndex} of ${data.length}`;
    document.querySelectorAll('.pagination-item .pagination-item__link').forEach(element => {
        element.classList.remove('pagination-item__link-active');
    });
    if(document.querySelector('.pagination-item .pagination-item__link')) {
        document.querySelectorAll('.pagination-item .pagination-item__link')[index].classList.add('pagination-item__link-active');
    }
    itemHtml = '';
    showHiddenFormUpdate(renderFormUpdate);
    deleteProduct();
}
function renderFormUpdate() {
    const id = document.querySelector('#idCategory').textContent;
    const options = document.querySelector('#selectCategory').querySelectorAll('option');
    const addressApi = `http://localhost:3000/products/${id}`;
    fetch(addressApi)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            document.querySelector('#nameProductUp').value = data.nameProduct;
            document.querySelector('#priceProductUp').value = data.priceProduct;
            document.querySelector('#descriptionProductUp').value = data.descriptionProduct;
            document.querySelector('#imageProductShowUp').src = data.imageProduct;
            options.forEach(option => {
                if(option.value == data.categoriesProduct) {
                    option.selected = true;
                }
            });
        })
    updateProduct(id);
}
function updateProduct(id) {
    const button = document.querySelector('#buttonUpdateProduct');
    button.onclick = (e) => {
        e.preventDefault();
        if(handleForm(document.querySelector('#formUpdateProduct'))) {
            if(document.querySelector('#upDateAvatar').value == "") {
                data = {
                    id: `${id}`,
                    nameProduct: document.querySelector('#nameProductUp').value,
                    priceProduct: document.querySelector('#priceProductUp').value,
                    categoriesProduct: document.querySelector('#selectCategory').value,
                    descriptionProduct: document.querySelector('#descriptionProductUp').value
                }
                fetch(`http://localhost:3000/products/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    })
            }else {
                data = {
                    id: `${id}`,
                    nameProduct: document.querySelector('#nameProductUp').value,
                    priceProduct: document.querySelector('#priceProductUp').value,
                    categoriesProduct: document.querySelector('#selectCategory').value,
                    descriptionProduct: document.querySelector('#descriptionProductUp').value
                }
                postImageToFireBase(document.querySelector('#upDateAvatar'), data, 'update');
            }
        }
    }
}
function renderFormAddProduct(categories) {
    let option = '';
    categories.forEach(category => {
        option += `<option value="${category.id}">${category.nameCategory}</option>`;
    });
    document.querySelectorAll('#selectCategory').forEach(element => {
        element.innerHTML = option;
    });
}
function createDataProduct(products) {
    let idProduct = 1;
    if(products.length > 1) {
        idProduct = Number(products[products.length - 1].id) + 1;
    }
    const buttonAdd = document.querySelector('#buttonAddProduct');
    if(buttonAdd) {
        buttonAdd.onclick = (event) => {
            event.preventDefault();
            if(handleForm(document.querySelector('#formAddProduct'))) {
                if(document.querySelector('#inputAvatarproduct').value == "") {
                    data = {
                        id: `${idProduct}`,
                        imageProduct: "https://i.pinimg.com/564x/c7/89/24/c78924c5ea7cd7ae22d35b6cb38bfe47.jpg",
                        nameProduct: document.querySelector('#nameProduct').value,
                        priceProduct: document.querySelector('#priceProduct').value,
                        viewProduct: 0,
                        quantitySold: 0,
                        categoriesProduct: document.querySelector('#selectCategory').value,
                        descriptionProduct: document.querySelector('#descriptionProduct').value
                    }
                    createProduct(data);
                }
                if(document.querySelector('#inputAvatarproduct').value != "") {
                    data = {
                        id: `${idProduct}`,
                        imageProduct: "",
                        nameProduct:  document.querySelector('#nameProduct').value,
                        priceProduct: document.querySelector('#priceProduct').value,
                        viewProduct: 0,
                        quantitySold: 0,
                        categoriesProduct: document.querySelector('#selectCategory').value,
                        descriptionProduct: document.querySelector('#descriptionProduct').value
                    }
                    postImageToFireBase(document.querySelector('#inputAvatarproduct'), data, 'post');
                }
                if(document.querySelector('#inputImagesProduct').files.length == 0) {
                    dataImageDetail = {
                        id: `${idProduct}`,
                        images: [
                            'https://i.pinimg.com/564x/c7/89/24/c78924c5ea7cd7ae22d35b6cb38bfe47.jpg'
                        ]
                    }
                    createImageProduct(dataImageDetail);
                }
                if(document.querySelector('#inputImagesProduct').files.length != 0) {
                    dataImageDetail = {
                        id: `${idProduct}`,
                        images: ""  
                    }
                    postImageDetails(document.querySelector('#inputImagesProduct').files, dataImageDetail);
                }
            }
        };
    }
}
function handleForm(form) {
    // -> validate form
    const inputs = form.querySelectorAll(".form__input");
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
        let imagePostRef = storageRef.child("avatarProduct/" + file.name);
        imagePostRef.put(file).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                data = {
                    id: dataToSend.id,
                    imageProduct: downloadURL,
                    nameProduct:  dataToSend.nameProduct,
                    priceProduct: dataToSend.priceProduct,
                    viewProduct: 0,
                    quantitySold: 0,
                    categoriesProduct: dataToSend.categoriesProduct,
                    descriptionProduct: dataToSend.descriptionProduct
                }
                createProduct(data);
            });
        })
    }else if(fileInput.value.length != 0 && options == "update") {
        deleteImageFireBase(document.querySelector('#imageProductShowUp').src);
        loadingTiktok();
        let imagePostRef = storageRef.child("avatarProduct/" + file.name);
        imagePostRef.put(file).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                data = {
                    id: dataToSend.id,
                    imageProduct: downloadURL,
                    nameProduct:  dataToSend.nameProduct,
                    priceProduct: dataToSend.priceProduct,
                    viewProduct: 0,
                    quantitySold: 0,
                    categoriesProduct: dataToSend.categoriesProduct,
                    descriptionProduct: dataToSend.descriptionProduct
                }
                fetch(`http://localhost:3000/products/${dataToSend.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    })
            });
        })
    }else if(fileInput.value.length == 0 && options == "update") {
        updateData(data, `http://localhost:3000/accounts/${document.querySelector('#idCategory').textContent}`);
    }
}
async function postImageDetails(fileInput, dataToSend) {
    try {
        let storageRef = firebase.storage().ref();
        let files = fileInput;
        let uploadPromises = [];
        let arrayUrlImg = [];
    
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let imageRef = storageRef.child('imagesDetailProduct/' + file.name);
            let uploadTask = imageRef.put(file);
            let uploadPromise = uploadTask.then(function(snapshot) {
                return snapshot.ref.getDownloadURL();
            });
            uploadPromises.push(uploadPromise);
        }
    
        let downloadURLs = await Promise.all(uploadPromises);
        arrayUrlImg = downloadURLs;
    
        let data = {
            id: dataToSend.id,
            images: arrayUrlImg
        };
    
        await sendToJSONServer(data);
    } catch (error) {
        console.error('Lỗi khi tải lên và gửi dữ liệu:', error);
    }
}
async function sendToJSONServer(data) {
    try {
        await fetch('http://localhost:3000/imageProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Lỗi khi gửi dữ liệu lên JSON server:', error);
    }
}
function deleteProduct() {
    const buttons = document.querySelectorAll('#deleteProduct');
     buttons.forEach(button => {
        button.onclick = (event) => {
            event.preventDefault();
            const id = button.parentElement.parentElement.querySelector('.id').textContent;
            const avatarProduct = button.parentElement.parentElement.querySelector('.boxAvatar #avatarProduct').src;
            // xóa ảnh chi tiết
            fectchImgDetailProduct(function(data) {
                const listImageDelete = data.filter(item => {
                    return item.id === id;
                });
                listImageDelete[0].images.forEach(urlImage => {
                    deleteImageFireBase(urlImage);
                    deleteImageFireBase(avatarProduct);
                });
            });
            fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE'
            });
            fetch(`http://localhost:3000/imageProducts/${id}`, {
                method: 'DELETE'
            });
        }
    });
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