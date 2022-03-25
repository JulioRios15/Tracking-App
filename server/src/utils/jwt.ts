import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey" | "adminTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = config.get<string>(keyName)

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey" | "adminTokenPublicKey"
): T | null {
  const publicKey = config.get<string>(keyName);

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}