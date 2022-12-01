const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryController extends Controller {
        getAllUser(req, res) {
        this.model.User.find({},{token:0} ,(err, User) => {
            if (User) {
                return res.json({
                    data: User,
                    success: true
                })
            }
            res.json({
                data: 'کاربر یافت نشد',
                success: false
            })
        })
    }
    
    getAllEmployeeCat(req, res) {
        this.model.EmployeeCat.find()
        .populate({ path: 'EmployeeSubCat', populate: { path: 'Employee' } })
            .exec((err, Result) => {
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
