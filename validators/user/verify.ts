import { z } from "zod";
import { OTP_LENGTH } from "../../src/constants";

const VerifyUserZod = z.object({
  email: z.string().email().max(50),
  password: z.string().min(6).max(50),
  otp: z.string().length(OTP_LENGTH),
});
export default VerifyUserZod;
