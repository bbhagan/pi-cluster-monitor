import { Router as _Router } from "express";
import { errorLogger } from "../../../../util/errorLogger";
import { shutdownRestart } from "../../../../util/unixCommands";

const router = _Router();
router.get("/", async (req, res) => {
  try {
    const memberIP = members.forEach((wptClient) => {
      if (wptClient.client !== 0) {
        const execPromise = shutdownRestart("restart", wptClient.IP);
        allTheCommands.push(execPromise);
      }
    });
    Promise.all(allTheCommands)
      .then((values) => {
        shutdownRestart("restart");
      })
      .catch((error) => {
        errorLogger(
          `Error restart.js router.get Error: at least one restart failed`
        );
      });

    return res.json({ statusCode: 200, statusMsg: "Ok" });
  } catch (error) {
    errorLogger(`Error restart.js router.get ${error}`);
    res.status(500);
    res.send(`Server Error`);
  }
});

export default router;
