const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const mongodbStore = require('connect-mongodb-session')(session);

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./models/user');

const app = express();

const MONGODB_URL = 'mongodb+srv://admin:admin@asm1.yjqy9ym.mongodb.net/?retryWrites=true&w=majority';

const store = new mongodbStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(session({ 
    secret: 'scr', 
    resave: false, 
    saveUninitialized: false,
    store: store
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(csrfProtection);

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URL)
    .then(result => {
        app.listen(3000);
    })
    .catch(e => {
        console.log(e);
    })
