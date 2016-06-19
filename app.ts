import * as express from 'express';
import * as bodyParser from 'body-parser';

import { addTalk, getTalk, getAllTalks } from './api/talks';

const app = express();
const port = 3141;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    getAllTalks()
        .then(entries => {
            res.render('index', { pageTitle: 'Tech Talks To Try Today!', talks: entries });
        })
        .catch((err: Error) => {
            res
                .status(500)
                .send(`<h1>${err.message}</h1>\n`);
        });
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
