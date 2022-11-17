const express = require('express');
const bodyParser = require('body-parser');
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

module.exports = app;
