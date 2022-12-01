const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ContentController extends Controller {

    getResultJobRequest(req, res) {
        this.model.JobRequest.findOne({ mobile: req.body.mobile }).populate('JobCat').exec((err, result) => {
            if (result) {
                return res.json({
                    data: result,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }


    updateJobRequest(req, res) {
        let listFields = {};
        if (req.body.bio) { listFields.bio = req.body.bio }
        if (req.body.nationalCode) { listFields.nationalCode = req.body.nationalCode }
        if (req.body.nationalCodeFile) { listFields.nationalCodeFile = req.body.nationalCodeFile }
        if (req.body.degreeFile) { listFields.degreeFile = req.body.degreeFile }
        if (req.body.cvFile) { listFields.cvFile = req.body.cvFile }
        if (req.body.address) { listFields.address = req.body.address }
        if (req.body.phone) { listFields.phone = req.body.phone }
        if (req.body.fullName) { listFields.fullName = req.body.fullName }
        if (req.body.image) { listFields.image = req.body.image }
        this.model.JobRequest.findOneAndUpdate({ mobile: req.body.mobile }, listFields, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'با موفقیت بروز رسانی شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });

        });
    }
    registerJobRequest(req, res) {
        this.model.JobRequest.findOne({ mobile: req.body.mobile }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'شماره همراه قبلا ثبت شده',
                    success: false
                });
            } else {
                this.model.JobRequest({
                    jobCatID: req.body.jobCatID,
                    mobile: req.body.mobile,
                    fullName: req.body.fullName,
                    image: req.body.image,
                    phone: req.body.phone,
                    address: req.body.address,
                    cvFile: req.body.cvFile,
                    degreeFile: req.body.degreeFile,
                    nationalCodeFile: req.body.nationalCodeFile,
                    nationalCode: req.body.nationalCode,
                    bio: req.body.bio,
                }).save(err => {
                    if (err) throw err;
                    return res.json({
                        data: 'با موفقیت ثبت  شد',
                        success: true
                    });
                });
            }
        });
    }

    getAllPackage(req, res) {
        this.model.Package.find().exec((err, Result) => {
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

    getAllCvpack(req, res) {
        this.model.Cvpack.find().exec((err, Result) => {
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

    getAllJobCat(req, res) {
        this.model.JobCat.find().exec((err, Result) => {
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

    registerReservation(req, res) {
        this.model.Reservation({
            time: req.body.time,
            date: req.body.date,
            userID: req.body.userID,
            employeeID: req.body.employeeID,
        }).save(err => {
            if (err) throw err;
            this.model.Plan.updateOne({
                employeeID: req.body.employeeID, date: req.body.date,
                "times.time": req.body.time
            }, { $set: { "times.$.status": false } })
                .exec((err, Result) => {
                    if (err) throw err;
                    if (Result) {
                        return res.json({
                            data: ' با موفقیت ثبت  شد',
                            success: true
                        });
                    }
                });
        });
    }


    getAllPlanForEmployee(req, res) {
        this.model.Plan.find({ employeeID: req.params.id, closed: false })
            .populate({ path: 'Employee', select: 'fullName mobile' }).sort({ createdAt: -1 }).exec((err, Result) => {
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

    getAllSeller(req, res) {
        this.model.Seller.find({}, (err, result) => {
            if (result) {
                return res.json({
                    data: result,
                    success: true
                })
            }
            res.json({
                data: 'کاربر یافت نشد',
                success: false
            })
        })
    }
    getAllEmployeeCat(req, res) {
        this.model.EmployeeCat.find({})
            .populate({ path: 'EmployeeSubCat', populate: { path: 'Employee' } })
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

    getAllFaq(req, res) {
        this.model.Faq.find({}).exec((err, Result) => {
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

    getAllSlider(req, res) {
        this.model.Slider.find({}).exec((err, Result) => {
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


    
    getAllProductCat(req, res) {
        this.model.ProductCat.find()
            .populate({ path: 'ProductSubCat', populate: { path: 'ProductSubSubCat' } })
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
