import express, { Application } from 'express';
const app: Application = express(); 
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
import { Request, Response, NextFunction } from 'express';
// import function readFle Json
import { readFileJson } from "../fs.readFile.js";
// import data from services
import { createDataHomePageJsonFile } from "../services/getDataHomePage.js";
import { createDataProductsPageJsonFile } from "../services/getDataProductPage.js";
import { createDataDetailPage } from "../services/getDataDetailPage.js";
import createDataAccountsJsonFile from '../services/getAccounts.js';
import { createDataBillsJsonFile } from '../services/getBills.js';

// render pages
export const getHomePage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await createDataHomePageJsonFile();
    const dataHomePage = await readFileJson('./src/json/dataHomePage.json');
    return res.render("home", {
        body: "./layouts/mainHome",
        categories: dataHomePage?.categories,
        productBestSale: dataHomePage?.bestSaler,
        interest: dataHomePage?.productInterest
    });
}
export const getShopPage = async (req: Request, res: Response): Promise<void> => {
    await createDataProductsPageJsonFile();
    const dataShopPage = await readFileJson('./src/json/dataProductsPage.json');
    const idCategory: string = req.params.id;    
    const listProductPerIdCate: object = dataShopPage.products.filter((item: any) => item.categoriesProduct == idCategory);
    return res.render("home", {
        body: "./layouts/mainShop", 
        categories: dataShopPage.categories, 
        listProducts: listProductPerIdCate
    });
}
export const getProductDetailPage = async (req: Request, res: Response): Promise<void> => {
    const idActive: string = req.params.id;
    await createDataDetailPage();
    const dataDetailPage = await readFileJson('./src/json/dataDetailPage.json');
    const dataProductDetail: any = dataDetailPage.products.filter((item: any) => item.id == idActive);
    const listImageSmall: string[]|null|undefined = dataDetailPage.imagesDetail.find((item: any) => item.id == idActive);
    const listProductRelated = dataDetailPage.products.filter((item: any) => {
        return item.categoriesProduct == dataProductDetail[0].categoriesProduct && item.id !== idActive}
    );
    return res.render("home", {
        body: "./layouts/mainProductDetail",
        categories: dataDetailPage.categories, 
        dataProduct: dataProductDetail[0],
        listImageSmall:  listImageSmall,
        dataProductRelated: listProductRelated
    });
}
export const getCartPage = async (req: Request, res: Response): Promise<void> => {
    const dataProductsPages = await readFileJson('./src/json/dataHomePage.json');
    const categories = dataProductsPages.categories;
    return res.render("home", {body: "./layouts/mainCart", categories: categories});
}
export const getCheckOutPage = async (req: Request, res: Response): Promise<void> => {
    await createDataBillsJsonFile();
    const dataProductsPages = await readFileJson('./src/json/dataHomePage.json');
    const categories = dataProductsPages.categories;
    return res.render("home", {body: "./layouts/mainCheckOut", categories: categories});
}
export const getUserGeneralPage = async (req: Request, res: Response): Promise<void> => {
    const dataProductsPages = await readFileJson('./src/json/dataHomePage.json');
    const categories = dataProductsPages.categories;
    return res.render("home", {body: "./layouts/mainUserGeneral", categories: categories})
}
export const getFormAccountPage = (req: Request, res: Response): void => {
    createDataAccountsJsonFile();
    return res.render("account", {});
}


// impot middlware create JWT
import { createJWT } from '../middleware/JWTaction.js';
// import check email existing
import { checkEmailExists } from '../tests/testAccounts.js';
import { getEmailAccounts } from '../tests/testAccounts.js';
import { checkAccountsLogin } from "../tests/testAccounts.js";
import { insertDataAccount } from "../models/accountModels.js";
import { insertDataBill, insertNameProductBill } from '../models/billModels.js';
import { JWTverify } from '../middleware/JWTaction.js';
export const postCreateAccount = async (req: Request, res: Response): Promise<void> => {
    const listEmailExists = await getEmailAccounts();
    if(!checkEmailExists(req.body.emailAccount, listEmailExists)) { // nếu trả về false thì insert data (false là chưa có tồn tại email đó)
        res.status(201).send({title: "Đăng ký thành công!", message: 'Vui lòng đăng nhập tài khoản của bạn!' });
        createDataAccountsJsonFile();
        insertDataAccount(req.body);
    }else {
        res.status(400).send({title: "Thất bại!", message: 'Email đã được sử dụng!' });
    }
}
export const postLoginAccount = async (req: Request, res: Response): Promise<void> => {
    const account: any = await checkAccountsLogin(req.body.emailAccount, req.body.passwordAccount);
    if(account.length !== 0) {
        const token: string = createJWT(JSON.stringify(account));
        res.status(201).json({title: "Đăng nhập thành công!", message: 'Bạn đã đăng nhập thành công vào tài khoản!', authToken: token, roleAccount: account[0].roleAccount});
    }else {
        res.status(404).send({title: "Đăng nhập thất bại!", message: 'Email hoặc Mật khẩu không đúng!' });
    }
}
export const handlesPostCheckOut = async (req: Request, res: Response): Promise<void> => {
    const dataBills = await readFileJson('./src/json/dataBills.json');
    let idBill = 1;
    if(dataBills.bills.length != 0) {
        idBill = Number(dataBills.bills[dataBills.bills.length - 1].id + 1);
    }
    const { address, adderssSpecific, emailReceiver, phoneReceiver, totalAmount, shipping, paymentMethod, arrayNameProduct }= req.body;
    const token = req.cookies.authToken;
      if(token) {
        const decoded: any = JWTverify(token, `${process.env.SECRETKEY}`);
        const dataToken = JSON.parse(decoded.data)[0];
        if(token) {
            const idAccount = dataToken.id;
            const nameReceiver = dataToken.nameAccount;
            console.log({id: idBill, idAccount: idAccount, receiver: nameReceiver, emailReceiver: emailReceiver, phoneReceiver: phoneReceiver, address: address, adderssSpecific: adderssSpecific, totalAmount: totalAmount, shipping: shipping, status: "Chờ xác nhận", paymentMethod: paymentMethod});
            if(address == "" || adderssSpecific == "" || emailReceiver == "" || phoneReceiver == null) {
                res.status(400).send({title: "Thanh toán thất bại!", message: 'Vui lòng điền đầy đủ thông tin!' });
            }else {
                insertDataBill({id: idBill, idAccount: idAccount, receiver: nameReceiver, emailReceiver: emailReceiver, phoneReceiver: phoneReceiver, address: address, adderssSpecific: adderssSpecific, totalAmount: totalAmount, shipping: shipping, status: "Chờ xác nhận", paymentMethod: paymentMethod});
                arrayNameProduct.forEach((name: string) => {
                     insertNameProductBill({nameProduct: name, idBill: idBill});
                });
                res.status(201).json({title: "Đặt hàng thành công!", message: 'Bạn đã có thể theo dõi đơn hàng tại trang tài khoản!'});    
            }
        }
    }else {
            res.status(400).send({title: "Thanh toán thất bại!", message: 'Vui lòng đăng nhập để đặt hàng!' });
    }
}