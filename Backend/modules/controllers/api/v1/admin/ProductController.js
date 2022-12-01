const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProductController extends Controller {

    registerProduct(req, res) {
        let newProduct = new this.model.Product({
            catID: req.body.catID,
            subCatID: req.body.subCatID,
            subSubCatID: req.body.subSubCatID,
            sellerID: req.body.sellerID,
            discountID: req.body.discountID,
            title: req.body.title,
            price: req.body.price,
            sendCost: req.body.sendCost,
            detail: req.body.detail,
            tag: req.body.tag,
            features: req.body.features,
            image: req.body.image,
            info: req.body.info
        })
        newProduct.save(err => {
            if (err) throw err;
            this.model.Inventory({
                productID: newProduct._id,
                count: req.body.count,
            }).save(err => {
                if (err) {
                    throw err;
                }
                return res.json({
                    data: 'محصول با موفقیت ثبت  شد',
                    result: newProduct,
                    success: true
                });
            });

        })

    }

    getAllProduct(req, res) {
        this.model.Product.find().sort({ updatedAt: -1 })
            .populate('ProductCat ProductSubCat ProductSubSubCat Seller Discount')
            .exec((err, result) => {
                if (err) throw err;
                if (result) {
                    return res.json({
                        data: result,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }


    getProduct(req, res) {
        this.model.Product.findById(req.params.id)
            .populate('ProductCat ProductSubCat ProductSubSubCat Seller Discount')
            .exec((err, result) => {
                if (err) res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
                if (result) {
                    return res.json({
                        data: result,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }

    updateProduct(req, res) {
        let listFields = {};
        if (req.body.catID) { listFields.catID = req.body.catID }
        if (req.body.subCatID) { listFields.subCatID = req.body.subCatID }
        if (req.body.subSubCatID) { listFields.subSubCatID = req.body.subSubCatID }
        if (req.body.sellerID) { listFields.sellerID = req.body.sellerID }
        if (req.body.discountID) { listFields.discountID = req.body.discountID }
        if (req.body.title) { listFields.title = req.body.title }
        if (req.body.price) { listFields.price = req.body.price }
        if (req.body.sendCost) { listFields.sendCost = req.body.sendCost }
        if (req.body.detail) { listFields.detail = req.body.detail }
        if (req.body.tag) { listFields.tag = req.body.tag }
        if (req.body.features) { listFields.features = req.body.features }
        if (req.body.image) { listFields.image = req.body.image }
        if (req.body.info) { listFields.info = req.body.info }
        this.model.Product.findByIdAndUpdate(req.params.id, listFields, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: ' محصول با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }

    deleteProduct(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Product.findByIdAndRemove(req.params.id, (err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: 'محصول با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }


}
