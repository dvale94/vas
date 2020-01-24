import mongoose from 'mongoose';
import {Severity, log} from '../utils/logger';

const onError = (error) => {
	log(`Mongo connection error: ${error}`, Severity.Error);
	process.exit(1);
};

const connect = (uri) => {
	mongoose.connection.on('error', onError);
	return mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
		.then(() => {
			log('Mongo successfully connected', Severity.Success);
		});
};

export default {connect};