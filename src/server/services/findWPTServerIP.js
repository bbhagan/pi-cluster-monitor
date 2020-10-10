import fetch from "isomorphic-unfetch";
import { errorLogger } from "../../util/errorLogger";
const IP_LISTENER_AUTH_KEY = process.env.IP_LISTENER_AUTH_KEY;
const IP_LISTENER_URL = process.env.IP_LISTENER_URL;
const ipListenerOptions = {
  headers: { Authorization: `${IP_LISTENER_AUTH_KEY}` },
};

const fileName = "findWPTServerIP.js";

export default async function () {
  try {
    const response = await fetch(IP_LISTENER_URL, ipListenerOptions);
    const ipJSON = await response.json();
    if (ipJSON && ipJSON.data) {
      const serverClient = ipJSON.data.find((client) => client.client === 0);
      return serverClient.IP;
    } else {
      errorLogger(`Error ${fileName} findWPTServerIP Error: No client IP data`);
      Promise.reject("Error: No client IP data");
    }
  } catch (error) {
    errorLogger(`Error ${fileName} findWPTServerIP ${error}`);
    Promise.reject(error);
  }
}
