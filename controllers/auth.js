

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.isLoggedIn
    })
}

exports.postLogin = (req, res) => {
    res.redirect('/');
}