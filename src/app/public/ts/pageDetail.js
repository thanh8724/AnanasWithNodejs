console.log(">>> Change content chose size active");
const handleChoseSizeProduct = () => {
    const typeProduct = (document.querySelector(".main__product--info"));
    const sizeOfTee = document.querySelector(".option-sizeTee");
    const sizeOfShoe = document.querySelector(".option-sizeShoe");
    if (typeProduct !== null && sizeOfTee !== null && sizeOfShoe !== null) {
        console.log(">>> Type Product: ", typeProduct.getAttribute("data-idCate"));
        if (typeProduct.getAttribute("data-idCate") == "1") {
            sizeOfShoe.classList.add("displayBlock");
            sizeOfTee.classList.add('displayNone');
        }
        else {
            sizeOfShoe.classList.add('displayNone');
            sizeOfTee.classList.add("displayBlock");
        }
    }
};
handleChoseSizeProduct();
export {};
//# sourceMappingURL=pageDetail.js.map