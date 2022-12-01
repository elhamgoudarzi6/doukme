const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobCatSchema = new Schema({
    title: { type: String, required: true },
});
module.exports = mongoose.model('JobCat', JobCatSchema);
