const config = {
	uri: `http://${process.env.REACT_APP_SERVER_HOST || 'localhost'}:${process.env.REACT_APP_SERVER_PORT || 4000}/api`,
	endpoints: {
		account: {
			fetch: '/account',
			register: '/account/register',
			login: '/account/login',
			update: '/account/update',
		},
		admin: {
			update: '/admin/update',
			fetch: '/admin',
		},
		volunteers: {
			signup: '/account/volunteer/signup',
			fetch: '/volunteers',
			register: '/volunteers/register',
			update: '/volunteers/update',
		},
		schools: {
			create: '/school/create',
			fetch: '/school',
			update: '/school/update',
		}
		
	},
};

export default config;
