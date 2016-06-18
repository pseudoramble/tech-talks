"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const talks_1 = require('./api/talks');
const app = express();
const port = 3141;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    console.warn(`Got request ${req}`);
    res.json({});
});
app.post('/api/add', (req, res) => {
    talks_1.addTalk(req.body.url)
        .then(result => {
        res.send({ id: result.id });
    })
        .catch((err) => {
        res
            .status(500)
            .send(`<h1>${err.message}</h1>\n`);
    });
});
app.get('/api/get/:v', (req, res) => {
    console.warn(req.params['v']);
    console.warn(req.params);
    talks_1.getTalk(req.params['v'])
        .then(result => {
        res.download(result.path, result.name);
    })
        .catch((err) => {
        res
            .status(500)
            .send(`<h1>${err.message}</h1>\n`);
    });
});
app.listen(port, () => {
    console.warn('App started');
});
