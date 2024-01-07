// Model
const Admin= require(`${config.path.model}/admin`);
const User = require(`${config.path.model}/user`);
const EmployeeRating=require(`${config.path.model}/employeeRating`);
const Slider = require(`${config.path.model}/slider`);
const Subscription=require(`${config.path.model}/subscription`);
const Comment=require(`${config.path.model}/comment`);
const Discount=require(`${config.path.model}/discount`);
const ContactUs=require(`${config.path.model}/contactUs`);
const Faq=require(`${config.path.model}/faq`);
const EmployeeCat=require(`${config.path.model}/employeeCat`);
const EmployeeSubCat=require(`${config.path.model}/employeeSubCat`);
const Ticket=require(`${config.path.model}/ticket`);
const Employee=require(`${config.path.model}/employee`);
const Plan=require(`${config.path.model}/plan`);
const Reservation=require(`${config.path.model}/reservation`);
////package
const Package=require(`${config.path.model}/package`);
const Cvpack=require(`${config.path.model}/cvpack`);
const JobRequest=require(`${config.path.model}/jobRequest`);
const JobCat=require(`${config.path.model}/jobCat`);
//shop
const ProductCat=require(`${config.path.model}/productCat`);
const ProductSubCat=require(`${config.path.model}/productSubCat`);
const ProductSubSubCat=require(`${config.path.model}/productSubSubCat`);
const Product=require(`${config.path.model}/product`);
const Seller=require(`${config.path.model}/seller`);
const Inventory=require(`${config.path.model}/inventory`);

module.exports = class Controller {
    constructor() {
        this.model = { Admin,User,Slider,Subscription,EmployeeRating,Comment,Employee,
		Discount,ContactUs,Faq,EmployeeCat,EmployeeSubCat,Ticket,Plan,Reservation,
        Package,Cvpack,JobRequest,JobCat,
        ProductCat,ProductSubCat,ProductSubSubCat,Product,Seller,Inventory
    
    }
    }
    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.json({
                message: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        }
        return false
    }

    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}
