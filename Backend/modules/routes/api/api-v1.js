const express = require('express');
const router = express.Router();
//setting routes***********************************

const users = require('./userRouter');
router.use('/user',users);

const admin = require('./adminRouter');
router.use('/admin', admin);

const employee = require('./employeeRouter');
router.use('/employee', employee);

const seller = require('./SellerRouter');
router.use('/seller', seller);

module.exports = router;
