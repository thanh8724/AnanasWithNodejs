import express from "express";
const app = express();
// config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
// import data from services
import { createDataHomePageJsonFile } from "../services/getDataHomePage.js";
import { createDataProductsPageJsonFile } from "../services/getDataProductPage.js";
import { createDataDetailPage } from "../services/getDataDetailPage.js";
import createDataAccountsJsonFile from '../services/getAccounts.js';
// render pages
export const getHomePage = async (req, res) => {
    const dataHomePage = await createDataHomePageJsonFile();
    return res.render("home", {
        body: "./layouts/mainHome",
        categories: dataHomePage?.categories,
        productBestSale: dataHomePage?.bestSaler,
        interest: dataHomePage?.productInterest
    });
};
export const getShopPage = async (req, res) => {
    const dataProductsPages = await createDataProductsPageJsonFile();
    const idCategory = req.params.id;
    const listProductPerIdCate = dataProductsPages.products.filter((item) => item.categoriesProduct == idCategory);
    res.render("home", {
        body: "./layouts/mainShop",
        categories: dataProductsPages.categories,
        listProducts: listProductPerIdCate
    });
};
export const getProductDetailPage = async (req, res) => {
    const dataProductsPages = await createDataDetailPage();
    const idActive = req.params.id;
    const dataProductDetail = dataProductsPages.products.filter((item) => item.id == idActive);
    const listImageSmall = dataProductsPages.imagesDetail.find((item) => item.id == idActive);
    const listProductRelated = dataProductsPages.products.filter((item) => {
        return item.categoriesProduct == dataProductDetail[0].categoriesProduct && item.id !== idActive;
    });
    console.log(listProductRelated);
    res.render("home", {
        body: "./layouts/mainProductDetail",
        categories: dataProductsPages.categories,
        dataProduct: dataProductDetail[0],
        listImageSmall: listImageSmall,
        dataProductRelated: listProductRelated
    });
};
export const getCartPage = async (req, res) => {
    const dataProductsPages = await createDataDetailPage();
    console.log(dataProductsPages);
    const categories = dataProductsPages.categories;
    res.render("home", { body: "./layouts/mainCart", categories: categories });
};
export const getUserGeneralPage = async (req, res) => {
    const dataHomePage = await createDataHomePageJsonFile();
    const categories = dataHomePage.categories;
    res.render("home", { body: "./layouts/mainUserGeneral", categories: categories });
};
export const getFormAccountPage = (req, res) => {
    createDataAccountsJsonFile();
    res.render("account", {});
};
// import check email existing
import { checkEmailExists } from '../tests/testAccounts.js';
import { getEmailAccounts } from '../tests/testAccounts.js';
import { checkAccountsLogin } from "../tests/testAccounts.js";
import { insertDataAccount } from '../config/database.js';
export const postCreateAccount = async (req, res) => {
    const listEmailExists = await getEmailAccounts();
    console.log(">>> Body register: ", req.body);
    if (!checkEmailExists(req.body.emailAccount, listEmailExists)) { // nếu trả về false thì insert data (false là chưa có tồn tại email đó)
        res.status(201).send({ title: "Đăng ký thành công!", message: 'Vui lòng đăng nhập tài khoản của bạn!' });
        createDataAccountsJsonFile();
        insertDataAccount(req.body);
    }
    else {
        res.status(400).send({ title: "Thất bại!", message: 'Email đã được sử dụng!' });
    }
};
export const postLoginAccount = async (req, res) => {
    const account = await checkAccountsLogin(req.body.emailAccount, req.body.passwordAccount);
    if (account.length !== 0) {
        res.status(200).send({ title: "Đăng nhập thành công!", message: 'Bạn đã đăng nhập thành công vào tài khoản!', data: JSON.stringify(account) });
    }
    else {
        res.status(404).send({ title: "Đăng nhập thất bại!", message: 'Email hoặc Mật khẩu không đúng!' });
    }
};
//# sourceMappingURL=homeController.js.map