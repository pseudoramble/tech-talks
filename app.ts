import * as express from 'express';
import * as bodyParser from 'body-parser';

import { addTalk, getTalk } from './api/talks';

const app = express();
const port = 3141;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.warn(`Got request ${req}`);
    res.json({});
});

app.post('/api/add', (req, res) => {
    addTalk(req.body.url)
        .then(result => {
            res.send({ id: result.id });
        })
        .catch((err: Error) => {
            res
                .status(500)
                .send(`<h1>${err.message}</h1>\n`);
        });
});

app.get('/api/get/:v', (req, res) => {
    console.warn(req.params['v']);
    console.warn(req.params);

    getTalk(req.params['v'])
        .then(result => {
            res.download(result.path, result.name);
        })
        .catch((err: Error) => {
            res
                .status(500)
                .send(`<h1>${err.message}</h1>\n`);
        });
});

app.listen(port, () => {
    console.warn('App started');
});
