const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CvpackSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
},{timestamps:true});
module.exports = mongoose.model('Cvpack', CvpackSchema);