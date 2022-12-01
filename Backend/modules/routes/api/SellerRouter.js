const express = require('express');
const router = express.Router();
const sellerRouter = express.Router();

// middlewares
const apiAuth = require('./middleware/apiAuthSeller');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
const UploadController = require(`${ControllerApi}/v1/seller/UploadController`);
const ProductController = require(`${ControllerApi}/v1/seller/ProductController`);
const AuthController = require(`${ControllerApi}/v1/seller/AuthController`);

//upload 
sellerRouter.post('/upload', uploadImage.single('file'), UploadController.uploadImage.bind(UploadController));
//multi file
sellerRouter.post('/multiUpload', uploadFiles, UploadController.uploadFiles.bind(UploadController));
//Auth
sellerRouter.get('/getSeller/:id', apiAuth, AuthController.getSeller.bind(AuthController));
sellerRouter.put('/updateSeller/:id', apiAuth, AuthController.updateSeller.bind(AuthController));
sellerRouter.post('/authSeller', AuthController.authSeller.bind(AuthController));

//Product
sellerRouter.post('/registerProduct', apiAuth, ProductController.registerProduct.bind(ProductController));
sellerRouter.get('/getProduct/:id', apiAuth, ProductController.getProduct.bind(ProductController));
sellerRouter.put('/updateProduct/:id', apiAuth, ProductController.updateProduct.bind(ProductController));
sellerRouter.get('/getAllProductBySeller/:id', apiAuth, ProductController.getAllProductBySeller.bind(ProductController));

router.use('', sellerRouter);
module.exports = router;
