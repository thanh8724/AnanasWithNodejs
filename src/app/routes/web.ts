import express from 'express'
import {
        getHomePage, 
        getShopPage,
        getProductDetailPage, 
        getCartPage,
        getCheckOutPage,
        getFormAccountPage,
        postCreateAccount,
        postLoginAccount,
        handlesPostCheckOut,
        getUserGeneralPage
    } from '../controllers/homeController.js';
const router = express.Router();
export const initWebRoute = (app: any) => {
    router.get("/", getHomePage);
    router.get("/shop/:id", getShopPage);
    router.get("/product-detail/:id", getProductDetailPage);
    router.get("/cart", getCartPage);
    router.get("/checkOut", getCheckOutPage);
    router.get("/login-register", getFormAccountPage);
    router.get("/user-general", getUserGeneralPage);
    // router post data
    router.post('/register', postCreateAccount);
    router.post('/login', postLoginAccount);
    router.post('/checkOut', handlesPostCheckOut);
    return app.use('/', router);
}
