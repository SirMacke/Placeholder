const mongoose = require('mongoose');
const express = require('express');
var app = express();
const { PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bucketListItemRoutes = require('./routes/api/bucketListItems');
const path = require('path');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/api/bucketListItems', bucketListItemRoutes);

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err));

/*
require('./startup/logging.js')();
require('./startup/routes.js')(app);
require('./startup/db.js')();
require('./startup/config.js')();
require('./startup/validation.js')();
require('./startup/prod.js')(app);
*/

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

var port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;