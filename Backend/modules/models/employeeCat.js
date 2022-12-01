const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmployeeCatSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String},
},{toJSON:{virtuals:true}});
EmployeeCatSchema.virtual('EmployeeSubCat',{
    ref:'EmployeeSubCat',
    localField:'_id',
    foreignField:'catID',
});

module.exports = mongoose.model('EmployeeCat', EmployeeCatSchema);
