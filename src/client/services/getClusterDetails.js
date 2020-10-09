import axios from "axios";
import { errorLogger } from "../../util/errorLogger";

const SERVER_HOST = process.env.SERVER_HOST;

export default async function () {
	try {
		const clusterDetailsResponse = await axios.get(`http://${SERVER_HOST}:3000/api/cluster/status`);
		return clusterDetailsResponse;
	} catch (e) {
		errorLogger(`Error fetching cluster details from service`);
		return Promise.reject(e);
	}
}
