const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const index = require('../server/routes/index.route');

const app = express();

/* GET home page. */
app.get('/', (req, res) => {
    res.send(`get request from http://127.0.0.1:${config.port} (${config.env}) homepage`);
});

app.use('/api', index);

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// HTTP request logger middleware for node.js
app.use(morgan('dev'));

module.exports = app;
