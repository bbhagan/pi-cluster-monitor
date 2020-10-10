import moment from "moment";

const serverLogger = (req, res, next) => {
  console.log(typeof req);
  console.log(
    `${moment().format()} ${req.ip} ${req.method} ${req.originalUrl} ${req.get(
      "User-Agent"
    )}`
  );

  next();
};
export default serverLogger;
