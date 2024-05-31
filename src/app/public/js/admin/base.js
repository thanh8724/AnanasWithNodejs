function showHiddenPopup() {
  const body = document.querySelector("body");
  const popupAddItem = document.querySelector(".popup-addItem");
  const buttonAddNewItem = document.querySelector(".addNewItem");
  const closePopupAddItem = document.querySelectorAll(".closePopupAddItem");
  if (buttonAddNewItem) {
    buttonAddNewItem.onclick = () => {
      popupAddItem.classList.add("popupAddItem-active");
      body.style.overflow = "hidden";
    };
    closePopupAddItem.forEach((button) => {
      button.onclick = () => {
        popupAddItem.classList.remove("popupAddItem-active");
        body.style.overflow = "";
      };
    });
    document.querySelector(".popup-addItem__content").onclick = (event) => {
      event.stopPropagation();
    };
  }
}
function showHiddenFormUpdate() {
  const buttonShowForm = document.querySelectorAll(".create");
  const formUpdate = document.querySelector(".container__content2");
  const container__content = document.querySelector(
    ".container__content--main"
  );
  if (buttonShowForm) {
    buttonShowForm.forEach((button) => {
      button.onclick = (e) => {
        container__content.classList.add("transform100");
        formUpdate.classList.add("transform0");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
    });
    document.querySelector(".exitUpdate").onclick = () => {
      formUpdate.classList.remove("transform0");
      container__content.classList.remove("transform100");
    };
  }
}

function hiddenUpdate() {
  const formUpdate = document.querySelector(".container__content2");
  const container__content = document.querySelector(
    ".container__content--main"
  );
  formUpdate.classList.remove("transform0");
  container__content.classList.remove("transform100");
}
hiddenUpdate();
showHiddenFormUpdate();
showHiddenPopup();
