import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { MONGODB_DB } from '../../config/constants';

const Fornecedor = async (
    req: NextApiRequest,
    res: NextApiResponse<any>) => {
    try {
        const client = await clientPromise;
        const db = await client.db(MONGODB_DB);
        const { nome } = req.body;
        switch (req.method) {
            case 'GET':
                const { id } = req.query;
                const data = id ?
                    await db.collection('itens').findOne({ _id: new ObjectId(id.toString()) }) :
                    await db.collection('itens').find().toArray();
                res.status(200).json(data);
                break;

            case "POST":
                try {
                    /* create a new model in the database */
                    res.status(201).json(await db.collection('itens').insertOne({ nome }));
                    break;
                } catch (error) {

                    res.status(400).json("status 400");
                    break;
                }
                break;

            case 'PUT':
                try {
                    const { id } = req.query;
                    res.status(200).json(await db.collection('itens').updateOne({ _id: new ObjectId(id.toString()) }, { $set: { nome } }).modifiedCount);
                    break;
                } catch (error) {
                    res.status(400).json("status 400");
                    break;
                }
                break;

            case 'DELETE':

                try {
                    const { id } = req.query;
                    res.status(200).json(await db.collection('itens').deleteOne({ _id: new ObjectId(id.toString()) }).deletedCount);
                    break;

                } catch (error) {
                    res.status(400).json("status 400");
                    break;
                }

            default:
                res.status(400).json("status 400");
                break;
        }
    } catch (error) {
        res.status(500).json(error);
    }

}

export default Fornecedor;

