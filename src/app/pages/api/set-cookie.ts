import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = serialize('token', 'secure_token_value', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ message: 'Cookie set successfully' });
}
