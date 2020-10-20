//For error Pages
exports.get404=(req, res, next)=>{
    res.render('common/error-page.ejs')
    }