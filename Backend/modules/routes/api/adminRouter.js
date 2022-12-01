const express = require('express');
const router = express.Router();
const adminRouter = express.Router();

// middlewares
const apiAuthAdmin = require('./middleware/apiAuthAdmin');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
//admin controller
const AuthController = require(`${ControllerApi}/v1/admin/AuthController`);
const AdminUploadController = require(`${ControllerApi}/v1/admin/UploadController`);
const SliderController = require(`${ControllerApi}/v1/admin/SliderController`);
const CategoryController = require(`${ControllerApi}/v1/admin/CategoryController`);
const CommentController = require(`${ControllerApi}/v1/admin/CommentController`);
const UserController = require(`${ControllerApi}/v1/admin/UserController`);
const SubscriptionController = require(`${ControllerApi}/v1/admin/SubscriptionController`);
const DiscountController = require(`${ControllerApi}/v1/admin/DiscountController`);
const ContactUsController = require(`${ControllerApi}/v1/admin/ContactUsController`);
const FaqController = require(`${ControllerApi}/v1/admin/FaqController`);
const EmployeeController = require(`${ControllerApi}/v1/admin/EmployeeController`);
const TicketController = require(`${ControllerApi}/v1/admin/TicketController`);
const PackageController = require(`${ControllerApi}/v1/admin/PackageController`);
const ProductCatController = require(`${ControllerApi}/v1/admin/ProductCatController`);
const ProductController = require(`${ControllerApi}/v1/admin/ProductController`);

//upload
adminRouter.post('/upload', uploadImage.single('file'), AdminUploadController.uploadImage.bind(AdminUploadController));
//multi file
adminRouter.post('/multiUpload', uploadFiles, AdminUploadController.uploadFiles.bind(AdminUploadController));

//delete file uploaded in server
adminRouter.post('/deleteFile', AdminUploadController.deleteFile.bind(AdminUploadController));
//product
adminRouter.post('/registerProduct', ProductController.registerProduct.bind(ProductController));
adminRouter.get('/getProduct/:id', ProductController.getProduct.bind(ProductController));
adminRouter.get('/getAllProduct', ProductController.getAllProduct.bind(ProductController));
adminRouter.put('/updateProduct/:id', ProductController.updateProduct.bind(ProductController));
adminRouter.delete('/deleteProduct/:id', ProductController.deleteProduct.bind(ProductController));

//ticket
adminRouter.post('/registerTicket', apiAuthAdmin, TicketController.registerTicket.bind(TicketController));
adminRouter.get('/getAllTicket', apiAuthAdmin, TicketController.getAllTicket.bind(TicketController));
adminRouter.get('/getAllTicketForAgent/:id', apiAuthAdmin, TicketController.getAllTicketForAgent.bind(TicketController));
adminRouter.get('/countTicket', apiAuthAdmin, TicketController.countTicket.bind(TicketController));
adminRouter.get('/countTicketForAgent/:id', apiAuthAdmin, TicketController.countTicketForAgent.bind(TicketController));
adminRouter.put('/replyTicket/:id', apiAuthAdmin, TicketController.replyTicket.bind(TicketController));

//faq
adminRouter.get('/getAllFaq', apiAuthAdmin, FaqController.getAllFaq.bind(FaqController));
adminRouter.delete('/deleteFaq/:id', apiAuthAdmin, FaqController.deleteFaq.bind(FaqController));
adminRouter.post('/registerFaq', apiAuthAdmin, FaqController.registerFaq.bind(FaqController));
adminRouter.put('/updateFaq/:id', apiAuthAdmin, FaqController.updateFaq.bind(FaqController));
//Package
adminRouter.get('/getAllPackage', apiAuthAdmin, PackageController.getAllPackage.bind(PackageController));
adminRouter.delete('/deletePackage/:id', apiAuthAdmin, PackageController.deletePackage.bind(PackageController));
adminRouter.post('/registerPackage', apiAuthAdmin, PackageController.registerPackage.bind(PackageController));
adminRouter.put('/updatePackage/:id', apiAuthAdmin, PackageController.updatePackage.bind(PackageController));
adminRouter.post('/registerCvpack', apiAuthAdmin, PackageController.registerCvpack.bind(PackageController));
adminRouter.post('/registerJobCat', apiAuthAdmin, PackageController.registerJobCat.bind(PackageController));

