import express, { Application } from 'express';
import { Request, Response, NextFunction } from 'express'
import { readFileJson } from "../fs.readFile.js";
import { createDataHomePageJsonFile } from '../services/getDataHomePage.js';
import { createDataProductsPageJsonFile } from '../services/getDataProductPage.js';
import { createDataDetailPage } from '../services/getDataDetailPage.js';
import { createDataBillsJsonFile } from '../services/getBills.js';
import createDataAccountsJsonFile from '../services/getAccounts.js';
import { unLinkImage } from '../config/unLinkImage.js';
const app: Application = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export const getDashboardPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await createDataHomePageJsonFile();
    await createDataBillsJsonFile();
    await createDataAccountsJsonFile(); // gọi hàm tạo file json để cập nhật lại dữ liệu mới nhất cho file
    const categories = await readFileJson('./src/json/dataHomePage.json');
    const fileOrder = await readFileJson('./src/json/dataBills.json');
    const dataAccount = await readFileJson('./src/json/dataAccounts.json');
    const customer = dataAccount.accounts.filter ((account: any) => account.roleAccount == 'user');
    let totalAmouts = 0;
    fileOrder.bills.forEach((bill: any) => {
        totalAmouts += bill.totalAmount;
    });
    return res.render("homeAdmin", {body: "./layouts/dashboard.ejs",
        categories: categories.categories,
        orders: fileOrder.bills,
        customer: customer,
        totalAmout: totalAmouts,
        accounts: dataAccount.accounts
    });
}
export const getCategoriesPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await createDataHomePageJsonFile();
    const categories = await readFileJson('./src/json/dataHomePage.json');
    return res.render("homeAdmin", {body: "./layouts/mainCategoriesAdmin.ejs", categories: categories.categories});
}
export const getProductsPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await createDataProductsPageJsonFile();
    const data = await readFileJson('./src/json/dataProductsPage.json');
    return res.render("homeAdmin", {body: "./layouts/mainProductsAdmin.ejs", products: data.products, categories: data.categories});
}
export const getOrdersPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await createDataBillsJsonFile();
    const data = await readFileJson('./src/json/dataBills.json');
    const bills = data.bills;
    return res.render("homeAdmin", {body: "./layouts/mainOrdersAdmin.ejs", bills: bills});
}
export const getAccountsPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await createDataAccountsJsonFile();
    const data = await readFileJson('./src/json/dataAccounts.json');
    const accounts = data.accounts;
    return res.render("homeAdmin", {body: "./layouts/mainAccountsAdmin.ejs", accounts: accounts});
}
// post new category
import { insertDataCategory } from '../models/categoriesModel.js'; 
import { deleteDataCategory } from '../models/categoriesModel.js';
import { updateDataCategory } from '../models/categoriesModel.js';
export const getCreateCategoryPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const categories = await readFileJson('./src/json/dataHomePage.json');    
    const { nameCategory } = req.body;
    const imageUrl = `/uploads/${req.file?.filename}`;
    const checkCategory = categories.categories.some((item: any) => item.nameCategory == nameCategory);
    if(!checkCategory && nameCategory != "") {
        insertDataCategory({nameCategory: nameCategory, imageUrl: imageUrl});
        await createDataHomePageJsonFile();
        res.status(201).json({title: "Thành công!", message: "Thêm danh mục mới thành công!"});
    }else {
        res.status(400).json({title: "Thất bại!", message: "Danh mục đã tồn tại hoặc chưa đủ thông tin!"})
    }
}   
export const handleDeleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await readFileJson('./src/json/dataHomePage.json');
    const { idCategory } = req.body;
    const category = data.categories.find((item: any) => item.id == idCategory);
    unLinkImage(category.imageCategory);
    await deleteDataCategory(idCategory);
    res.status(201).json({title: "Thành công!", message: "Xóa danh mục thành công!"});
}
export const renderPageUpdate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await readFileJson('./src/json/dataHomePage.json');
    const { idCategory } = req.body;
    const category = data.categories.find((item: any) => item.id == idCategory);
    res.status(201).json({title: "Trang cập nhật!", message: "Bạn có thể thao tác thông tin danh mục!", data: category});
}
export const handleUpdateCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await readFileJson('./src/json/dataHomePage.json');
    const { idCategory, urlImage, nameCategoryUp, descriptionProduct } = req.body;
    let imageUrl: string = ``;
    const otherCategories = data.categories.filter((item: any) => item.id != idCategory);
    const checkCategory = otherCategories.some((item: any) => item.nameCategory == nameCategoryUp);
    if(req.file?.filename === undefined) {
        imageUrl = `${urlImage}`;
    }else {
        unLinkImage(urlImage);
        imageUrl = `/uploads/${req.file?.filename}`;
    }
    const dataUpdate = {
        nameCategory: nameCategoryUp,
        descriptionCategory: descriptionProduct,
        imageUrl: imageUrl
    }
    if(checkCategory == false && nameCategoryUp != "") {
        await updateDataCategory(idCategory, dataUpdate);
        res.status(201).json({title: "Thành công!", message: "Cập nhật danh mục thành công!"});
    }
    else {
        res.status(400).json({title: "Thất bại!", message: "Danh mục đã tồn tại hoặc chưa có thông tin!"})
    }
}

