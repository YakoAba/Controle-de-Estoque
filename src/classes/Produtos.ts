import clientPromise from "../../lib/mongodb";
import { catalogURL, MONGODB_DB } from "../config/constants";
import { PdvModule } from "../interfaces/Pdv.interface";
import { TokenApiResponseIfoodClass } from "./Token.class";

export class ProdutosClienteClass implements PdvModule.ProdutosClienteInterface {
    _id: string
    porcentagem: number
    peso: number
    nome: string
    image: string
    venda: PdvModule.VendaInterface
    ingredientes: PdvModule.IngredienteInteface[]

    constructor() {
        this.ingredientes = []
        this.venda = { bruto: null, liquido: null, taxa: null, custo: null, lucro: null, porcentagem: null }
    }

    static async createInstance() {
        return new ProdutosClienteClass;
    }

    async deleteDB({id}): Promise<any> {
        async function postData() {
            const response = await fetch(`http://localhost:3000/api/produtos?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.json();
        }
        try {
            console.log(this);
            return await postData();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async InsertDB(): Promise<any> {
        async function postData() {
            const response = await fetch("\api\produtos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this)
            });
            return response.json();
        }
        try {
            return await postData();
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export class ProdutosServidorClass extends ProdutosClienteClass {
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