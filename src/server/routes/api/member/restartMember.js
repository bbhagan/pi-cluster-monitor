import { Router as _Router } from "express";
import { errorLogger } from "../../../../util/errorLogger";
import { shutdownRestart } from "../../../../util/unixCommands";
import findWPTServerIP from "../../../services/findWPTServerIP";
import getWPTClusterDetails from "../../../services/getWPTClusterDetails";
import formatClusterDetails from "../../../../util/formatClusterDetails";

const router = _Router();

router.get("/:memberID", async (req, res) => {
	try {
		const WPTServer = await findWPTServerIP();
		const members = await getWPTClusterDetails(WPTServer);
		const formattedMembers = formatClusterDetails(members);

		const client = formattedMembers.find((member) => req.params.memberID === member.id);

		console.log(`formattedMembers: ${JSON.stringify(formattedMembers)}`);
		console.log(`req params: ${JSON.stringify(req.params.memberID)}`);
		console.log(`clientIP: ${client.ip}`);

		const execPromise = await shutdownRestart("restart", client.ip);

		return res.json({ statusCode: 200, statusMsg: "Ok" });
	} catch (error) {
		errorLogger(`Error restart.js router.get ${error}`);
		res.status(500);
		res.send(`Server Error`);
	}
});

export default router;
