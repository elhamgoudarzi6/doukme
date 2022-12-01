const Controller = require(`${config.path.controller}/Controller`);
const jwt = require('jsonwebtoken');

module.exports = new class AgentController extends Controller {
    getEmployeeRating(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.Employee.find({ employeeID: req.params.id }).exec((err, rating) => {
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

    registerEmployee(req, res) {
        this.model.Employee.findOne({ mobile: req.body.mobile }, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'این  شماره قبلا ثبت شده است',
                    success: false
                });
            } else {
                let newEmployee = new this.model.Employee({
                    catID: req.body.catID,
                    subCatID: req.body.subCatID,
                    fullName: req.body.fullName,
                    image: req.body.image,
                    bio: req.body.bio,
                    mobile: req.body.mobile,
                    ability: req.body.ability,
                    instaPage: req.body.instaPage,
                    experience: req.body.experience,
                    workNumber: req.body.workNumber,
                    workTime: req.body.workTime,
                    address: req.body.address,
                    gallery: req.body.gallery,
                    location: req.body.location,
                });
                newEmployee.save(err => {
                    if (err) throw err;
                    let token = jwt.sign({ user_id: newEmployee._id }, config.secret, { expiresIn: '110h', });
                    this.model.Employee.findByIdAndUpdate(newEmployee.id, { token: token }, (err, result) => {
                        if (err) throw err
                        this.model.Employee.findById(result.id, { token: 1, mobile: 1, image: 1, fullName: 1 }, (err, auth) => {
                            return res.json({ data: auth, success: true });
                        })
                    })
                })
            }
        })
    }

    updateEmployee(req, res) {
        let listFields = {};
        if (req.body.workTime) { listFields.workTime = req.body.workTime }
        if (req.body.ability) { listFields.ability = req.body.ability }
        if (req.body.instaPage) { listFields.instaPage = req.body.instaPage }
        if (req.body.experience) { listFields.experience = req.body.experience }
        if (req.body.workNumber) { listFields.workNumber = req.body.workNumber }
        if (req.body.gallery) { listFields.gallery = req.body.gallery }
        if (req.body.location) { listFields.location = req.body.location }
        if (req.body.address) { listFields.address = req.body.address }
        if (req.body.catID) { listFields.catID = req.body.catID }
        if (req.body.subCatID) { listFields.subCatID = req.body.subCatID }
        if (req.body.fullName) { listFields.fullName = req.body.fullName }
        if (req.body.image) { listFields.image = req.body.image }
        if (req.body.mobile) { listFields.mobile = req.body.mobile }
        if (req.body.bio) { listFields.bio = req.body.bio }
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Employee.findByIdAndUpdate(req.params.id, listFields, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'اطلاعات  با موفقیت بروز رسانی شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });

        });
    }

    deleteEmployee(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Employee.findByIdAndRemove(req.params.id, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'دسته سطح یک با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    getEmployee(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Employee.findById(req.params.id)
            .populate({ path: 'SubCategory Category' })
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
            .populate({ path: 'EmployeeSubCat EmployeeCat' })
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

    getAllEmployeeByCatID(req, res) {
        this.model.Employee.find({ catID: req.params.id })
        .populate({ path: 'EmployeeSubCat EmployeeCat' })
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
}