//  products
import { insertDataProduct } from '../models/productsModels.js';
import { insertDataImagesProduct } from '../models/productsModels.js';
import { deleteDataProduct } from '../models/productsModels.js';
import { updateDataProduct } from '../models/productsModels.js';
import { deleteDataImageDetail } from '../models/productsModels.js';
export const getCreateProductPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await readFileJson('./src/json/dataProductsPage.json');
    const listProduct = data.products;
    const { slectCategory, nameProduct, priceProduct, descriptionProduct } = req.body;
    const idProduct = Number(listProduct[listProduct.length - 1].id) + 1;
    if(typeof req.files == 'object' && Object.keys(req.files).length !== 0) {
        const avatarFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['inputAvatarproduct'][0];
        const imagesFiles = (req.files as { [fieldname: string]: Express.Multer.File[] })['inputImagesProduct'];
        const imageProduct: string = `/uploads/${avatarFile.filename}`;
        const arrayImagesDetail = imagesFiles.map(file => `/uploads/${file.filename}`);
        const checkProductExists = listProduct.some((product: any) => product.nameProduct ==  nameProduct);
        if(!checkProductExists && nameProduct != "" && priceProduct != "") {
            insertDataProduct({id: idProduct, image: imageProduct, name: nameProduct, price: priceProduct, categories: slectCategory, description: descriptionProduct});
            arrayImagesDetail.forEach(url => {
                insertDataImagesProduct(url, idProduct);
            });
            await createDataProductsPageJsonFile();
            res.status(201).json({title: "Thành công!", message: "Thêm sản phẩm mới thành công!"});
        }else {
            res.status(400).json({title: "Thất bại!", message: "Sản phẩm đã tồn tại hoặc chưa đủ thông tin cần thiết!"})
        }
    }else {
        res.status(400).json({title: "Thất bại!", message: "Bạn cần phải thêm hình ảnh cho sản phẩm!"})
    }
}   
export const handleDeleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await createDataDetailPage(); // gọi hàm tạo file json để cập nhật lại dữ liệu mới nhất cho file
    const data = await readFileJson('./src/json/dataDetailPage.json');
    const { idProduct } = req.body;
    const product = data.products.find((e: any) => e.id == idProduct);
    const listUrlImageDetail = data.imagesDetail.filter((e: any) => e.idProduct == idProduct);
    unLinkImage(product.imageProduct);
    listUrlImageDetail.forEach((element: any) => {
        unLinkImage(element.imageDetail);
    });
    await deleteDataProduct(idProduct);
    await deleteDataImageDetail(idProduct);
    res.status(201).json({title: "Thành công!", message: "Xóa sản phẩm thành công!"});
}
export const renderPageUpdateProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await readFileJson('./src/json/dataProductsPage.json');
    const { idProduct } = req.body;
    const product = data.products.find((item: any) => item.id == idProduct);
    res.status(201).json({title: "Trang cập nhật!", message: "Bạn có thể thao tác với thông tin sản phẩm!", dataProduct: product, categories: data.categories});
}
export const handleUpdateProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = await readFileJson('./src/json/dataProductsPage.json');
    const { idProductUpdate, imageOldProduct, selectCategory, nameProductUp, priceProductUp, descriptionProduct } = req.body;
    let imageUrl: string = '';
    const otherProducts = data.products.filter((item: any) => item.id != idProductUpdate);
    const checkProductExists = otherProducts.some((item: any) => item.nameProduct == nameProductUp);
    if(req.file?.filename === undefined) {
        console.log("not change image");
        imageUrl = `${imageOldProduct}`;
    }else {
        console.log(">>> change image");
        unLinkImage(imageOldProduct);
        imageUrl = `/uploads/${req.file?.filename}`;
    }
    const dataUpdate = {
        imageProduct: imageUrl,
        nameProduct: nameProductUp,
        priceProduct: priceProductUp,
        categoriesProduct: selectCategory,
        descriptionProduct: descriptionProduct
    }
    if(checkProductExists == false && nameProductUp != "" && priceProductUp != "") {
        await updateDataProduct(Number(idProductUpdate), dataUpdate);
        res.status(201).json({title: "Thành công!", message: "Cập nhật danh mục thành công!"});
    }
    else {
        res.status(400).json({title: "Thất bại!", message: "Danh mục đã tồn tại hoặc chưa có thông tin!"})
    }
}



