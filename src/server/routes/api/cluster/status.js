import { Router as _Router } from "express";
import { errorLogger } from "../../../../util/errorLogger";
import getWPTClusterDetails from "../../../services/getWPTClusterDetails";
import findWPTServerIP from "../../../services/findWPTServerIP";
import formatClusterDetails from "../../../../util/formatClusterDetails";

const router = _Router();

router.get("/", async (req, res) => {
	try {
		let WPTServer = await findWPTServerIP();
		const serverClusterDetails = await getWPTClusterDetails(WPTServer);
		const formattedClusterDetails = formatClusterDetails(serverClusterDetails);

		return res.json({ statusCode: 200, statusMsg: "Ok", data: formattedClusterDetails });
	} catch (e) {
		errorLogger();
		return res.json({ statusCode: 500, statusMsg: `ERROR: ${e}` });
	}
});

export default router;
