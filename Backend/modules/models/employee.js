const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
    catID: { type: mongoose.Schema.ObjectId, require, ref: 'EmployeeCat' },
    subCatID: { type: mongoose.Schema.ObjectId, require, ref: 'EmployeeSubCat' },
    mobile: { type: String, required: true },
    fullName: { type: String },
    image: { type: String },
    ability: { type: String },
    instaPage: { type: String },
    experience: { type: String },
    workTime:{ type: String },
    token: { type: String },
    workNumber: { type: String },
    address: { type: String },
    location: { type: String },
    bio: { type: String },
    gallery: [{ path: String}],
    token: { type: String },
    type:{type:String,default:'employee'},
}, { toJSON: { virtuals: true } });
EmployeeSchema.virtual('EmployeeCat', {
    ref: 'EmployeeCat',
    localField: 'catID',
    foreignField: '_id',
});
EmployeeSchema.virtual('EmployeeSubCat', {
    ref: 'EmployeeSubCat',
    localField: 'subCatID',
    foreignField: '_id',
});

module.exports = mongoose.model('Employee', EmployeeSchema);
