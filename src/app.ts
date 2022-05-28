import express from "express";
import actuator from "express-actuator";
import { sendVerificationMail } from "./email";
import { morganMiddleware } from "./middleware";
import AppRouter from "./routes";

const app = express();

// Logging All The Data
app.use(morganMiddleware);

//  For Checking Health Of Application
app.use(actuator());

app.use("/", AppRouter);

export default app;
