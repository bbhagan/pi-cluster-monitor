import { Router as _Router } from "express";
import { errorLogger } from "../../../util/errorLogger";
import getClusterMembers from "../../../util/getClusterMembers";
import { shutdownRestart } from "../../../util/unixCommands";

const router = _Router();

router.get("/", async (req, res) => {
	try {
		const allTheCommands = [];
		const members = await getClusterMembers();

		members.forEach((wptClient) => {
			if (wptClient.client !== 0) {
				const execPromise = shutdownRestart("shutdown", wptClient.IP);
				allTheCommands.push(execPromise);
			}
		});
		Promise.all(allTheCommands)
			.then((values) => {
				shutdownRestart("shutdown");
			})
			.catch((error) => {
				errorLogger(`Error shutdown.js router.get Error: at least one shutdown failed`);
			});

		return res.json({ statusCode: 200, statusMsg: "Ok" });
	} catch (error) {
		errorLogger(`Error shutdown.js router.get ${error}`);
		res.status(500);
		res.send(`Server Error`);
	}
});

export default router;
