import { Router as _Router } from "express";
import { errorLogger } from "../../../util/errorLogger";

const router = _Router();

router.get("/", async (req, res) => {
	try {
		console.log("Ok");

		return res.json({ statusCode: 200, statusMsg: "Ok" });
	} catch (error) {
		errorLogger(`getIPs error ${error}`);
		res.status(500);
		res.send(`Server Error`);
	}
});

export default router;
