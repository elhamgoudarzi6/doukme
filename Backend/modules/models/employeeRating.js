const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmployeeRatingSchema = new Schema({
    userID: { type:mongoose.Schema.ObjectId,require, ref:'User'},
    employeeID:{ type:mongoose.Schema.ObjectId,require, ref:'Employee'},
    rating: { type: Number },
},{toJSON:{virtuals:true}});
EmployeeRatingSchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
EmployeeRatingSchema.virtual('Employee',{
    ref:'Employee',
    localField:'employeeID',
    foreignField:'_id',
});
module.exports = mongoose.model('EmployeeRating', EmployeeRatingSchema);

