import { sign, verify } from "jsonwebtoken";
import { JWT_SECRETS } from "../constants";
export default class JWT {
  private static signToken(data: Object, secret: string, expiry: string) {
    return sign(data, secret, { expiresIn: expiry });
  }

  static accessToken(role: string, id: string) {
    return this.signToken(
      { role, id },
      JWT_SECRETS.access,
      JWT_SECRETS.accessTokenExpiry
    );
  }
  static verifyAccessToken(token: string) {
    return verify(token, JWT_SECRETS.access) as {
      role: string;
      id: string;
    };
  }
  static refreshToken(id: string, sessionId: string) {
    return this.signToken(
      { id, sessionId },
      JWT_SECRETS.refresh,
      JWT_SECRETS.refreshTokenExpiry
    );
  }
  static verifyRefreshToken(token: string) {
    return verify(token, JWT_SECRETS.refresh) as {
      id: string;
      sessionId: string;
    };
  }
}