//contact us
adminRouter.get('/getAllContactUs', apiAuthAdmin, ContactUsController.getAllContactUs.bind(ContactUsController));
adminRouter.delete('/deleteContactUs/:id', apiAuthAdmin, ContactUsController.deleteContactUs.bind(ContactUsController));
adminRouter.get('/getContactUs/:id', apiAuthAdmin, ContactUsController.getContactUs.bind(ContactUsController));

//auth admin
adminRouter.post('/loginAdmin', AuthController.loginAdmin.bind(AuthController));
adminRouter.post('/registerAdmin', apiAuthAdmin, AuthController.registerAdmin.bind(AuthController));
adminRouter.put('/updateAdmin/:id', apiAuthAdmin, AuthController.updateAdmin.bind(AuthController));
adminRouter.delete('/deleteAdmin/:id', apiAuthAdmin, AuthController.deleteAdmin.bind(AuthController));
adminRouter.get('/getAllAdmin', apiAuthAdmin, AuthController.getAllAdmin.bind(AuthController));
adminRouter.get('/getAdmin/:id', apiAuthAdmin, AuthController.getAdmin.bind(AuthController));
adminRouter.put('/changePassword/:id', apiAuthAdmin, AuthController.changePassword.bind(AuthController));
adminRouter.put('/changeUsername/:id', apiAuthAdmin, AuthController.changeUsername.bind(AuthController));
adminRouter.put('/resetPassword', apiAuthAdmin, AuthController.resetPassword.bind(AuthController));
//token
adminRouter.post('/getToken/:id', AuthController.getToken.bind(AuthController));



//Employee
adminRouter.post('/registerEmployee', apiAuthAdmin, EmployeeController.registerEmployee.bind(EmployeeController));
adminRouter.get('/getEmployee/:id', apiAuthAdmin, EmployeeController.getEmployee.bind(EmployeeController));
adminRouter.put('/updateEmployee/:id', apiAuthAdmin, EmployeeController.updateEmployee.bind(EmployeeController));
adminRouter.delete('/deleteEmployee/:id', apiAuthAdmin, EmployeeController.deleteEmployee.bind(EmployeeController));
adminRouter.get('/getAllEmployee', apiAuthAdmin, EmployeeController.getAllEmployee.bind(EmployeeController));
adminRouter.get('/getAllEmployeeByCatID/:id', apiAuthAdmin, EmployeeController.getAllEmployeeByCatID.bind(EmployeeController));
adminRouter.get('/getEmployeeRating/:id', apiAuthAdmin, EmployeeController.getEmployeeRating.bind(EmployeeController));

//user
adminRouter.post('/registerUser', apiAuthAdmin, UserController.registerUser.bind(UserController));
adminRouter.put('/updateUser/:id', apiAuthAdmin, UserController.updateUser.bind(UserController));
adminRouter.delete('/deleteUser/:id', apiAuthAdmin, UserController.deleteUser.bind(UserController));
adminRouter.get('/getUser/:id', apiAuthAdmin, UserController.getUser.bind(UserController));
adminRouter.get('/getAllUser', apiAuthAdmin, UserController.getAllUser.bind(UserController));

//comment
adminRouter.delete('/deleteComment/:id', apiAuthAdmin, CommentController.deleteComment.bind(CommentController));
adminRouter.get('/getAllComment', apiAuthAdmin, CommentController.getAllComment.bind(CommentController));
adminRouter.put('/activeOrDeactiveComment/:id', apiAuthAdmin, CommentController.activeOrDeactiveComment.bind(CommentController));
adminRouter.get('/countComment', apiAuthAdmin, CommentController.countComment.bind(CommentController));
adminRouter.put('/replyComment/:id', apiAuthAdmin, CommentController.replyComment.bind(CommentController));

