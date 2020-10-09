import fetch from "isomorphic-unfetch";
import { errorLogger } from "../../util/errorLogger";

export default async function (wptServer) {
	try {
		const wptDataResponse = await fetch(`http://${wptServer}//getTesters.php?f=json`);
		const wptData = await wptDataResponse.json();
		if (wptData.statusCode === 200) {
			//console.log(`getDetails returning ${JSON.stringify(wptData.data)}`);
			return wptData.data;
		} else {
			errorLogger(`Error getWPTClusterDetails.js getWPTClusterDetails Error: did not receive 200 response from WPT`);
			return {};
		}
	} catch (error) {
		errorLogger(`Error getWPTClusterDetails.js getWPTClusterDetails ${error}`);
		Promise.reject(error);
	}
}
