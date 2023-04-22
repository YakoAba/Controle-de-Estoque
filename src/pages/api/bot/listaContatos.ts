import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../lib/whatsappClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const contacts = await client.getContacts();
                res.status(200).json({ contacts });
            } catch (error) {
                res.status(500).json({ message: 'Falha ao obter contatos', error });
            }
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Método ${method} não permitido`);
    }
}
