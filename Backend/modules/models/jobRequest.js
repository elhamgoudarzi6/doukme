const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobRequestSchema = new Schema({
    jobCatID: { type: mongoose.Schema.ObjectId, require, ref: 'JobCat' },
    mobile: { type: String, required: true },
    fullName: { type: String },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
    cvFile: { type: String },
    degreeFile: { type: String },
    nationalCodeFile: { type: String },
    nationalCode: { type: String },
    bio: { type: String },
    status: { type: Boolean, default: false },
    result: { type: Boolean, default: false },
}, { timestamps: true, toJSON: { virtuals: true } });
JobRequestSchema.virtual('JobCat', {
    ref: 'JobCat',
    localField: 'jobCatID',
    foreignField: '_id',
});
module.exports = mongoose.model('JobRequest', JobRequestSchema);
