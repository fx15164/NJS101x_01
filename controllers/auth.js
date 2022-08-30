const session = require("express-session");
const user = require("../models/user");


exports.getLogin = (req, res) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postLogin = (req, res) => {
    user.findOne()
        .then(user => {
            req.session.isLoggedIn = true,
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => console.log(err));
}

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}