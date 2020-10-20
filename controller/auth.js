const User = require('../model/user')
const bcrypt = require('bcryptjs')

//For Registering a user
exports.postSignUp = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const roles = req.body.roles;
    const password = req.body.password;
    console.log("role" + roles);
    User.findOne({ where: { email: email } })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/register')
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        username: username,
                        email: email,
                        roles: roles,
                        password: hashedPassword
                    })
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login')
                    console.log(result);
                });
        })
        .catch(err => {
            console.log(err);
        });
}

//For User Login
exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const roles = req.body.roles;
    req.session.email = req.body.email;
    req.session.roles = req.body.roles;


    User.findOne({
        where: {
            email: email,
            roles: roles
        }
    })
        .then(user => {
            req.session.uid = user.id
            console.log("user obj" + JSON.stringify(user))
            if (!user) {
                return res.redirect('/login')
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {

                        req.session.isLoggedIn = true;
                        req.session.user = user;


                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/shop')
                            console.log("hello");
                        })

                    }
                    res.redirect('/login')
                })

        })


}