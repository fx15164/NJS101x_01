const session = require("express-session");
const user = require("../models/user");


exports.getLogin = (req, res) => {
    // const isLoggedIn = 
    //     req.get('Cookie')
    //     .split(';')[0]
    //     .trim()
    //     .split('=')[1] === 'true';
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
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
        console.log(err);
        res.redirect('/');
    });
}