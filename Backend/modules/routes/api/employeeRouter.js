const express = require('express');
const router = express.Router();
const employeeRouter = express.Router();

// middlewares
const apiAuthUser = require('./middleware/apiAuthEmployee');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
const UploadController = require(`${ControllerApi}/v1/employee/UploadController`);
const AuthController = require(`${ControllerApi}/v1/employee/AuthController`);
const TicketController = require(`${ControllerApi}/v1/employee/TicketController`);
const CategoryController = require(`${ControllerApi}/v1/employee/CategoryController`);
const PlanController = require(`${ControllerApi}/v1/employee/PlanController`);

//upload 
employeeRouter.post('/upload', uploadImage.single('file'), UploadController.uploadImage.bind(UploadController));
//multi file
employeeRouter.post('/multiUpload', uploadFiles, UploadController.uploadFiles.bind(UploadController));

//delete file uploaded in server
employeeRouter.post('/deleteFile', UploadController.deleteFile.bind(UploadController));
// auth user
employeeRouter.post('/loginEmployee', AuthController.loginEmployee.bind(AuthController));
employeeRouter.put('/updateEmployee/:id', apiAuthUser, AuthController.updateEmployee.bind(AuthController));
employeeRouter.get('/getEmployee/:id', AuthController.getEmployee.bind(AuthController));
employeeRouter.post('/getToken/:id', AuthController.getToken.bind(AuthController));
employeeRouter.get('/getEmployeeRating/:id', AuthController.getEmployeeRating.bind(AuthController));
employeeRouter.post('/registerEmployee', AuthController.registerEmployee.bind(AuthController));

//change
employeeRouter.put('/resetPassword', apiAuthUser, AuthController.resetPassword.bind(AuthController));
employeeRouter.put('/changePassword/:id', apiAuthUser, AuthController.changePassword.bind(AuthController));
employeeRouter.post('/findMobile', apiAuthUser, AuthController.findMobile.bind(AuthController));
employeeRouter.put('/changeMobileNumber/:id', apiAuthUser, AuthController.changeMobileNumber.bind(AuthController));

//ticket
employeeRouter.post('/registerTicket', apiAuthUser, TicketController.registerTicket.bind(TicketController));
employeeRouter.get('/countTicketForAgent/:id', apiAuthUser, TicketController.countTicketForAgent.bind(TicketController));
employeeRouter.get('/getAllTicketForAgent/:id', apiAuthUser, TicketController.getAllTicketForAgent.bind(TicketController));
employeeRouter.put('/replyTicket/:id', apiAuthUser, TicketController.replyTicket.bind(TicketController));
employeeRouter.get('/getAllUser', apiAuthUser, TicketController.getAllUser.bind(TicketController));

//Plan
employeeRouter.post('/registerPlan', apiAuthUser, PlanController.registerPlan.bind(PlanController));
employeeRouter.get('/getAllPlanForEmployee/:id', apiAuthUser, PlanController.getAllPlanForEmployee.bind(PlanController));

//Category
employeeRouter.get('/getAllEmployeeCat', CategoryController.getAllEmployeeCat.bind(CategoryController));
employeeRouter.get('/getAllUser', CategoryController.getAllUser.bind(CategoryController));

router.use('', employeeRouter);
module.exports = router;
