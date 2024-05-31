const bannerMenuItems = document.querySelectorAll(".menu-content");
const highlightIcon = document.querySelector(".line-pointer");
bannerMenuItems.forEach((item) => {
  item.addEventListener("click", function () {
    let left = this.offsetLeft + 10;
    highlightIcon.style.left = `${left}px`;
  });
});
function choseSizeProduct() {
  // hiện popup chọn size
  document.querySelector(".open_popupSize").onclick = () => {
    document.querySelector(".box_img-size").classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
  };
  // ẩn popup chọn size
  document.querySelector(".close").onclick = () => {
    document.querySelector(".box_img-size").classList.remove("show");
    document.querySelector("body").style.overflow = "";
  };
}
function slect_item() {
  const content = document.querySelectorAll(".content ");
  for (let index = 0; index < bannerMenuItems.length; index++) {
    bannerMenuItems[index].onclick = () => {
      content[index].classList.add("flex");
      for (let i = 0; i < content.length; i++) {
        if (content[i] != content[index]) {
          content[i].classList.remove("flex");
        }
      }
    };
  }
}
slect_item();
function selectPicture() {
  const image_shows = document.querySelectorAll(".img__product");
  const imgSmalls = document.querySelectorAll(".img_small");
  imgSmalls.forEach((img) => {
    img.onclick = (e) => {
      image_shows.forEach((image_show) => {
        image_show.src = e.target.src;
      });
    };
  });
}
selectPicture();
document.querySelector(".zoom-img").onclick = () => {
  document.querySelector(".popup_imgLarge").classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
};
document.querySelector(".close-popupImgLarge").onclick = () => {
  document.querySelector(".popup_imgLarge").classList.remove("show");
  document.querySelector("body").style.overflow = "";
};
// tăng girm số lượng sản phẩm
function quanityProduct() {
  const btnSubtraction = document.querySelector(".subtraction");
  const btnPlus = document.querySelector(".plus");
  let valueQuantity = document.querySelector(".input_quantityProduct").value;
  let newQuantity = 0;
  btnPlus.onclick = () => {
    if (valueQuantity > 0 && valueQuantity < 10) {
      newQuantity = parseInt(valueQuantity) + 1;
      valueQuantity = newQuantity;
    }
    document.querySelector(".input_quantityProduct").value = valueQuantity;
  };
  btnSubtraction.onclick = () => {
    if (valueQuantity > 1) {
      newQuantity = parseInt(valueQuantity) - 1;
      valueQuantity = newQuantity;
    }
    document.querySelector(".input_quantityProduct").value = valueQuantity;
  };
}
quanityProduct();
