const express = require('express');
const router = express.Router();

// middlewares
const apiAuthAdminUser = require('./middleware/apiAuthAdmin');
const apiAuth = require('./middleware/apiAuth');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
const UploadController = require(`${ControllerApi}/v1/user/UploadController`);
const AuthUserController = require(`${ControllerApi}/v1/user/AuthUserController`);
const CommentController = require(`${ControllerApi}/v1/user/CommentController`);
const ContactUsController = require(`${ControllerApi}/v1/user/ContactUsController`);
const SubscriptionController = require(`${ControllerApi}/v1/user/SubscriptionController`);
const ContentController = require(`${ControllerApi}/v1/user/ContentController`);
const TicketController = require(`${ControllerApi}/v1/user/TicketController`);
const EmployeeController = require(`${ControllerApi}/v1/user/EmployeeController`);
const ProductController = require(`${ControllerApi}/v1/user/ProductController`);

//upload 
router.post('/upload', uploadImage.single('file'), UploadController.uploadImage.bind(UploadController));
//multi file
router.post('/multiUpload', uploadFiles, UploadController.uploadFiles.bind(UploadController));

//delete file uploaded in server
router.post('/deleteFile', UploadController.deleteFile.bind(UploadController));

//agent
router.get('/getEmployee/:id', EmployeeController.getEmployee.bind(EmployeeController));
router.get('/getAllEmployee', EmployeeController.getAllEmployee.bind(EmployeeController));
router.get('/getAllEmployeeByCatID/:id', EmployeeController.getAllEmployeeByCatID.bind(EmployeeController));
router.get('/getEmployeeRating/:id', EmployeeController.getEmployeeRating.bind(EmployeeController));
router.post('/registerEmployeeRating', EmployeeController.registerEmployeeRating.bind(EmployeeController));
//advanceSearchEmployee
router.post('/advanceSearchEmployee', EmployeeController.advanceSearchEmployee.bind(EmployeeController));

//Content
router.get('/getAllFaq', ContentController.getAllFaq.bind(ContentController));
router.get('/getAllSlider', ContentController.getAllSlider.bind(ContentController));
router.get('/getAllPlanForEmployee/:id', ContentController.getAllPlanForEmployee.bind(ContentController));
router.post('/registerReservation', ContentController.registerReservation.bind(ContentController));
router.get('/getAllPackage', ContentController.getAllPackage.bind(ContentController));
router.get('/getAllCvpack', ContentController.getAllCvpack.bind(ContentController));
router.get('/getAllJobCat', ContentController.getAllJobCat.bind(ContentController));
router.post('/registerJobRequest', ContentController.registerJobRequest.bind(ContentController));
router.post('/getResultJobRequest', ContentController.getResultJobRequest.bind(ContentController));
router.put('/updateJobRequest', ContentController.updateJobRequest.bind(ContentController));
router.get('/getAllSeller', ContentController.getAllSeller.bind(ContentController));

// auth user
router.post('/authUser', AuthUserController.authUser.bind(AuthUserController));
router.put('/updateUser/:id', apiAuth, AuthUserController.updateUser.bind(AuthUserController));
router.get('/getUser/:id', apiAuth, AuthUserController.getUser.bind(AuthUserController));
router.delete('/deleteUser/:id', apiAuth, AuthUserController.deleteUser.bind(AuthUserController));
router.post('/getToken/:id', AuthUserController.getToken.bind(AuthUserController));
//changeMobileNumber
router.put('/changeMobileNumber/:id', apiAuth, AuthUserController.changeMobileNumber.bind(AuthUserController));
router.post('/findMobile', apiAuth, AuthUserController.findMobile.bind(AuthUserController));
//ticket
router.post('/registerTicket', apiAuth, TicketController.registerTicket.bind(TicketController));
router.get('/countTicketForUser/:id', apiAuth, TicketController.countTicketForUser.bind(TicketController));
router.get('/allTicketForUser/:id', apiAuth, TicketController.allTicketForUser.bind(TicketController));
router.put('/replyTicket/:id', apiAuth, TicketController.replyTicket.bind(TicketController));
//contact us
router.post('/registerContactUs', ContactUsController.registerContactUs.bind(ContactUsController));
//comment
router.post('/registerComment', apiAuth, CommentController.registerComment.bind(CommentController));
router.get('/countComment/:id', apiAuth, CommentController.countComment.bind(CommentController));
router.get('/getCommentsForProduct/:id', CommentController.getCommentsForProduct.bind(CommentController));

//subscription
router.post('/registerSubscription', SubscriptionController.registerSubscription.bind(SubscriptionController));

//category
router.get('/getAllEmployeeCat', ContentController.getAllEmployeeCat.bind(ContentController));
router.get('/getAllProductCat', ContentController.getAllProductCat.bind(ContentController));
//Product
router.post('/advanceSearchProduct', ProductController.advanceSearchProduct.bind(ProductController));
router.get('/getProduct/:id', ProductController.getProduct.bind(ProductController));
router.get('/getAllNewProduct', ProductController.getAllNewProduct.bind(ProductController));
router.get('/getAllProductBySeller/:id', ProductController.getAllProductBySeller.bind(ProductController));

router.use('', router);
module.exports = router;
