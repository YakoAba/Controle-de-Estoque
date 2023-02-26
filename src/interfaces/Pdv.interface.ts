export module PdvModule {
    export interface QuantidadesInterface {
        quantidade: number,
        peso: number,
        valor: number
    }

    export interface ItensInterface {
        nome: string,
        unidade: string,
        valor: number,
        quantidades: QuantidadesInterface
    }

    export interface IngredienteInteface {
        quantidade: number,
        valor: number,
        nome: string,
        produto: ItensInterface
    }

    export interface VendaInterface {
        bruto: number;
        taxa: number;
        liquido: number;
        custo: number;
        lucro: number;
    }

    export interface ProdutosClienteInterface {
        _id: string,
        nome: string,
        descricao: string,
        peso: number,
        image: string;
        venda: VendaInterface,
        ingredientes: IngredienteInteface[]
        InsertDB(data: any): Promise<any>;
    }

    export interface ProdutosServidorInteface extends ProdutosClienteInterface {
        DbAll(): Promise<ProdutosClienteInterface[]>
        InsertDB(data: any): Promise<any>;
    }
}

export const ingredientesModelo: PdvModule.IngredienteInteface = {
    quantidade: 0,
    valor: 0,
    nome: "",
    produto: {
        nome: '',
        unidade: '',
        valor: 0,
        quantidades: {
            quantidade: 0,
            peso: 0,
            valor: 0
        }
    }
}

export const vendaModelo: PdvModule.VendaInterface = {
    bruto: 0,
    taxa: 0,
    liquido: 0,
    custo: 0,
    lucro: 0,
}

export const produtoModelo: PdvModule.ProdutosClienteInterface = {
    _id: null,
    nome: '',
    descricao: "",
    peso: 0,
    image: '',
    venda: vendaModelo,
    ingredientes: [
        ingredientesModelo
    ],
    InsertDB: null
};
