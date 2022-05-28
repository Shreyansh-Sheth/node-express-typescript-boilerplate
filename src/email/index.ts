import { readFileSync } from "fs";
import { logger } from "../utils";
import ejs from "ejs";

const verificationMailTemplate = readFileSync(
  `${__dirname}\\templates\\magic-link.ejs`
).toString();

export function sendVerificationMail(link: string, to: string) {
  const template = ejs.compile(verificationMailTemplate, {});
  logger.log("info", template({ link }));
}
