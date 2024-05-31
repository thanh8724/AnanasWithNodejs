import express from 'express';
import { 
// renderHeaderMiddleware,
getHomePage, getShopPage, getProductDetailPage, getCartPage, getFormAccountPage, postCreateAccount, postLoginAccount, getUserGeneralPage } from '../controllers/homeController.js';
const router = express.Router();
// router.use(renderHeaderMiddleware);
router.get("/", getHomePage);
router.get("/shop/:id", getShopPage);
router.get("/product-detail/:id", getProductDetailPage);
router.get("/cart", getCartPage);
router.get("/login-register", getFormAccountPage);
router.get("/user-general", getUserGeneralPage);
// router post data
router.post('/register', postCreateAccount);
router.post('/login', postLoginAccount);
export default router;
//# sourceMappingURL=web.js.map