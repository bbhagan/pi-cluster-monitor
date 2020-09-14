import { Router as _Router } from "express";
import { errorLogger } from "../../../util/errorLogger";
import getClusterMembers from "../../../util/getClusterMembers";
import getWPTClusterDetails from "../../../util/getWPTClusterDetails";

const router = _Router();

router.get("/", async (req, res) => {
	const members = await getClusterMembers();
	let WPTServer = "";
	members.forEach((member) => {
		if (member.client === 0) {
			WPTServer = member.IP;
		}
	});
	const clusterDetails = await getWPTClusterDetails(WPTServer);

	console.log(`clusterDetails: ${JSON.stringify(clusterDetails)}`);
	return res.json({ statusCode: 200, statusMsg: "Ok" });
});

export default router;
