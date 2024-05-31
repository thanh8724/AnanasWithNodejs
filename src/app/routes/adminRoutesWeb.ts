import express from "express";
const router = express.Router();
import { 
    getDashboardPage,
    getCategoriesPage,
    getProductsPage,
    getOrdersPage
} from "../controllers/adminHomeControllers.js";
import { 
    getCreateCategoryPage,
    handleDeleteCategory,
    renderPageUpdate,
    handleUpdateCategory,
    getCreateProductPage,
    handleDeleteProduct,
    openUpdateOrder,
    renderPageUpdateProduct,
    handleUpdateProduct,
    handleUpdateOrder,
    getAccountsPage,
    handleCreateAccount,
    handleDeleteAccount
} from "../controllers/adminHomeControllers.js";
import { upload } from "../config/multer.js";
const initWebRouteAdmin = (app: any) => {
    router.get("/dashboard", getDashboardPage)
    router.get("/categories", getCategoriesPage)
    router.get("/products", getProductsPage)
    router.get("/orders", getOrdersPage)
    router.get("/accounts", getAccountsPage)

    // post method
    // categories start
    router.post("/postCategories", upload.single('imageCategory'), getCreateCategoryPage)
    router.post("/deleteCategory", handleDeleteCategory)
    router.post("/getPageUpdate", renderPageUpdate)
    router.post("/updateCategory", upload.single('imageCategory'), handleUpdateCategory)
    // categories end

    // products start
    router.post("/addNewProduct", upload.fields([
                { name: 'inputAvatarproduct', maxCount: 1 },
                { name: 'inputImagesProduct', maxCount: 10 }
                ]), getCreateProductPage)
    router.post("/deleteProduct", handleDeleteProduct)
    router.post("/popupUpdateProduct", renderPageUpdateProduct)
    router.post("/postUpdateProduct", upload.single('upLoadImageProduct'), handleUpdateProduct)
    // products end

    // order start
    router.post("/renderFormOrder", openUpdateOrder);
    router.post('/updateOrder', handleUpdateOrder);
    // order end
    
    // accounts start
    router.post('/createAccount',upload.single('avatar__user'), handleCreateAccount);
    router.post("/deleteAccount", handleDeleteAccount)
    // accounts end
    return app.use("/", router);
}
export default initWebRouteAdmin;