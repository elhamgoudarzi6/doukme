const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class PackageController extends Controller {

    registerPackage(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Package({
            title: req.body.title,
            timespan: req.body.timespan,
            price: req.body.price,
            features: req.body.features,
            tag: req.body.tag
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    registerCvpack(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.Cvpack({
            title: req.body.title,
            image: req.body.image,
            link: req.body.link,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'با موفقیت ثبت  شد',
                success: true
            });
        });
    }

   


    registerJobCat(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.JobCat({
            title: req.body.title,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    updatePackage(req, res) {
        let listFields = {};
        if (req.body.title) { listFields.title = req.body.title }
        if (req.body.timespan) { listFields.timespan = req.body.timespan }
        if (req.body.price) { listFields.price = req.body.price }
        if (req.body.features) { listFields.features = req.body.features }
        if (req.body.tag) { listFields.tag = req.body.tag }
        this.model.Package.findByIdAndUpdate(req.params.id, listFields, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    deletePackage(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Package.findByIdAndRemove(req.params.id, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
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


}
