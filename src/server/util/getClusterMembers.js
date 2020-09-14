import fetch from "isomorphic-unfetch";
import { errorLogger } from "./errorLogger";
const IP_LISTENER_AUTH_KEY = process.env.IP_LISTENER_AUTH_KEY;
const IP_LISTENER_URL = process.env.IP_LISTENER_URL;
const ipListenerOptions = { headers: { Authorization: `${IP_LISTENER_AUTH_KEY}` } };

export default async function () {
	try {
		const response = await fetch(IP_LISTENER_URL, ipListenerOptions);
		const ipJSON = await response.json();
		if (ipJSON && ipJSON.data) {
			return ipJSON.data;
		} else {
			errorLogger(`Error getClusterIPs.js getClusterIPs Error: No client IP data`);
			Promise.reject("Error: No client IP data");
		}
	} catch (error) {
		errorLogger(`Error getClusterIPs.js getClusterIPs ${error}`);
		Promise.reject(error);
	}
}
