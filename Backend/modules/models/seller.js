const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SellerSchema = new Schema({
    mobile: { type: String, required: true },
    phone: { type: String, },
    address: { type: String },
    fullName: { type: String, },
    state: { type: String, },
    city: { type: String, },
    postalCode: { type: String, },
    logo: { type: String, },
    nationalCode: { type: String, },
    shopName: { type: String, },
    shabaNumber: { type: String, },
    imageNationalcard: { type: String, },
    info: { type: String, },
    active: { type: Boolean, default: false },
    type: { type: String, default: 'seller' },
    token:{type:String},
});
module.exports = mongoose.model('Seller', SellerSchema);
