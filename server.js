import express from "express";
import fs from "fs";
import { consoleLogger } from "./src/server/util/consoleLogger";

//Middleware
import accessLogger from "./src/server/middleware/accessLogger";
import apiKeyChecker from "./src/server/middleware/apiKeyChecker";

//Routes
import shutdown from "./src/server/routes/api/cluster/shutdown";

const server = express();
const router = express.Router();
const port = parseInt(process.env.EXPRESS_PORT, 10) || 8000;
const LOGS_DIR = process.env.LOGS_DIR;

//Make sure logs dir exists
try {
	fs.statSync(LOGS_DIR).isDirectory();
} catch (e) {
	try {
		fs.mkdir(LOGS_DIR, () => {
			consoleLogger(`Made logs dir: ${LOGS_DIR}`);
		});
	} catch (createDirError) {
		consoleLogger(`server.js cannot create logs dir ${createDirError}`);
	}
}

//Logging
server.use(accessLogger);
//API Key Checker middleware
server.use(apiKeyChecker);

//Body Parser
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(router);

//Body Parser
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//Routes
router.use("/api/cluster/shutdown", shutdown);

server.use(router);

server.listen(port, (err) => {
	if (err) throw err;
	console.log(`Ready on http://localhost:${port}`);
});
