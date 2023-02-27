import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { catalogURL, MONGODB_DB } from "../config/constants";
import { PdvModule } from "../interfaces/Pdv.interface";
import { ProdutosClienteClass } from "./Produtos";
import { TokenApiResponseIfoodClass } from "./Token.class";

export class ProdutosServidorClass extends ProdutosClienteClass {

    static async DbOne({id}): Promise<PdvModule.ProdutosClienteInterface[]> {
        try {
            const client = await clientPromise;
            const db = await client.db(MONGODB_DB);
            const data  = await db.collection("produtos").findOne({ _id: new ObjectId(id) });
            return await data
        } catch (error) {
            console.error(`Erro ao obter produto do banco de dados: ${error}`);
        }
    }

    static async DbAll(): Promise<PdvModule.ProdutosClienteInterface[]> {
        try {
            const client = await clientPromise;
            const db = await client.db(MONGODB_DB);
            const data = await db.collection('produtos').find().toArray();
            return await data
        } catch (error) {
            console.error(`Erro ao obter produto do banco de dados: ${error}`);
        }
    }



    static async DbAllJson(): Promise<string> {
        try {
            return JSON.stringify(await ProdutosServidorClass.DbAll())
        } catch (error) {
            console.error(`Erro ao obter produto json do banco de dados: ${error}`);
        }
    }

    async IFoodAll() {
        const { getHeaders } = await TokenApiResponseIfoodClass.createInstance();
        const catalogDataResponse = await fetch(catalogURL, { headers: getHeaders() });
        return await catalogDataResponse.json();
    }

    async InsertDB(): Promise<any> {
        try {
            const client = await clientPromise;
            const db = await client.db(MONGODB_DB);
            return await db.collection('produtos').insertOne(this);
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
            return await db.collection('produtos').deleteOne({ nome: this.nome });
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}