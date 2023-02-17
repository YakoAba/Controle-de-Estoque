import clientPromise from "../../lib/mongodb";
import { MONGODB_DB } from "../config/constants";
import { PdvModule } from "../interfaces/Pdv.interface";
import { TokenApiResponseIfoodClass } from "./Token.class";
import { catalogURL } from "../config/constants"

export class ProdutosPdvClass implements PdvModule.ProdutosInterface {
    porcentagem: number
    peso: number
    venda: PdvModule.VendaInterface
    nome: string
    image: string
    ingredientes: PdvModule.IngredienteInteface[]

    async DbAll(): Promise<PdvModule.ProdutosInterface[]> {
        try {
            const client = await clientPromise;
            const db = await client.db(MONGODB_DB);
            const data = await db.collection('produtos').find().toArray();
            return data
        } catch (error) {
            console.error(`Erro ao obter produto do banco de dados: ${error}`);
        }
    }

    async IFoodAll() {
        const { getHeaders, temTokenAtivo } = await TokenApiResponseIfoodClass.createInstance();
        const catalogDataResponse = await fetch(catalogURL, { headers: getHeaders() });
        return await catalogDataResponse.json();
    }

    // async insertDB(): Promise<any> {
    //     try {
    //         const client = await clientPromise;
    //         const db = await client.db(MONGODB_DB);
    //         return await db.collection('produtos').insertOne(this);
    //     } catch (error) {
    //         console.error(error);
    //         return error;
    //     }
    // }

    // async deleteDB(): Promise<any> {
    //     try {
    //         const client = await clientPromise;
    //         const db = await client.db(MONGODB_DB);
    //         return await db.collection('produtos').deleteOne({ createdAt: this.createdAt });
    //     } catch (error) {
    //         console.error(error);
    //         return error;
    //     }
    // }

}