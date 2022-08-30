

exports.getLogin = (req, res) => {
    // const isLoggedIn = 
    //     req.get('Cookie')
    //     .split(';')[0]
    //     .trim()
    //     .split('=')[1] === 'true';

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}

exports.postLogin = (req, res) => {
    res.setHeader('Set-Cookie', 'loggedIn=true;HttpOnly');
    res.redirect('/');
}