import { z } from "zod";

const RegisterUserZod = z.object({
  email: z.string().email().max(50),
  password: z.string().min(6).max(50),
  name: z.string().min(3).max(20),
});
export default RegisterUserZod;
