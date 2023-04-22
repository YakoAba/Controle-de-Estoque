import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { MONGODB_DB } from "../config/constants";
import { ClienteClass } from "./ClienteClass";


export class ClientesServidorClass extends ClienteClass {

    static async DbOne({id}): Promise<any> {
        try {
            const client = await clientPromise;
            const db = await client.db(MONGODB_DB);
            const data  = await db.collection("mensagens").findOne({ _id: new ObjectId(id) });
            return await data
        } catch (error) {
            console.error(`Erro ao obter produto do banco de dados: ${error}`);
        }
    }

    static async DbAll(): Promise<any> {
        try {
            const client = await clientPromise;
            const db = await client.db(MONGODB_DB);
            const data = await db.collection('mensagens').find().toArray();
            return await data
        } catch (error) {
            console.error(`Erro ao obter produto do banco de dados: ${error}`);
        }
    }



    static async DbAllJson(): Promise<string> {
        try {
            return JSON.stringify(await ClientesServidorClass.DbAll())
        } catch (error) {
            console.error(`Erro ao obter produto json do banco de dados: ${error}`);
        }
    }


    async InsertDB(): Promise<any> {
        try {
            const client = await clientPromise;
            const db = await client.db(MONGODB_DB);
            return await db.collection('mensagens').insertOne(this);
        } catch (error) {
            console.error(error);
            return error;
        }
    }


    // async editDB(): Promise<PdvModule.ProdutosClienteInterface> {
    //     try {
    //         const client = await clientPromise;
    //         const db = await client.db(MONGODB_DB);
    //         const data  = await db.collection("produtos").findOne({ _id: new ObjectId(id) });
 
    //         return await data
    //     } catch (error) {
    //         console.error(`Erro ao obter produto do banco de dados: ${error}`);
    //     }
    // }

    async deleteDB(): Promise<any> {
        try {
            const client = await clientPromise;
            const db = await client.db(MONGODB_DB);
            return await db.collection('mensagens').deleteOne({ nome: this.nome });
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}