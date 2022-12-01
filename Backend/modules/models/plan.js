const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlanSchema = new Schema({
    day: { type: String, required: true },
    times:[{ time: String, status: Boolean }],
    date:{ type: String, required: true },
    employeeID:{ type:mongoose.Schema.ObjectId,require, ref:'Employee'},
    closed:{ type: Boolean, default: false }
},{timestamps:true,toJSON:{virtuals:true}});
PlanSchema.virtual('Employee',{
    ref:'Employee',
    localField:'employeeID',
    foreignField:'_id',
});
module.exports = mongoose.model('Plan', PlanSchema);