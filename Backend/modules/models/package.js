const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PackageSchema = new Schema({
    title: { type: String, required: true },
    timespan: { type: String, required: true },
    tag: { type: String, required: true },
    price: { type: Number, required: true },
    features: [{ feature: String, status: Boolean }],
},{timestamps:true});
module.exports = mongoose.model('Package', PackageSchema);