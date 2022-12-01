const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ReservationController extends Controller {
    registerReservation(req, res) {
        this.model.Reservation({
            time: req.body.time,
            date: req.body.date,
            userID: req.body.userID,
            employeeID: req.body.employeeID,
        }).save(err => {
            if (err) throw err;
            return res.json({
                data: ' با موفقیت ثبت  شد',
                success: true
            });
        });
    }

}
