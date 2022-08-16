const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const rootDir = require('./util/path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use(shopRouter);

app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});

app.listen(3000);
