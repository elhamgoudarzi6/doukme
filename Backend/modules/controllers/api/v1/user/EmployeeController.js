const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class EmployeeController extends Controller {
    registerEmployeeRating(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.EmployeeRating.findOne({ userID: req.body.userID, employeeID: req.body.employeeID }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'شما قبلا امتیاز برای این فرد ثبت کرده اید',
                    success: false
                });
            } else {
                this.model.EmployeeRating({
                    userID: req.body.userID,
                    employeeID: req.body.employeeID,
                    rating: req.body.rating,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'امتیاز ثبت شد',
                        success: true
                    });
                });
            }
        });
    }

    getEmployeeRating(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.EmployeeRating.find({ employeeID: req.params.id }).exec((err, rating) => {
            if (err) throw err;
            if (rating) {
                let sum = 0;
                let count = rating.length;
                for (let i = 0; i <= count - 1; i++) {
                    sum += rating[i].rating;
                }
                return res.json({
                    data: sum / count,
                    success: true
                });
            }
            res.json({
                data: 'هیچ اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    getEmployee(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Employee.findById(req.params.id)
        .populate({ path: 'EmployeeCat EmployeeSubCat' })
        .exec((err, Result) => {
                if (err) throw err;
                if (Result) {
                    return res.json({
                        data: Result,
                        success: true
                    })
                }
                res.json({
                    data: 'یافت نشد',
                    success: false
                })
            });
    }

    getAllEmployee(req, res) {
        this.model.Employee.find()
        .populate({ path: 'EmployeeSubCat' })
        .exec((err, Result) => {
                if (err) throw err;
                if (Result) {
                    return res.json({
                        data: Result,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }

    getAllCatEmployee(req, res) {
        this.model.Employee.find({}).exec((err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: Result,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    getAllEmployeeByCatID(req, res) {
        this.model.Employee.find({ subCatID: req.params.id })
            .populate({ path: 'SubCategory' })
            .exec((err, Result) => {
                if (err) throw err;
                if (Result) {
                    return res.json({
                        data: Result,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }


    advanceSearchEmployee(req, res) {
        let query = {};
        if (req.body.catID) {
            query.catID = req.body.catID;
        }
        if (req.body.subCatID) {
            query.subCatID = req.body.subCatID;
        }
        if (req.body.employeeID) {
            query._id = req.body.employeeID;
        }
        this.model.Employee.find(query)
            .populate({ path: 'EmployeeCat EmployeeSubCat' })
            .exec((err, Result) => {
                if (err) throw err;
                if (Result) {
                    return res.json({
                        data: Result,
                        success: true
                    });
                }
            });
    }

}
