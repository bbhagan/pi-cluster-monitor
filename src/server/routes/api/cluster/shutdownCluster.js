import { Router as _Router } from "express";
import { errorLogger } from "../../../../util/errorLogger";
import { shutdownRestart } from "../../../../util/unixCommands";
import findWPTServerIP from "../../../services/findWPTServerIP";
import getWPTClusterDetails from "../../../services/getWPTClusterDetails";
import formatClusterDetails from "../../../../util/formatClusterDetails";

const router = _Router();

router.get("/", async (req, res) => {
	try {
		const allTheCommands = [];

		const WPTServer = await findWPTServerIP();
		const members = await getWPTClusterDetails(WPTServer);
		const formattedMembers = formatClusterDetails(members);

		formattedMembers.forEach((wptClient) => {
			const execPromise = shutdownRestart("shutdown", wptClient.ip);
			allTheCommands.push(execPromise);
		});
		Promise.all(allTheCommands)
			.then((values) => {
				shutdownRestart("shutdown");
			})
			.catch((error) => {
				errorLogger(`Error restart.js router.get Error: at least one restart failed`);
			});
		return res.json({ statusCode: 200, statusMsg: "Ok" });
	} catch (error) {
		errorLogger(`Error restart.js router.get ${error}`);
		res.status(500);
		res.send(`Server Error`);
	}
});

export default router;
