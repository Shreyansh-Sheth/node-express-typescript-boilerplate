import {} from "jsonwebtoken";
export default class JWT {
  private static signToken(data: Object, secret: string, expiry: string) {}

  static accessToken() {}
  static verifyAccessToken() {}
  static refreshToken() {}
  static verifyRefreshToken(token: string) {}
}
