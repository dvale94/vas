import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Severity, log} from './utils/logger';
import db from './services/db.js';
import api from './api';
import config from './config/config';
import passport from './config/passport'

const app = express();

// passport middleware
app.use(passport.initialize());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("../../html"))

app.use('/api', api);

app.listen(config.port, () => {
    log(`VAS server now up on http://localhost:${config.port}`, Severity.Success);
    const dbUri = `mongodb://${config.db.username}:${config.db.password}@${config.db.url}/${config.db.name}`
    db.connect(dbUri);
});