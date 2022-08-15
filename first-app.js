const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

const rootDir = require('./util/path');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use((req, res) => {
    res.status(404).sendFile(path.join(rootDir, '/views/404.html'));
});


app.listen(3000);
