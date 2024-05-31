// add cart
var arrayProduct = [];
if (
  JSON.parse(localStorage.getItem("mycart")) &&
  JSON.parse(localStorage.getItem("mycart")).length != 0
) {
  arrayProduct = JSON.parse(localStorage.getItem("mycart")); // -> kiểm tra nếu local có tồn tại thì và có value thì arrayProdut = local
} else {
  arrayProduct = [];
}
var total = 0;
let htmlProduct = ``;
function addToCart() {
  const addcart = document.querySelectorAll(".icon-addcart");
  addcart.forEach((element) => {
    element.onclick = (e) => {
      e.preventDefault();
      const containerProduct =
        e.target.parentElement.parentElement.parentElement;
      const idCategory =
        containerProduct.querySelector(".idCategory").innerText;
      const idProduct = containerProduct.querySelector(".idProduct").innerText;
      const imgProduct = containerProduct.querySelector(".imgProduct").src;
      const nameProduct =
        containerProduct.querySelector(".name__product").textContent;
      let quantityProduct = 1;
      const priceProduct =
        containerProduct.querySelector(".price__product").innerText;
      // console.log(imgProduct, nameProduct, priceProduct);

      if (idCategory == 1) {
        // -> check => add size product
        var sizeProduct = 35;
      } else {
        sizeProduct = "S";
      }
      // check existing products
      let indexExistingProduct = arrayProduct.reduce(
        (acc, product, indexProduct) => {
          if (product.id == idProduct && product.sizeProduct == sizeProduct) {
            acc.push(indexProduct);
          }
          return acc;
        },
        []
      );
      if (indexExistingProduct.length == 0) {
        arrayProduct.push({
          id: idProduct,
          image: imgProduct,
          name: nameProduct,
          quantity: quantityProduct,
          price: priceProduct,
          sizeProduct: sizeProduct,
        });
      } else {
        indexExistingProduct.forEach((index) => {
          let newQuantity =
            parseInt(arrayProduct[index].quantity) + parseInt(quantityProduct);
          arrayProduct[index].quantity = newQuantity;
        });
      }
      localStorage.setItem("mycart", JSON.stringify(arrayProduct));
      // console.log(JSON.parse(localStorage.getItem('mycart')));
      changeTypePopupCart(); // thay đổi trạng thái của popup khi có sản phẩm
      showProductPopup(); // hiển thị popup  cart
    };
  });
}

function showProductPopup() {
  showPopupCart(); // -> show popup cart
  renderProductCart(); // -> call renderProductCart when this is called
}

function renderProductCart() {
  // renders the product
  let totalTemporary = 0;
  changeTypePopupCart();
  if (JSON.parse(localStorage.getItem("mycart"))) {
    document.querySelector(".quantityCart").textContent = JSON.parse(
      localStorage.getItem("mycart")
    ).length; // -> số lượng product trên header
    var dataCart = JSON.parse(localStorage.getItem("mycart"));
    const containerPopupCart = document.querySelector(
      ".container__showProducts"
    );
    dataCart.forEach((product) => {
      htmlProduct += `<div class="container__showProducts--item">
                                                <div class="box__image--item">
                                                    <img src="${
                                                      product.image
                                                    }" alt="">
                                                </div>
                                                <span class="name__item--popup">
                                                ${product.name}
                                                </span>
                                                <input class="number__item--popup" value="${
                                                  product.quantity
                                                }" type="number" name="" id="">
                                                <span class="price__product--popup">
                                                    ${formatMoney(
                                                      strToNumber(
                                                        product.price
                                                      ) *
                                                        parseInt(
                                                          product.quantity
                                                        )
                                                    )} VNĐ
                                                </span>
                                                <ion-icon class="delete__product-popup" name="close-outline"></ion-icon>
                                            </div>`;
      // tổng tiền
      totalTemporary += parseInt(product.quantity) * strToNumber(product.price);
    });
    total = formatMoney(totalTemporary);
    document.querySelector(
      ".box__totalPopup-cart"
    ).innerHTML = `<span class="total-popup-title">TỔNG TIỀN: </span>
                                                                <span class="total-popup">${total} VNĐ</span>`;
    containerPopupCart.innerHTML = htmlProduct;
    htmlProduct = ``;
  }
  // xoa san pham
  function deleteProduct() {
    const deleteProduct = document.querySelectorAll(".delete__product-popup");
    deleteProduct.forEach((product, indexProduct) => {
      product.onclick = () => {
        total = total - arrayProduct[indexProduct].price;
        arrayProduct.splice(indexProduct, 1);
        localStorage.setItem("mycart", JSON.stringify(arrayProduct));
        renderProductCart();
        // renderCart();
      };
    });
  }
  deleteProduct();
  if (arrayProduct.length == 0) {
    changeTypePopupCart();
    hiddenPopupCart();
  }
}

