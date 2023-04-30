import React from "react";
import { useProdutoContext } from "../components/produtos/context";
import { PdvModule } from "../interfaces/Pdv.interface";

export class ProdutosClass extends React.Component<PdvModule.ProdutosInterface> implements PdvModule.ProdutosInterface {
    _id: string
    porcentagem: number
    peso: number
    nome: string
    image: string
    venda: PdvModule.VendaInterface
    ingredientes: PdvModule.IngredienteInteface[]
    descricao: string;

    constructor(props: PdvModule.ProdutosInterface) {
        super(props);
        this.state = {
        };
    }

    static async createInstance(item: PdvModule.ProdutosInterface) {
        const produto = new ProdutosClass({} as PdvModule.ProdutosInterface);

        produto._id = item._id;
        produto.nome = item.nome;
        produto.peso = item.peso;
        produto.image = item.image;

        const bruto: number = item.venda.bruto || 0;
        const custo: number = item.venda.custo || 0;
        const taxa: number = item.venda.taxa || 0;
        const liquido = bruto * (1 - taxa);
        const lucro = liquido - custo;

        produto.venda = {
            bruto: bruto,
            custo: custo,
            liquido: liquido,
            lucro: lucro,
            taxa: taxa,
        };

        produto.ingredientes = item.ingredientes;
        return produto;
    }

    static async dbDelete({ id }): Promise<any> {
        async function postData() {
            const response = await fetch(`/api/produtos?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
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

    static async dbOne({ id }): Promise<any> {
        async function postData() {
            const response = await fetch(`/api/produtos?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
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

    static async dbAll(): Promise<any> {
        async function postData() {
            const response = await fetch(`/api/c6`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
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

    async dbEdit(data: any): Promise<any> {
        async function postData() {
            const response = await fetch(`/api/produtos?id=${data._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        }
        try {
            return await postData();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async dbInsert(data: any): Promise<any> {
        async function postData() {
            const response = await fetch("/api/produtos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        }
        try {
            return await postData();
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}