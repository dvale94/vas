import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Severity, log} from './utils/logger';
import db from './services/db.js';
import api from './api';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.use('/api', api);

app.get('/', (req, res) => {
	res.send('Hello There!');
});

app.listen(port, () => {
    log(`VAS server now up on http://localhost:${port}`, Severity.Success);
    //const dbUri = 'mongodb+srv://dvale030:senproj123@vas-pldhv.mongodb.net/test?retryWrites=true&w=majority' // OLD Cluster
    const dbUri = 'mongodb+srv://dvale030:senproj123@vas-cluster-pldhv.azure.mongodb.net/test?retryWrites=true&w=majority'
    db.connect(dbUri);
});