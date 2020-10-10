import axios from "axios";
import { errorLogger } from "../../util/errorLogger";

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;

export default async function () {
  const options = { headers: { Authorization: API_KEY } };
  try {
    const clusterDetailsResponse = await axios.get(
      `http://${SERVER_HOST}:3000/api/cluster/status`,
      options
    );
    return clusterDetailsResponse;
  } catch (e) {
    errorLogger(`Error fetching cluster details from service`);
    return Promise.reject(e);
  }
}
