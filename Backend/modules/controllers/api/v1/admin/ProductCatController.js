const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProductCatController extends Controller {

    registerProductCat(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductCat({
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

    registerProductSubCat(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('catID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductSubCat({
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

    
    registerProductSubSubCat(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('subCatID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductSubSubCat({
            subCatID: req.body.subCatID,
            title: req.body.title,
            image: req.body.image,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'دسته سطح سه با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    updateProductCat(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductCat.findByIdAndUpdate(req.params.id, {
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

    updateProductSubCat(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('catID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductSubCat.findByIdAndUpdate(req.params.id, {
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

    updateProductSubSubCat(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('subCatID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductSubSubCat.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            subCatID: req.body.subCatID,
            image: req.body.image
        }, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: '  دسته سطح سه با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    deleteProductCat(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductCat.findByIdAndRemove(req.params.id, (err, Result) => {
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

    deleteProductSubCat(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductSubCat.findByIdAndRemove(req.params.id, (err, Result) => {
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

    deleteProductSubSubCat(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductSubSubCat.findByIdAndRemove(req.params.id, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'دسته سطح سه با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
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
