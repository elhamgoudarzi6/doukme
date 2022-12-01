const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryController extends Controller {

    registerEmployeeCat(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.EmployeeCat({
            title: req.body.title,
            image: req.body.image,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'دسته سطح یک با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    registerEmployeeSubCat(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('catID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.EmployeeSubCat({
            catID: req.body.catID,
            title: req.body.title,
            image: req.body.image,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'دسته سطح دو با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    updateEmployeeCat(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.EmployeeCat.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            image: req.body.image,
        }, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: ' دسته سطح یک با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    updateEmployeeSubCat(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('catID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.EmployeeSubCat.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            catID: req.body.catID,
            image: req.body.image
        }, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: '  دسته سطح دو با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    deleteEmployeeCat(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.EmployeeCat.findByIdAndRemove(req.params.id, (err, Result) => {
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

    deleteEmployeeSubCat(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.EmployeeSubCat.findByIdAndRemove(req.params.id, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'دسته سطح دو با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    getAllEmployeeCat(req, res) {
        this.model.EmployeeCat.find()
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


}
