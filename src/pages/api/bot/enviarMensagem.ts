import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../lib/whatsappClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            // Lógica para enviar uma mensagem
            const { numeroTelefone, mensagem } = req.body;
            if (!numeroTelefone || !mensagem) {
                res.status(400).json({ message: 'Número de telefone e mensagem são obrigatórios' });
                return;
            }

            try {
                const numero = numeroTelefone.includes('@c.us') ? numeroTelefone : `${numeroTelefone}@c.us`;
                await client.sendMessage(numero, mensagem);
                res.status(200).json({ message: 'Mensagem enviada com sucesso' });
            } catch (error) {
                res.status(500).json({ message: 'Falha ao enviar mensagem', error });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Método ${method} não permitido`);
    }
}