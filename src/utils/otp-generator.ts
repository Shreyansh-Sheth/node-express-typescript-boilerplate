import { customAlphabet } from "nanoid";
import { OTP_LENGTH } from "../constants";

export default function OtpGenerator() {
  return customAlphabet("ABCDEFGHJKMNPQRSTUVWXYZ123456789", OTP_LENGTH)();
}
