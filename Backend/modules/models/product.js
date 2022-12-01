const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    catID: { type: mongoose.Schema.ObjectId, require, ref: 'ProductCat' },
    subCatID: { type: mongoose.Schema.ObjectId, require, ref: 'ProductSubCat' },
    subSubCatID: { type: mongoose.Schema.ObjectId, require, ref: 'ProductSubSubCat' },
    sellerID: { type: mongoose.Schema.ObjectId, require, ref: 'Seller' },
    discountID: { type: mongoose.Schema.ObjectId, require, ref: 'Discount' },
    title: { type: String },
    detail: { type: String },
    tag: { type: String },
    features: [{ feature: String, featureValues: String }],
    image: { type: String },
    sendCost: { type: Number },
    price: { type: Number },
    info: [{ color: String, price: Number, colorCode: String, image: String, initialNumber: Number, remainsNumber: Number }],
}, { timestamps: true, toJSON: { virtuals: true } });
ProductSchema.virtual('ProductCat', {
    ref: 'ProductCat',
    localField: 'catID',
    foreignField: '_id',
});
ProductSchema.virtual('ProductSubCat', {
    ref: 'ProductSubCat',
    localField: 'subCatID',
    foreignField: '_id',
});
ProductSchema.virtual('ProductSubSubCat', {
    ref: 'ProductSubSubCat',
    localField: 'subSubCatID',
    foreignField: '_id',
});
ProductSchema.virtual('Discount', {
    ref: 'Discount',
    localField: 'discountID',
    foreignField: '_id',
});
ProductSchema.virtual('Seller', {
    ref: 'Seller',
    localField: 'sellerID',
    foreignField: '_id',
});
module.exports = mongoose.model('Product', ProductSchema);
