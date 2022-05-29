import express, { NextFunction, Request, Response } from "express";
import actuator from "express-actuator";
import { sendVerificationMail } from "./email";
import { morganMiddleware } from "./middleware";
import AppRouter from "./routes";
import useragent from "express-useragent";
import { logger } from "./utils";

const app = express();

// Logging All The Data
app.use(morganMiddleware);

// user agent checker
app.use(useragent.express());

//  For Checking Health Of Application
app.use(actuator());

// Error Log Whole App
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.log("error", err.stack);
  res.status(500).send("Something broke!");
});

app.use("/", AppRouter);

export default app;
