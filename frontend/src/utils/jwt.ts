import jwt, { JwtPayload } from 'jsonwebtoken';

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: '24h',
};

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
  const secretKey = Buffer.from(process.env.JWT_SECRET!, 'base64');
  const token = jwt.sign(payload, secretKey!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secretKey = Buffer.from(process.env.JWT_SECRET!, 'base64');
    const decoded = jwt.verify(token, secretKey!);
    return decoded as JwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