import { updateBill } from '../models/billModels.js';
// orders
export const openUpdateOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { idOrder } = req.body
    await createDataBillsJsonFile();
    const data = await readFileJson('./src/json/dataBills.json');
    const bill = data.bills.find((item: any) => item.id == idOrder);
    const listProduct = data.productbill.filter((item: any) => item.idBill == idOrder);
    res.status(201).json({title: "Trang cập nhật!", message: "Bạn có thể xem chi tiết và thay đổi trạng thái!", data: bill, listProduct: listProduct});
}
export const handleUpdateOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { idOrder, oldStatus, newStatus } = req.body;
    if(newStatus === oldStatus) return res.status(400).json({title: "Thất bại!", message: "Trạng thái đơn hàng chưa thay đổi!"});
    if(newStatus === "Chờ xác nhận" && oldStatus === "Đang giao") return res.status(400).json({title: "Thất bại!", message: "Có lỗi trong quá trình cập nhật trạng thái!"});
    else {
        await updateBill(idOrder, newStatus);
        res.status(201).json({title: "Thành công!", message: "Đơn hàng đã được cập nhật thành công!"});
    }
}


import { getEmailAccounts } from '../tests/testAccounts.js';
import { checkEmailExists } from '../tests/testAccounts.js';
import { insertDataAccountHaveImage } from '../models/accountModels.js';
import { deleteDataAccount } from '../models/accountModels.js';
// account
export const handleCreateAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const listEmailExists = await getEmailAccounts();
    const { nameAccount, emailAccount, passwordAccount, checkboxRoleAdmin, checkboxRoleUser } = req.body; 
    const urlImage = `/uploads/${req.file?.filename}`;
    let roleAccount: string = '';
    if(checkboxRoleUser == undefined) roleAccount = 'admin';
    if(checkboxRoleAdmin == undefined) roleAccount = 'user';
    if(checkboxRoleUser == undefined && checkboxRoleAdmin == undefined) roleAccount = 'user';
    const dataAccount = {
        nameAccount: nameAccount,
        emailAccount: emailAccount,
        passwordAccount: passwordAccount,
        avatarAccount: urlImage,
        roleAccount:  roleAccount,
    }    
    if(emailAccount != "") {
        if(!checkEmailExists(req.body.emailAccount, listEmailExists)) { // nếu trả về false thì insert data (false là chưa có tồn tại email đó)
            if(nameAccount == "" || passwordAccount == "") {
                res.status(400).send({title: "Thất bại!", message: 'Vui lòng nhập đầy đủ thông tin!' });
            }else {
                if(passwordAccount.length <= 8) {
                    res.status(400).send({title: "Thất bại!", message: 'Mật khẩu phải lớn hơn 8 kí tự!' });
                }else {
                    await createDataAccountsJsonFile();
                    insertDataAccountHaveImage(dataAccount);
                    res.status(201).send({title: "Đăng ký thành công!", message: `Tạo thành công tài khoản ${dataAccount.roleAccount} mới!` });
                }
            }
        }else {
            res.status(400).send({title: "Thất bại!", message: 'Email đã được sử dụng!' });
        }
    }else {
        res.status(400).send({title: "Thất bại!", message: 'Vui lòng nhập địa chỉ Email!' });
    }
}

export const handleDeleteAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await createDataAccountsJsonFile(); // gọi hàm tạo file json để cập nhật lại dữ liệu mới nhất cho file
    const data = await readFileJson('./src/json/dataAccounts.json');
    const { idAccount } = req.body;
    const account = data.accounts.find((e: any) => e.id == idAccount);
    if(account.roleAccount == 'admin') {
        res.status(404).json({title: "Thất bại!", message: "Tài khoản ADMIN không thể xóa!"})
    }else {
        unLinkImage(account.avatarAccount);
        await deleteDataAccount(idAccount);
        res.status(201).json({title: "Thành công!", message: "Xóa tài khoản người dùng thành công!"})
    }
}