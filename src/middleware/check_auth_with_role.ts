import { NextFunction } from "express";

export default function checkAuthWithRole(role: String) {
  return async (
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ) => {
    // TODO take refresh token from cookie
    // TODO take access token from header
    // TODO get user role from redis
    // TODO send 407 if not correct auth token
    // TODO 401 if not auth token
  };
}
