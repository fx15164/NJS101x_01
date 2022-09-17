const session = require("express-session");
const User = require("../models/user");


exports.getLogin = (req, res) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postLogin = (req, res) => {
    User.findOne()
        .then(user => {
            req.session.isLoggedIn = true,
            req.session.user = user;
            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            })
        })
        .catch(err => console.log(err));
}

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}

exports.getSignup = (req, res) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Sign Up',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postSignup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/signup');
            } 
            const user = new User({
                email,
                password
            });
            return user.save();
        })
        .then(result => {
            return res.redirect('/login')
        })
        .catch(err => {
            console.log(err);
        })
}