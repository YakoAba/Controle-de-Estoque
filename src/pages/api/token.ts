import type { NextApiRequest, NextApiResponse } from 'next';
import { TokenApiResponseIfoodClass } from '../../classes/Token.class';
import { TokenApiResponseIfoodInterface } from '../../interfaces/Token.interface';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenApiResponseIfoodInterface>
) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(await TokenApiResponseIfoodClass.createInstance());
      break;
    default:
      res.status(400).json({ success: false, accessToken: null, expiresIn: null, createdAt: null, type: null });
      break;
  }
}
