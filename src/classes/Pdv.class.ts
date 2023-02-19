import { PdvModule } from "../interfaces/Pdv.interface";

export class ProdutosClienteClass implements PdvModule.ProdutosClienteInterface {
    _id: string
    porcentagem: number
    peso: number
    nome: string
    image: string
    venda: PdvModule.VendaInterface
    ingredientes: PdvModule.IngredienteInteface[]

    constructor() {
        this.venda = { bruto: null, liquido: null, taxa: null, custo: null, lucro: null, porcentagem: null }
    }

    static async createInstance() {
        return await new ProdutosClienteClass;
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
            console.log(this);
            return await postData();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

}