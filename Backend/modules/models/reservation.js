const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReservationSchema = new Schema({
    time: { type: String, required: true },
    date: { type: String, required: true },
    userID: { type: mongoose.Schema.ObjectId, require, ref: 'User' },
    employeeID: { type: mongoose.Schema.ObjectId, require, ref: 'Employee' },
}, { toJSON: { virtuals: true } });
ReservationSchema.virtual('Employee', {
    ref: 'Employee',
    localField: 'employeeID',
    foreignField: '_id',
});
ReservationSchema.virtual('User', {
    ref: 'User',
    localField: 'userID',
    foreignField: '_id',
});
module.exports = mongoose.model('Reservation', ReservationSchema);