
const Controller = require(`${config.path.controller}/Controller`);
const randomstring = require('randomstring');
module.exports = new class PlanController extends Controller {
    registerPlan(req, res) {
        this.model.Plan({
            day: req.body.day,
            times: req.body.times,
            date: req.body.date,
            employeeID: req.body.employeeID
        }).save(err => {
            if (err) throw err;
            return res.json({
                data: ' با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    getAllPlanForEmployee(req, res) {
        this.model.Plan.find({ employeeID: req.params.id })
            .populate({ path: 'Employee', select: 'fullName mobile' }).exec((err, Result) => {
                if (err) throw err;
                if (Result) {
                    return res.json({
                        data: Result,
                        success: true
                    });
                }
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            });
    }


}


