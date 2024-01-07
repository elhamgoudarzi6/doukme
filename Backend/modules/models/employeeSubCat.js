const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmployeeSubCatSchema = new Schema({
    catID:{ type:mongoose.Schema.ObjectId,require, ref:'EmployeeCat'},
    title: { type: String, required: true },
    image: { type: String},
},{toJSON:{virtuals:true}});
EmployeeSubCatSchema.virtual('Employee',{
    ref:'Employee',
    localField:'_id',
    foreignField:'subCatID',
});
module.exports = mongoose.model('EmployeeSubCat', EmployeeSubCatSchema);
