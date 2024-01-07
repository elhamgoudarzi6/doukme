const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductCatSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String},
},{toJSON:{virtuals:true}});
ProductCatSchema.virtual('ProductSubCat',{
    ref:'ProductSubCat',
    localField:'_id',
    foreignField:'catID',
});

module.exports = mongoose.model('ProductCat', ProductCatSchema);