//discount
adminRouter.post('/registerDiscount', apiAuthAdmin, DiscountController.registerDiscount.bind(DiscountController));
adminRouter.put('/updateDiscount/:id', apiAuthAdmin, DiscountController.updateDiscount.bind(DiscountController));
adminRouter.delete('/deleteDiscount/:id', apiAuthAdmin, DiscountController.deleteDiscount.bind(DiscountController));
adminRouter.get('/getAllDiscount', apiAuthAdmin, DiscountController.getAllDiscount.bind(DiscountController));
adminRouter.get('/getDiscount/:id', apiAuthAdmin, DiscountController.getDiscount.bind(DiscountController));

//slider
adminRouter.post('/registerSlider', apiAuthAdmin, SliderController.registerSlider.bind(SliderController));
adminRouter.get('/getAllSlider', apiAuthAdmin, SliderController.getAllSlider.bind(SliderController));
adminRouter.get('/getSlider/:id', apiAuthAdmin, SliderController.getSlider.bind(SliderController));
adminRouter.put('/updateSlider/:id', apiAuthAdmin, SliderController.updateSlider.bind(SliderController));
adminRouter.delete('/deleteSlider/:id', apiAuthAdmin, SliderController.deleteSlider.bind(SliderController));

//Employee Category
adminRouter.post('/registerEmployeeCat', apiAuthAdmin, CategoryController.registerEmployeeCat.bind(CategoryController));
adminRouter.get('/getAllEmployeeCat', apiAuthAdmin, CategoryController.getAllEmployeeCat.bind(CategoryController));
adminRouter.put('/updateEmployeeCat/:id', apiAuthAdmin, CategoryController.updateEmployeeCat.bind(CategoryController));
adminRouter.delete('/deleteEmployeeCat/:id', apiAuthAdmin, CategoryController.deleteEmployeeCat.bind(CategoryController));

//Employee SubCat
adminRouter.post('/registerEmployeeSubCat', apiAuthAdmin, CategoryController.registerEmployeeSubCat.bind(CategoryController));
adminRouter.put('/updateEmployeeSubCat/:id', apiAuthAdmin, CategoryController.updateEmployeeSubCat.bind(CategoryController));
adminRouter.delete('/deleteEmployeeSubCat/:id', apiAuthAdmin, CategoryController.deleteEmployeeSubCat.bind(CategoryController));


//Product Cat
adminRouter.post('/registerProductCat', apiAuthAdmin, ProductCatController.registerProductCat.bind(ProductCatController));
adminRouter.get('/getAllProductCat', apiAuthAdmin, ProductCatController.getAllProductCat.bind(ProductCatController));
adminRouter.put('/updateProductCat/:id', apiAuthAdmin, ProductCatController.updateProductCat.bind(ProductCatController));
adminRouter.delete('/deleteProductCat/:id', apiAuthAdmin, ProductCatController.deleteProductCat.bind(ProductCatController));

//Product SubCat
adminRouter.post('/registerProductSubCat', apiAuthAdmin, ProductCatController.registerProductSubCat.bind(ProductCatController));
adminRouter.put('/updateProductSubCat/:id', apiAuthAdmin, ProductCatController.updateProductSubCat.bind(ProductCatController));
adminRouter.delete('/deleteProductSubCat/:id', apiAuthAdmin, ProductCatController.deleteProductSubCat.bind(ProductCatController));

//ProductSubSubCat
adminRouter.post('/registerProductSubSubCat', apiAuthAdmin, ProductCatController.registerProductSubSubCat.bind(ProductCatController));
adminRouter.put('/updateProductSubSubCat/:id', apiAuthAdmin, ProductCatController.updateProductSubSubCat.bind(ProductCatController));
adminRouter.delete('/deleteProductSubSubCat/:id', apiAuthAdmin, ProductCatController.deleteProductSubSubCat.bind(ProductCatController));


//subscription
adminRouter.get('/getAllSubscription', apiAuthAdmin, SubscriptionController.getAllSubscription.bind(SubscriptionController));
adminRouter.delete('/deleteSubscription/:id', apiAuthAdmin, SubscriptionController.deleteSubscription.bind(SubscriptionController));


router.use('', adminRouter);
module.exports = router;
