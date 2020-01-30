const config = {
	uri: `http://${process.env.REACT_APP_SERVER_HOST || 'localhost'}:${process.env.REACT_APP_SERVER_PORT || 4000}/api`,
	endpoints: {
		account: {
			fetch: '/account',
			register: '/account/register',
			login: '/account/login',
			update: '/account/update',
		}
		
	},
};

export default config;