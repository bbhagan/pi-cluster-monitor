import { errorLogger } from "./errorLogger";

const fileName = "formatClusterDetails.js";

export default function (clusterDetailsObj) {
	let formattedClusterDetails = [];
	//Basic data checking
	if (typeof clusterDetailsObj === "object") {
		for (const [key, value] of Object.entries(clusterDetailsObj)) {
			value.testers.forEach((tester) => {
				formattedClusterDetails.push({
					id: tester.pc,
					ip: tester.ip,
					version: tester.version,
					upMinutes: tester.upminutes,
					busy: tester.busy,
					offline: tester.offline,
					location: key,
				});
			});
		}

		formattedClusterDetails.sort((a, b) => {
			return a.id < b.id ? -1 : 1;
		});
	} else {
		errorLogger(`Error ${fileName} formatClusterDetails Error: input is not an object`);
	}
	return formattedClusterDetails;
}
