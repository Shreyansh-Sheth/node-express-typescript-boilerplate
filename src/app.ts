import express from "express";
import { PrismaClient } from "@prisma/client";
import actuator from "express-actuator";
import { logger } from "./utils";
import morgan from "morgan";
import { morganMiddleware } from "./middleware";

const prisma = new PrismaClient();
//
const app = express();

app.use(morganMiddleware);

app.use(actuator());

app.get("/", (req, res) => {
  logger.error("Hello WOrld");
  res.send("Hello");
});

export default app;
