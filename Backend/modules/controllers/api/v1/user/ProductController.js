const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProductController extends Controller {
    advanceSearchProduct(req, res) {
        let query = {};
        let sort = '';
        if (req.body.catID) {
            query.catID = req.body.catID;
        }
        if (req.body.subCatID) {
            query.subCatID = req.body.subCatID;
        }
        if (req.body.subSubCatID) {
            query.subSubCatID = req.body.subSubCatID;
        }
        if (req.body.productID) {
            query._id = req.body.productID;
        }
        if (req.body.sellerID) {
            query.sellerID = req.body.sellerID;
        }
        if (req.body.title) {
            query.title = req.body.title;
        }
        if (req.body.offer) {
            query.discountID = { $ne: '62fd54e923eb246818407526' };
        }
        if (req.body.priceMin && req.body.priceMax) {
            query.price = { $gte: req.body.priceMin, $lte: req.body.priceMax };
        }
        if (req.body.updatedAt) {
            sort = { updatedAt: req.body.updatedAt };
        }
        if (req.body.price) {
            sort = { price: req.body.price };
        }
        if (req.body.keywords) {
            query.title = { $regex: req.body.keywords };
        }
        this.model.Product.find(query).sort(sort)
            .populate('ProductCat ProductSubCat ProductSubSubCat Seller Discount')
            .exec((err, result) => {
                if (err) throw err;
                if (result) {
                    return res.json({
                        data: result,
                        success: true
                    });
                }
            });
    }


    getAllNewProduct(req, res) {
        this.model.Product.find().sort({ updatedAt: -1 }).limit(20)
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

    getAllProductBySeller(req, res) {
        this.model.Product.find({ sellerID: req.params.id }).sort({ updatedAt: -1 })
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





}
