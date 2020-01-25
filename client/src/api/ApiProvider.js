import request from 'request';
import serverConf from '../config'

class ApiProvider {

	login(form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.account.login}`;

		request.post(endpoint, { form }, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	

}

export const api = new ApiProvider();
