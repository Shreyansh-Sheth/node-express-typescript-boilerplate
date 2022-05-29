import { json, Router } from "express";
import { z } from "zod";
import { validateRequest, validateRequestBody } from "zod-express-middleware";
import { RegisterUserZod, VerifyUserZod } from "../../validators";
import { sendOtp } from "../email";
import JWT from "../services/jwt";
import {
  hashPassword,
  OtpGenerator,
  prisma,
  throwCustomValidationError,
} from "../utils";
const router = Router();
router.use(json());

router.post("/login", (req, res) => {
  // TODO check email and password are correct
  // TODO send verification code
});
router.post("/verify", validateRequestBody(VerifyUserZod), async (req, res) => {
  // TODO check the otp , email , password
  const { email, password, otp } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.sendStatus(403);
    return;
  }

  if (user?.otp !== otp) {
    res
      .status(400)
      .json(throwCustomValidationError("otp", "otp is not correct"));
    return;
  }

  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      isVerified: true,
      otp: null,
      lastOnline: new Date(),
    },
  });

  const session = await prisma.session.create({
    data: {
      ip: req.ip,
      browser: req.useragent?.browser,
      os: req.useragent?.os,
      device: req.useragent?.platform,
      lastRefreshedToken: new Date(),
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  //  if ok login the user
  const accessToken = JWT.accessToken(user.role, user.id);
  const refreshToken = JWT.refreshToken(user.id, session.id.toString());
  //  send user new access token

  // set access token to cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });
  res.json(refreshToken);
});

router.post(
  "/register",
  validateRequest({
    body: RegisterUserZod,
  }),
  async (req, res) => {
    //  check If User Exist
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user && user.isVerified) {
      res
        .status(400)
        .json(throwCustomValidationError("email", "user already exist"));
      return;
    }
    if (user && !user.isVerified) {
      await prisma.user.delete({
        where: {
          email: req.body.email,
        },
      });
    }

    //  send otp to user email
    const OTP = OtpGenerator();

    sendOtp(OTP, req.body.email);

    //  make user unverified and create new user object
    try {
      await prisma.user.create({
        data: {
          email: req.body.email,
          lastOnline: new Date(),
          name: req.body.name,
          password: hashPassword(req.body.password),
          otp: OTP,
        },
      });
    } catch (e) {
      console.log(e);
    }
    res.sendStatus(200);
  }
);

router.post("/refresh", async (req, res) => {
  // send user new refresh and access tokens
  const refreshToken = req.body.refreshToken;
  const verifiedToken = JWT.verifyRefreshToken(refreshToken);
  const session = await prisma.session.findUnique({
    where: { id: verifiedToken.sessionId },
    include: {
      user: true,
    },
  });
  if (session?.blocked) {
    res.clearCookie("accessToken");
    res.sendStatus(403);
    return;
  }
  if (
    session?.ip === req.ip &&
    session.browser === req.useragent?.browser &&
    session.device === req.useragent.platform &&
    session.os === req.useragent.os
  ) {
    // set new access token on cookie and new refresh token onto body
    const accessToken = JWT.accessToken(session.user.role, session.user.id);
    const refreshToken = JWT.refreshToken(session.user.id, session.id);
    // add new last refreshed token data
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        lastRefreshedToken: new Date(),
      },
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.json(refreshToken);
  } else {
    res.sendStatus(403);
  }
});

router.get("/logout", (req, res) => {
  // Remove access token from user cookie
  res.clearCookie("accessToken");
  res.sendStatus(200);
});
export default router;
