const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSubCatSchema = new Schema({
    catID:{ type:mongoose.Schema.ObjectId,require, ref:'ProductCat'},
    title: { type: String, required: true },
    image: { type: String},
},{toJSON:{virtuals:true}});
ProductSubCatSchema.virtual('ProductSubSubCat',{
    ref:'ProductSubSubCat',
    localField:'_id',
    foreignField:'subCatID',
});
module.exports = mongoose.model('ProductSubCat', ProductSubCatSchema);
