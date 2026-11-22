
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

// 秘密鍵を取得する関数
function getSecret() {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error('環境変数JWT_SECRETが設定されていません。');
  }

  return new TextEncoder().encode(secretKey);
}

// トークンを生成する関数
export function generateToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(getSecret());
}

// トークンを検証する関数
export async function verifyToken(
  token: string
): Promise<JWTPayload | null> {
  // 設定漏れは認証エラーとして隠さず、明示的にエラーにする
  const secret = getSecret();

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (err) {
    console.error('jwtVerify失敗：', err);
    return null;
  }
}
