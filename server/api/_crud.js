function create(service, request, response) {
	service.create(request.body, (result) => {
		response.json({
			success: result != null,
			results: result,
		});
	});
}

function update(service, request, response) {
	service.update(request.params.id, request.body, (result) => {
		response.json({
			success: result != null,
			results: result,
		});
	});
}

function removeById(service, request, response) {
	service.removeById(request.params.id, (result) => {
		response.json({
			success: result != null,
			results: result,
		});
	});
}

function fetch(service, request, response) {
	service.fetchAll(Object.assign({}, request.body, request.query), (result) => {
		response.json({
			success: result != null,
			results: result,
		});
	});
}

function fetchById(service, request, response) {
	service.fetchById(request.params.id, (result) => {
		response.json({
			success: result != null,
			results: result,
		});
	});
}

export default {
	create, update, removeById, fetch, fetchById,
};