function showPopupCart() {
  document.querySelector(".popup-cart").classList.add("opacity1");
  document
    .querySelector(".popup__cart--container")
    .classList.add("popup__cart--container-active");
  document.querySelector("body").classList.add("overflowHidden");
}

function hiddenPopupCart() {
  document
    .querySelector(".popup__cart--container")
    .classList.remove("popup__cart--container-active");
  document.querySelector(".popup-cart").classList.remove("opacity1");
  document.querySelector("body").classList.remove("overflowHidden");
}
function changeTypePopupCart() {
  const cartHaveItems = document.querySelector(".popup__cart--container");
  const cartEmpty = document.querySelector(".popupCart-empty");
  const labelQuantity = document.querySelector(".quantityCart");
  if (
    !JSON.parse(localStorage.getItem("mycart")) ||
    JSON.parse(localStorage.getItem("mycart")).length == 0
  ) {
    cartHaveItems.classList.add("displayNone");
    cartEmpty.classList.add("transX0");
    cartEmpty.classList.remove("displayNone");
    labelQuantity.classList.remove("opacity1");
  } else {
    cartHaveItems.classList.remove("displayNone"); // ->hiển thị box show sản phẩm
    cartEmpty.classList.add("displayNone"); // -> ẩn box không có sản phẩm
    cartEmpty.classList.remove("transX0"); // -> ẩn box không có sản phẩm
    labelQuantity.classList.add("opacity1"); // -> hiển thị label số lượng trên header
  }
}
function addToCart2(data, idProduct) {
  const buttonAddToCart = document.querySelector(".button-add_toCart");
  const idPr = idProduct;
  const product = data.filter((product) => {
    return product.id == idProduct;
  });
  if (product[0].categoriesProduct == 1) {
    var sizeProduct = 35;
  } else {
    sizeProduct = "S";
  }
  // chọn size
  const selectSizes = document.querySelectorAll("#size");
  if (selectSizes) {
    selectSizes.forEach((selectSize) => {
      selectSize.onchange = function () {
        sizeProduct = this.value;
      };
    });
  }
  if (buttonAddToCart) {
    buttonAddToCart.onclick = () => {
      const infoProduct = data.filter((product) => {
        return product.id == idPr;
      });
      let idProduct = infoProduct[0].id;
      let imgProduct = infoProduct[0].imageProduct;
      let nameProduct = infoProduct[0].nameProduct;
      let quantityProduct = document.querySelector(
        ".input_quantityProduct"
      ).value;
      let priceProduct = infoProduct[0].priceProduct;
      // console.log(imgProduct, nameProduct, priceProduct);
      let indexExistingProduct = arrayProduct.reduce((acc, value, index) => {
        if (value.id == idProduct && value.sizeProduct == sizeProduct) {
          acc.push(index);
        }
        return acc;
      }, []);
      if (indexExistingProduct.length == 0) {
        arrayProduct.push({
          id: idProduct,
          image: imgProduct,
          name: nameProduct,
          quantity: quantityProduct,
          price: priceProduct,
          sizeProduct: sizeProduct,
        });
      } else {
        indexExistingProduct.forEach((index) => {
          let newQuantity =
            parseInt(arrayProduct[index].quantity) + parseInt(quantityProduct);
          arrayProduct[index].quantity = newQuantity;
        });
      }
      localStorage.setItem("mycart", JSON.stringify(arrayProduct));
      changeTypePopupCart(); // thay đổi trạng thái của popup khi có sản phẩm
      showProductPopup(); // hiển thị popup  cart

      if (
        JSON.parse(localStorage.getItem("mycart")) &&
        JSON.parse(localStorage.getItem("mycart")).length != 0
      ) {
        arrayProduct = JSON.parse(localStorage.getItem("mycart")); // -> kiểm tra nếu local có tồn tại thì và có value thì arrayProdut = local
      }
    };
  }
}
function strToNumber(formattedString) {
  return parseFloat(formattedString.replace(/\./g, ""));
}
function formatMoney(numberFormat) {
  return new Intl.NumberFormat("vi-VN", {
    style: "decimal", //-> hiển thị đơn vị tiền tệ
    //   style: 'currency' // không hiển thị đơn vị tiền tệ
    //   currency: 'VND'
  }).format(numberFormat);
}
