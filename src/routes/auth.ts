import { prisma, PrismaClient } from "@prisma/client";
import { getPrismaClient } from "@prisma/client/runtime";
import { json, Router } from "express";
const router = Router();
router.use(json());

router.post("/login", (req, res) => {
  // TODO check email and password
  // TODO if not verified send error stating he is not verified or account is not created
  // TODO send user new access token
});
router.post("/verify", (req, res) => {
  // TODO check the otp , email , password
  // TODO if ok login the user
  //  TODO send user new access token
});

router.post("/register", (req, res) => {
  // TODO send otp to user email
  //   make user unverified and create new user object
});

router.post("/refresh", (req, res) => {
  // send user new refresh and access tokens
});

router.get("/logout", (req, res) => {
  // Remove access token from user
});
export default router;
