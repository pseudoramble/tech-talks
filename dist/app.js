"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const addTalk_1 = require('./api/addTalk');
const app = express();
const port = 3141;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    console.warn(`Got request ${req}`);
    res.json({});
});
app.post('/api/add', (req, res) => {
    addTalk_1.addTalk(req.body.url)
        .then(result => {
        res.send({ id: result.id });
    })
        .catch((err) => {
        res
            .status(500)
            .send(`<h1>${err.message}</h1>\n`);
    });
});
app.get('/api/add', (req, res) => {
    res.status(500).send('<h1>Oops! You probably meant to POST to /api/add</h1>\n');
});
app.listen(port, () => {
    console.warn('App started');
});
