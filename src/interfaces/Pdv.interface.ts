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
        produto: ItensInterface
    }

    export interface VendaInterface {
        bruto: number;
        taxa: number;
        liquido: number;
        custo: number;
        lucro: number;
        porcentagem: number;
    }

    export interface ProdutosInterface {
        nome: string,
        porcentagem: number,
        peso: number,
        image: string;
        venda: VendaInterface,
        ingredientes: IngredienteInteface[]
        DbAll(): Promise<ProdutosInterface[]>
    }
}

