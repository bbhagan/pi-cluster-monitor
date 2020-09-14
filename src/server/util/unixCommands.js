const { exec } = require("child_process");

const RESTART_COMMAND = process.env.RESTART_COMMAND;
const SHUTDOWN_COMMAND = process.env.SHUTDOWN_COMMAND;
const UNIX_USER = process.env.UNIX_USER;

export const shutdownRestart = (method, remoteIP) => {
	const execPromise = new Promise((resolve, reject) => {
		const ssh = remoteIP ? `ssh ${UNIX_USER}@${remoteIP}` : "";
		const command = method === "restart" ? RESTART_COMMAND : SHUTDOWN_COMMAND;

		console.log(`total command: ${ssh} ${command}`);

		exec(`${ssh} ${command}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error.message: ${error.message}`);
				if (!error.message.indexOf(`Connection to ${remoteIP} closed by remote host`)) {
					console.log("reject");
					errorLogger(`Error restart.js router.get Error: could not shut down ${wptClient.IP}`);
					reject("Restart failed");
				} else {
					console.log("resolve");
					resolve();
				}
				return;
			}
			if (stderr) {
				errorLogger(`Error restart.js router.get Error: stderr`);
				reject("stderr");
				return;
			}
			resolve();
		});
	});
	return execPromise;
};
