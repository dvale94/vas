import dotenv from 'dotenv';

dotenv.config();

const config = {
	port: process.env.PORT || 4000,
	db: {
		username: process.env.MONGODB_USERNAME || '',
		password: process.env.MONGODB_PASSWORD || '',
		url: process.env.MONGODB_URL || '',
		name: process.env.MONGODB_TABLE_NAME || '',
	},
	secretOrKey: 'yee',

};

export default config;