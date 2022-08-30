const session = require("express-session");


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
    req.session.isLoggedIn = true;
    res.setHeader('Set-Cookie', 'loggedIn=true;HttpOnly');
    res.redirect('/');
}