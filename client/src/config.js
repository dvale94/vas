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
			signup: '/account/admin/signup',
			update: '/admin/update',
			fetch: '/admin',
			fetchByid: '/admin',
		},
		volunteers: {
			signup: '/account/volunteer/signup',
			fetch: '/volunteers',
			fetchByid: '/volunteers',
			update: '/volunteers/update',
			updateProfile: '/volunteers/updateProfile',
			getVolunteerInfo: '/volunteers/getVolunteerInfo'
		},
		schools: {
			create: '/school/create',
			fetch: '/school',
			update: '/school/update',
		},	
		schoolPersonnels: {
			signup: '/account/school-personnel/signup',
			fetch: '/school-personnels',
			fetchByid: '/school-personnels',
			update: '/school-personnels/update',
		},
		team: {
			create: '/team/create',
			fetch: '/team',
			update: '/team/update',
			getTeamInfo: '/team/getTeamInfo'
		},
	}
};

export default config;
