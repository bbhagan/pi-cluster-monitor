import express from "express";
import fs from "fs";
import { consoleLogger } from "./src/util/consoleLogger";

//Middleware
import accessLogger from "./src/server/middleware/accessLogger";
import apiKeyChecker from "./src/server/middleware/apiKeyChecker";

//Routes
import shutdownCluster from "./src/server/routes/api/cluster/shutdownCluster";
import restartCluster from "./src/server/routes/api/cluster/restartCluster";
import status from "./src/server/routes/api/cluster/status";

import restartMember from "./src/server/routes/api/member/restartMember";
import shutdownMember from "./src/server/routes/api/member/shutdownMember";

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
router.use("/api/cluster/shutdown", shutdownCluster);
router.use("/api/cluster/restart", restartCluster);
router.use("/api/cluster/status", status);

router.use("/api/member/restart/", restartMember);
router.use("/api/member/shutdown/:memberID", shutdownMember);

router.use("/api/member/foo/:bar", function (req, res, next) {
  console.log(`bar: ${req.params.bar}`);
});

server.use(router);

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`Ready on http://localhost:${port}`);
});
