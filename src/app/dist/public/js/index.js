async function fetchCategories() {
    const apiUrl = 'http://localhost:3000/categories';
    try {
        await fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
            renderMenu(data);
            return data;
        });
    }
    catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
}
async function fetchProducts() {
    const apiUrl = 'http://localhost:3000/products';
    try {
        await fetch(apiUrl)
            .then((response) => response.json())
            .then(data => {
            showBestSaleProducts(data);
            ShowProductsOfInterest(data);
            // slider_banner();
            return data;
        })
            .then((data) => {
            linkShop();
            shopShowProducts(data, localStorage.getItem('idCategory'));
            return data;
        })
            .then((data) => {
            linkProductDetail();
            showProductDetail(data, JSON.parse(localStorage.getItem('idProduct')));
            fetchImagesSmall();
            return data;
        })
            .then((data) => {
            likeProduct();
            addToCart();
            if (document.querySelector('.thisIsProductPage')) {
                addToCart2(data, JSON.parse(localStorage.getItem('idProduct')));
            }
            return data;
        });
    }
    catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
}
async function fetchImagesSmall() {
    const apiUrl = 'http://localhost:3000/imageProducts';
    try {
        await fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
            // console.log(data);
            showImagesSmallOfProduct(data, JSON.parse(localStorage.getItem('idProduct')));
            return data;
        });
    }
    catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
}
fetchCategories();
fetchProducts();
function renderMenu(categorys) {
    let categoryHtml = ``;
    categorys.map((category) => {
        categoryHtml += `<li>
                            <a href="shop.html" class="drop__menu--styel1-item linkShop">
                                <span class="idCategory" style="display: none;">${category.id}</span>
                                <div class="item__box--img">
                                    <img src="${category.imageCategory}" alt="" class="img-itemMenu">
                                </div>
                                <span class="style1-item--title">${category.nameCategory}</span>
                            </a>
                        </li>`;
    });
    document.querySelector('.drop__menu--style1').innerHTML = categoryHtml;
}
function linkShop() {
    const linksShop = document.querySelectorAll('.linkShop');
    let idCategory = 0;
    linksShop.forEach(link => {
        link.onclick = () => {
            idCategory = link.querySelector('.idCategory').innerText;
            localStorage.setItem('idCategory', idCategory);
        };
    });
}
function shopShowProducts(listProducts, idCategories) {
    const listProductsOfCategory = listProducts.filter((data) => {
        return data.categoriesProduct == idCategories;
    });
    renderShop(listProductsOfCategory);
}
function renderShop(listProductsOfCategory) {
    let listProductsHtml = ``;
    listProductsOfCategory.map((product) => {
        listProductsHtml += `<a href="product.html" class="product__link">
                                <div class="container__product--item">
                                    <div class="product__item--boxImg">
                                        <span class="idCategory" style="display: none">${product.categoriesProduct}</span>
                                        <span class="idProduct" style="display: none">${product.id}</span>
                                        <img loading="lazy" class="imgProduct" src="${product.imageProduct}" alt="">
                                        <div class="product__item--boxAction">
                                            <ion-icon class="icon-share" name="share-social-outline"></ion-icon>
                                            <ion-icon onclick="like(this)" class="icon-heart" name="heart"></ion-icon>
                                            <ion-icon class="icon-addcart" name="bag-add-outline"></ion-icon>
                                        </div>
                                    </div>
                                    <div class="product__item--content">
                                        <span class="name__product">${product.nameProduct}</span>
                                        <span class="price__product">${formatMoney(product.priceProduct)} VNĐ</span>
                                        <div class="product__content--bottom">
                                            <span class="views__product">${product.viewProduct}+ views</span>
                                            <span class="evaluate">
                                                <span>${product.quantitySold} đã bán</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>`;
    });
    if (document.querySelector('.showContentShop')) {
        document.querySelector('.showContentShop').innerHTML = listProductsHtml;
    }
}
function showBanner(images) {
    let imageBanner = ``;
    images.forEach(image => {
        imageBanner += `<div class="main__banner--boxImg">
                            <img loading="lazy" src="${image}" alt="">
                        </div>`;
    });
    if (document.querySelector('.main__banner')) {
        document.querySelector('.main__banner').innerHTML = imageBanner;
    }
}
function showBestSaleProducts(listItems) {
    const bestSale = document.querySelector('.show__bestSale');
    if (bestSale) {
        let listProducts = ``;
        const listProductsBestSale = listItems.filter((item) => {
            return item.quantitySold >= 400;
        });
        listProductsBestSale.map((item) => {
            listProducts += `<div class="product__item">
                        <a href="product.html" class="product__link">
                            <div class="container__product--item">
                                <div class="product__item--boxImg">
                                    <span class="idCategory" style="display: none">${item.categoriesProduct}</span>
                                    <span class="idProduct" style="display: none">${item.id}</span>
                                    <img loading="lazy" class="imgProduct" src="${item.imageProduct}" alt="">
                                    <div class="product__item--boxAction">
                                        <ion-icon class="icon-share" name="share-social-outline"></ion-icon>
                                        <ion-icon onclick="like(this)" class="icon-heart" name="heart"></ion-icon>
                                        <ion-icon class="icon-addcart" name="bag-add-outline"></ion-icon>
                                    </div>
                                </div>
                                <div class="product__item--content">
                                    <span class="name__product">${item.nameProduct}</span>
                                    <span class="price__product">${formatMoney(item.priceProduct)} VNĐ</span>
                                    <div class="product__content--bottom">
                                        <span class="views__product">${item.viewProduct}+ views</span>
                                        <span class="evaluate">
                                            <span>${item.quantitySold} đã bán</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>`;
        });
        bestSale.innerHTML = listProducts;
    }
}
function ShowProductsOfInterest(listItems) {
    const productsOfInterest = document.querySelector('.show__showProductsOfInterest');
    if (productsOfInterest) {
        let listProductsHtml = ``;
        const listProducts = listItems.filter((item) => {
            return item.viewProduct >= 700;
        });
        listProducts.map((item) => {
            listProductsHtml += `<div class="product__item">
                        <a href="product.html" class="product__link">
                            <div class="container__product--item">
                                <div class="product__item--boxImg">
                                    <span class="idCategory" style="display: none">${item.categoriesProduct}</span>
                                    <span class="idProduct" style="display: none">${item.id}</span>
                                    <img loading="lazy" class="imgProduct" src="${item.imageProduct}" alt="">
                                    <div class="product__item--boxAction">
                                        <ion-icon class="icon-share" name="share-social-outline"></ion-icon>
                                        <ion-icon onclick="like(this)" class="icon-heart" name="heart"></ion-icon>
                                        <ion-icon class="icon-addcart" name="bag-add-outline"></ion-icon>
                                    </div>
                                </div>
                                <div class="product__item--content">
                                    <span class="name__product">${item.nameProduct}</span>
                                    <span class="price__product">${formatMoney(item.priceProduct)} VNĐ</span>
                                    <div class="product__content--bottom">
                                        <span class="views__product">${item.viewProduct}+ views</span>
                                        <span class="evaluate">
                                            <span>${item.quantitySold} đã bán</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>`;
        });
        productsOfInterest.innerHTML = listProductsHtml;
        slider__products();
    }
}
function linkProductDetail() {
    const linkProductsDetail = document.querySelectorAll('.product__link');
    let idProduct = 0;
    linkProductsDetail.forEach(linkProductDetail => {
        linkProductDetail.onclick = (e) => {
            idProduct = linkProductDetail.querySelector('.idProduct').innerText;
            localStorage.setItem('idProduct', idProduct);
        };
    });
}
function showProductDetail(data, idProduct) {
    const infoProduct = data.filter((product) => {
        return product.id == idProduct;
    });
    if (document.querySelector('.thisIsProductPage')) {
        document.querySelector('.idProduct').textContent = infoProduct[0].id;
        document.querySelector('.box__img--big .img__product').src = infoProduct[0].imageProduct;
        document.querySelector('.info--product---name').textContent = infoProduct[0].nameProduct;
        document.querySelector('.price__product-box-price').textContent = `${formatMoney(infoProduct[0].priceProduct)} VNĐ`;
        document.querySelector('.descriptionProduct').innerHTML = ` <span style="text-align: center;">${infoProduct[0].descriptionProduct}</span>
                                                                    <span class="open_popupSize">Hướng dẫn chọn size</span>
                                                                    `;
        // end show product information
        // thay đổi bảng size giày và áo
        if (infoProduct[0].categoriesProduct == 1) {
            document.querySelector('.option-sizeTee').style.display = 'none';
            document.querySelector('.option-sizeShoe').style.display = 'block';
        }
        else {
            document.querySelector('.option-sizeTee').style.display = 'block';
            document.querySelector('.option-sizeShoe').style.display = 'none';
        }
    }
    ;
    showProductRelease(data, infoProduct[0].categoriesProduct, infoProduct[0].id);
    linkProductDetail();
    // choseSizeProduct();
}
function showImagesSmallOfProduct(data, idProduct) {
    const listSmallImages = data.filter((imageProduct) => {
        return imageProduct.id == idProduct;
    });
    // console.log(listSmallImages[0].images);
    renderImagesSmall(listSmallImages[0].images);
}
function renderImagesSmall(listSrcImages) {
    let imageSmallList = ``;
    let imageSmallList2 = ``; // thằng này giành cho khi bấm phóng bự
    listSrcImages.forEach(src => {
        imageSmallList += `<div class="box__img--small">
                                <img class="img_small" src="${src}" alt="">
                            </div>`;
        imageSmallList2 += ` <div class="box__img--small" style="width: 100px; height: 100px;">
                                <img class="img_small" src="${src}" alt="">
                            </div>`;
    });
    if (document.querySelector('.container__img--product-small')) {
        document.querySelector('.container__img--product-small').innerHTML = imageSmallList; // -> shpw bên ngoài
        document.querySelector('.container__img--product-small2').innerHTML = imageSmallList2; // -> show khi phóng to
        document.querySelector('.popup_imgLarge--show img').src = listSrcImages[0];
        selectPicture();
    }
}
function showProductRelease(listProduct, idCategories, idProduct) {
    let listProductHtml = ``;
    const listProductsRelease = listProduct.filter((product) => {
        return product.idProduct != idProduct && product.categoriesProduct == idCategories;
    });
    listProductsRelease.map((product) => {
        listProductHtml += `<div class="product__item">
                                <a href="product.html" class="product__link">
                                    <div class="container__product--item">
                                        <div class="product__item--boxImg">
                                            <span class="idCategory" style="display: none">${product.categoriesProduct}</span>
                                            <span class="idProduct" style="display: none">${product.id}</span>
                                            <img loading="lazy" class="imgProduct" src="${product.imageProduct}" alt="">
                                            <div class="product__item--boxAction">
                                                <ion-icon class="icon-share" name="share-social-outline"></ion-icon>
                                                <ion-icon onclick="like(this)" class="icon-heart" name="heart"></ion-icon>
                                                <ion-icon class="icon-addcart" name="bag-add-outline"></ion-icon>
                                            </div>
                                        </div>
                                        <div class="product__item--content">
                                            <span class="name__product">${product.nameProduct}</span>
                                            <span class="price__product">${formatMoney(product.priceProduct)}</span>
                                            <div class="product__content--bottom">
                                                <span class="views__product">${product.viewProduct}+ views</span>
                                                <span class="evaluate">
                                                    <span>${product.quantitySold} đã bán</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>`;
    });
    if (document.querySelector('.showProductsRelease')) {
        document.querySelector('.showProductsRelease').innerHTML = listProductHtml;
        slider__products();
    }
}
function likeProduct() {
    const likeButtons = document.querySelectorAll('.icon-heart');
    likeButtons.forEach(button => {
        button.onclick = (e) => {
            e.preventDefault();
            e.target.classList.toggle('likeProducts');
        };
    });
}
export {};
//# sourceMappingURL=index.js.map