const config = {
	uri: `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/api`,
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
			getVolunteerInfo: '/volunteers/getVolunteerInfo',
			signup: '/account/volunteer/signup',
			fetch: '/volunteers',
			fetchByid: '/volunteers',
			update: '/volunteers/update',
			updateProfile: '/volunteers/updateProfile',
			
		},
		schools: {
			create: '/school/create',
			fetch: '/school',
			update: '/school/update',
			getSchoolInfo: '/school/getSchoolInfo'
		},	
		schoolPersonnels: {
			signup: '/account/school-personnel/signup',
			fetch: '/school-personnels',
			fetchByid: '/school-personnels',
			update: '/school-personnels/update',
			getPersonnelInfo: '/school-personnels/getPersonnelInfo'
		},
		team: {
			create: '/team/create',
			fetch: '/team',
			update: '/team/update',
			getTeamInfo: '/team/getTeamInfo',
			getTeamInfoSch: '/team/getTeamInfoSch'
		},
	}
};

export default config;
