import type { NextApiRequest, NextApiResponse } from 'next';
import { TokenApiResponseIfoodClass } from '../../classes/Token.class';
import { TokenApiResponseIfoodInterface } from '../../interfaces/Token.interface';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenApiResponseIfoodInterface>
) {

  const Nulo: TokenApiResponseIfoodInterface = { success: false, accessToken: null, expiresIn: null, createdAt: null, type: null, from: "Ifood" };
  const token = await TokenApiResponseIfoodClass.createInstance();
  try {
    switch (req.method) {
      case 'GET':
        res.status(200).json(token);
        break;
      default:
        res.status(400).json(Nulo);
        break;
    }
  } catch (error) {
    res.status(500).json(error);
  }
}