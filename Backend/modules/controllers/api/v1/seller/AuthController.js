const Controller = require(`${config.path.controller}/Controller`);
const jwt = require('jsonwebtoken');
module.exports = new class AuthController extends Controller {
    authSeller(req, res) {
        this.model.Seller.findOne({ mobile: req.body.mobile }, (err, User) => {
            if (err) throw err;
            if (User) {
                let token = jwt.sign({ user_id: User._id }, config.secret, { expiresIn: '110h', });
                this.model.Seller.findByIdAndUpdate(User.id, { token: token }, (err, result) => {
                    if (err) throw err
                    this.model.Seller.findById(result.id, { token: 1, mobile: 1, type: 1, image: 1, fullName: 1 }, (err, auth) => {
                        return res.json({ data: auth, success: true });
                    });
                });
            } else {
                let newUser = new this.model.Seller({ mobile: req.body.mobile });
                newUser.save(err => {
                    if (err) throw err;
                    let token = jwt.sign({ user_id: newUser._id }, config.secret, { expiresIn: '110h', });
                    this.model.Seller.findByIdAndUpdate(newUser.id, { token: token }, (err, result) => {
                        if (err) throw err
                        this.model.Seller.findById(result.id, { token: 1, mobile: 1, type: 1, image: 1, fullName: 1 }, (err, auth) => {
                            return res.json({ data: auth, success: true });
                        });
                    });
                });
            }
        });
    }

    getSeller(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findById(req.params.id, { token: 0 }, (err, result) => {
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

    updateSeller(req, res) {
        let listFields = {};
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


}
