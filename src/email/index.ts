import { readFileSync } from "fs";
import { logger } from "../utils";
import ejs from "ejs";

// const verificationMailTemplate = readFileSync(
//   `${__}\\templates\\magic-link.ejs`
// ).toString();

export function sendVerificationMail(link: string, to: string) {
  const template = ejs.compile("", {});
  logger.log("info", template({ link }));
}
export function sendOtp(otp: string, to: string) {
  logger.log("info", `OTP: ${otp} to ${to}`);
}
