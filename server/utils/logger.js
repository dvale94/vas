const LogSeverity = {
	Info: 0,
	Warning: 1,
	Error: 2,
	Success: 3,
};

const log = (message, severity) => {
	switch (severity) {
	case LogSeverity.Info:
		// eslint-disable-next-line no-console
		console.log(`\x1b[1;97m${message}\x1b[0m`);
		break;
	case LogSeverity.Warning:
		// eslint-disable-next-line no-console
		console.log(`\x1b[1;93m${message}\x1b[0m`);
		break;
	case LogSeverity.Error:
		// eslint-disable-next-line no-console
		console.log(`\x1b[1;91m${message}\x1b[0m`);
		break;
	case LogSeverity.Success:
		// eslint-disable-next-line no-console
		console.log(`\x1b[1;92m${message}\x1b[0m`);
		break;
	default:
		// eslint-disable-next-line no-console
		console.log(`\x1b[1;97m${message}\x1b[0m`);
		break;
	}
};

export { LogSeverity as Severity, log };