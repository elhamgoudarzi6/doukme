const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class SellerController extends Controller {
    getSeller(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.find({ _id: req.params.id }, (err, result) => {
            if (result) {
                return res.json({
                    data: result,
                    success: true
                })
            }
            res.json({
                data: 'فروشنده یافت نشد',
                success: false
            })
        })
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


    updateSeller(req, res) {
        let listFields = {};
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        if (req.body.fullName) { listFields.fullName = req.body.fullName }
        if (req.body.phone) { listFields.phone = req.body.phone }
        if (req.body.state) { listFields.state = req.body.state }
        if (req.body.city) { listFields.city = req.body.city }
        if (req.body.address) { listFields.address = req.body.address }
        if (req.body.postalCode) { listFields.postalCode = req.body.postalCode }
        if (req.body.logo) { listFields.logo = req.body.logo }
        if (req.body.nationalCode) { listFields.nationalCode = req.body.nationalCode }
        if (req.body.shopName) { listFields.shopName = req.body.shopName }
        if (req.body.shabaNumber) { listFields.shabaNumber = req.body.shabaNumber }
        if (req.body.imageNationalcard) { listFields.imageNationalcard = req.body.imageNationalcard }
        if (req.body.info) { listFields.info = req.body.info }
        this.model.Seller.findByIdAndUpdate(req.params.id, listFields, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'اطلاعات فروشنده با موفقیت بروز رسانی شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین فروشنده ای وجود ندارد',
                success: false
            });

        });
    }

    registerSeller(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findOne({ mobile: req.body.mobile }, (err, result) => {
            if (err) return res.json({
                data: err,
                success: false
            });
            if (result == null) {
                this.model.Seller({
                    mobile: req.body.mobile,
                    phone: req.body.phone,
                    address: req.body.address,
                    fullName: req.body.fullName,
                    state: req.body.state,
                    city: req.body.city,
                    postalCode: req.body.postalCode,
                    logo: req.body.logo,
                    nationalCode: req.body.nationalCode,
                    shopName: req.body.shopName,
                    shabaNumber: req.body.shabaNumber,
                    imageNationalcard: req.body.imageNationalcard,
                    info: req.body.info,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'فروشنده با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
            else
                return res.json({
                    data: 'فروشنده ای با این شماره همراه قبلاً ثبت نام شده است',
                    success: false
                });
        })
    }

    deleteSeller(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'سلر با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    statusSeller(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findByIdAndUpdate(req.params.id, {
            active: req.body.active,
        }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: ' فروشنده با موفقیت فعال شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین فروشنده ای وجود ندارد',
                success: false
            });

        });
    }
}
