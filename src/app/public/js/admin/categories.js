function start() {
  const firebaseConfig = {
    apiKey: "AIzaSyBh5uox4NQaKOIGgmmeeaJzQBimDjHmjT8",
    authDomain: "probable-summer-406516.firebaseapp.com",
    projectId: "probable-summer-406516",
    storageBucket: "probable-summer-406516.appspot.com",
    messagingSenderId: "781752648085",
    appId: "1:781752648085:web:49f47c9c3502b785ddf69c",
    measurementId: "G-TG3NMR4DWP",
  };
  firebase.initializeApp(firebaseConfig);
  fetchCategory(renderCategory);
  fetchCategory(createDataCategory);
  updateCategory();
  deleteImageCategory();
}
start();
function updateData(data, url) {
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
function createCategory(dataToSend) {
  // nhận dữ liệu từ createDataAccount sau đó đưa dữ liệu lên json sever
  const url = "http://localhost:3000/categories";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
}
async function fetchCategory(callback) {
  const addressApi = `http://localhost:3000/categories`;
  fetch(addressApi)
    .then((response) => {
      return response.json();
    })
    .then(callback);
}
async function fetchProducts(callback) {
  const addressApi = `http://localhost:3000/products`;
  fetch(addressApi)
    .then((response) => {
      return response.json();
    })
    .then(callback);
}
function renderCategory(categories) {
  createPagination(categories, 4);
  const buttonPagination = document.querySelectorAll(".pagination-item");
  fetchProducts(function (listProducts) {
    let listquantity = [];
    categories.forEach((element) => {
      const product = listProducts.filter((a) => {
        return a.categoriesProduct == element.id;
      });
      listquantity.push(product.length);
    });
    buttonPagination.forEach((item, index) => {
      item.onclick = () => {
        displayItems(categories, index, listquantity);
      };
    });
    displayItems(categories, 1, listquantity);
  });
}
function displayItems(data, index, listquantity) {
  let startIndex = (index - 1) * 4;
  let endIndex = startIndex + 4;
  let itemHtml = ``;
  for (let index = startIndex; index < endIndex; index++) {
    if (index < data.length) {
      itemHtml += `<tr>
                            <td>#<span class="id">${data[index].id}</span></td>
                            <td class="tdInfomation">
                                <div class="boxAvatar">
                                    <img src="${data[index].imageCategory}" alt="">
                                </div>
                                <div class="nameUser">
                                    <span class="nameUser-title">Quantity Items</span>
                                    <span class="nameUser-name" style="display: flex; justify-content: flex-start;">${listquantity[index]} Items</span>
                                </div>
                            </td>
                            <td style="font-size: 18px; font-weight: 700;">${data[index].nameCategory}</td>
                            <!-- <td class="pending">New Account</td> -->
                            <td class="td-action">
                                <ion-icon class="create" name="create-outline"></ion-icon>
                                |
                                <ion-icon class="deleteAccount deleteCategory" name="close-outline"></ion-icon>
                            </td>
                        </tr>`;
    } else {
      endIndex = data.length;
      break;
    }
  }
  if (index >= 2) {
    document.querySelector(".back-page").onclick = () => {
      displayItems(data, index - 1, listquantity);
    };
  } else {
    if (document.querySelector(".back-page")) {
      document.querySelector(".back-page").onclick = () => {
        displayItems(data, Math.ceil(data.length / 4), listquantity);
      };
    }
  }
  if (index < Math.ceil(data.length / 4)) {
    if (document.querySelector(".next-page")) {
      document.querySelector(".next-page").onclick = () => {
        displayItems(data, index + 1, listquantity);
      };
    }
  } else if (index == Math.ceil(data.length / 4)) {
    if (document.querySelector(".next-page")) {
      document.querySelector(".next-page").onclick = () => {
        displayItems(data, 1, listquantity);
      };
    }
  }
  document.querySelector(".content__orders--bottom tbody").innerHTML = itemHtml;
  document.querySelector(".pagination-title").textContent = `Showing ${
    startIndex + 1
  } - ${endIndex} of ${data.length}`;
  document
    .querySelectorAll(".pagination-item .pagination-item__link")
    .forEach((element) => {
      element.classList.remove("pagination-item__link-active");
    });
  if (document.querySelector(".pagination-item .pagination-item__link")) {
    document
      .querySelectorAll(".pagination-item .pagination-item__link")
      [index].classList.add("pagination-item__link-active");
  }
  itemHtml = "";
  deleteCategory();
  showHiddenFormUpdate(renderFormUpdate);
}
function createDataCategory(listCategories) {
  const buttonSubmit = document.querySelector(".button__addItem");
  let idCategory = 0;
  if (listCategories != undefined || listCategories.length > 0) {
    idCategory = Number(listCategories[listCategories.length - 1].id) + 1;
  }
  buttonSubmit.onclick = (e) => {
    e.preventDefault();
    const form = buttonSubmit.parentElement.parentElement;
    let imageCategory = form.querySelector(
      ".addItem__content--main .input_file"
    );
    let nameCategory = form.querySelector("#nameCategory");
    if (nameCategory.value == "") {
      nameCategory.classList.add("errorInput");
      nameCategory.focus();
      document.querySelector(".form__message").textContent =
        "Vui lòng điền thông tin!";
      nameCategory.oninput = () => {
        nameCategory.classList.remove("errorInput");
        document.querySelector(".form__message").textContent = "";
      };
    } else {
      data = {
        id: `${idCategory}`,
        nameCategory: nameCategory.value,
        descriptionCategory: "",
      };
      postImageToFireBase(imageCategory, data, "post");
    }
  };
}
function updateCategory() {
  document.querySelector("#btn__updateCategory").onclick = (event) => {
    event.preventDefault();
    const inputFile = document.querySelector("#inputUpdateImgCate");
    let img = document.querySelector("#imageShowUpdateCate");
    let nameCategory = document.querySelector("#inputNameCateUpdate").value;
    let descriptionCategory = document.querySelector(
      "#inputDescCateUpdate"
    ).value;
    if (nameCategory == "") {
      nameCategory = document.querySelector("#nameCategory").textContent;
    }
    if (descriptionCategory == "") {
      descriptionCategory = document.querySelector("#descCategory").textContent;
    }
    console.log(!img.src.includes(inputFile.value));
    console.log(inputFile.value.length);
    if (
      !img.src.includes(inputFile.value) == true &&
      img.src !=
        `https://i.pinimg.com/564x/c7/89/24/c78924c5ea7cd7ae22d35b6cb38bfe47.jpg`
    ) {
      // kiểm tra nếu đường dẫn ảnh có thay đổi thì xóa ảnh cũ trên firebase
      deleteImageFireBase(img.src);
    }
    data = {
      nameCategory: nameCategory,
      descriptionCategory: descriptionCategory,
    };
    postImageToFireBase(inputFile, data, "update");
  };
}
function deleteImageCategory() {
  document.querySelector(".button__del--avatar").onclick = (e) => {
    e.preventDefault();
    const imgURL = document.querySelector("#imageShowUpdateCate").src;
    if (
      imgURL !=
      "https://i.pinimg.com/564x/c7/89/24/c78924c5ea7cd7ae22d35b6cb38bfe47.jpg"
    ) {
      deleteImageFireBase(imgURL);
      updateData(
        {
          imageCategory:
            "https://i.pinimg.com/564x/c7/89/24/c78924c5ea7cd7ae22d35b6cb38bfe47.jpg",
        },
        `http://localhost:3000/categories/${
          document.querySelector("#idCategory").textContent
        }`
      );
    }
  };
}
function renderFormUpdate() {
  const idCategory = document.querySelector(
    ".content__orders--bottom #idCategory"
  ).textContent;
  const addressApi = `http://localhost:3000/categories`;
  fetch(addressApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const category = data.filter((itemData) => {
        return itemData.id == idCategory;
      });
      document.querySelector("#inputNameCateUpdate").value =
        category[0].nameCategory;
      document.querySelector("#nameCategory").textContent =
        category[0].nameCategory;
      document.querySelector("#inputDescCateUpdate").textContent =
        category[0].descriptionCategory;
      document.querySelector("#descCategory").textContent =
        category[0].descriptionCategory;
      document.querySelector("#imageShowUpdateCate").src =
        category[0].imageCategory;
    });
}
function deleteCategory() {
  const buttonDelete = document.querySelectorAll(".deleteCategory");
  buttonDelete.forEach((button) => {
    button.onclick = (event) => {
      const container = event.target.parentElement.parentElement;
      const id = container.querySelector(".id").textContent;
      const image = container.querySelector("img").src;
      if (
        !image.includes(
          "https://i.pinimg.com/564x/c7/89/24/c78924c5ea7cd7ae22d35b6cb38bfe47.jpg"
        )
      ) {
        deleteImageFireBase(image);
      }
      fetch(`http://localhost:3000/categories/${id}`, {
        method: "DELETE",
      });
    };
  });
}
function postImageToFireBase(fileInput, dataToSend, options) {
  let storageRef = firebase.storage().ref();
  let file = fileInput.files[0];
  loadingTiktok();
  if (fileInput.value.length != 0 && options == "post") {
    let imagePostRef = storageRef.child("avatarCategory/" + file.name);
    imagePostRef.put(file).then(function (snapshot) {
      snapshot.ref.getDownloadURL().then(function (downloadURL) {
        data = {
          id: dataToSend.id,
          nameCategory: data.nameCategory,
          imageCategory: downloadURL,
          descriptionCategory: dataToSend.descriptionCategory,
        };
        createCategory(data);
      });
    });
  } else if (fileInput.value.length == 0 && options == "post") {
    data = {
      id: dataToSend.id,
      nameCategory: data.nameCategory,
      imageCategory:
        "https://i.pinimg.com/564x/c7/89/24/c78924c5ea7cd7ae22d35b6cb38bfe47.jpg",
      descriptionCategory: dataToSend.descriptionCategory,
    };
    createCategory(data);
  } else if (fileInput.value.length != 0 && options == "update") {
    loadingTiktok();
    let imagePostRef = storageRef.child("avatarCategory/" + file.name);
    imagePostRef.put(file).then(function (snapshot) {
      snapshot.ref.getDownloadURL().then(function (downloadURL) {
        data = {
          nameCategory: data.nameCategory,
          imageCategory: downloadURL,
          descriptionCategory: dataToSend.descriptionCategory,
        };
        updateData(
          data,
          `http://localhost:3000/categories/${
            document.querySelector("#idCategory").textContent
          }`
        );
      });
    });
  } else if (fileInput.value.length == 0 && options == "update") {
    updateData(
      data,
      `http://localhost:3000/categories/${
        document.querySelector("#idCategory").textContent
      }`
    );
  }
}
function deleteImageFireBase(imageURL) {
  loadingTiktok();
  let imageRef = firebase.storage().refFromURL(imageURL);
  imageRef.delete();
}
function loading() {
  document.querySelector(
    ".popup-addItem"
  ).innerHTML = `<div class="terminal-loader">
                                                                <div class="terminal-header">
                                                                <div class="terminal-title">Status</div>
                                                                <div class="terminal-controls">
                                                                    <div class="control close"></div>
                                                                    <div class="control minimize"></div>
                                                                    <div class="control maximize"></div>
                                                                </div>
                                                                </div>
                                                                <div class="text">Loading...</div>
                                                                <span class="des">Đang xử lí dữ liệu... Vui lòng đợi giây lát!</span>
                                                            </div>
                                                            `;
}
function loadingTiktok() {
  document.querySelector("#loadingTiktok").classList.add("opacity1");
}
function hiddenPopupUpdate() {
  const formUpdate = document.querySelector(".container__content2");
  const container__content = document.querySelector(
    ".container__content--main"
  );
  formUpdate.classList.add("transform0");
  container__content.classList.add("transform100");
}
