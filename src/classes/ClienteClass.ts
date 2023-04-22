import React from "react";
import { Módulos } from "../interfaces/interfaces";

export class ClienteClass extends React.Component<Módulos.ClienteInterface> implements Módulos.ClienteInterface {
    id: number
    nome: string
    numero: string
    mensagem: string

    constructor(props: Módulos.ClienteInterface) {
        super(props);
        this.state = {
        };
    }

    static async createInstance(pCliente: Módulos.ClienteInterface) {
        const vCliente = new ClienteClass({} as Módulos.ClienteInterface);

        vCliente.id = pCliente.id;
        vCliente.nome = pCliente.nome;
        vCliente.numero = pCliente.numero;
        vCliente.mensagem = pCliente.mensagem;

        return vCliente;
    }

    static async dbDelete({ id }): Promise<any> {
        async function postData() {
            const response = await fetch(`/api/cliente?id=${id}`, {
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

    static async dbOne({ id }): Promise<Módulos.ClienteInterface> {
        async function postData() {
            const response = await fetch(`/api/cliente?id=${id}`, {
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
            const response = await fetch(`/api/cliente`, {
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
            const response = await fetch(`/api/cliente?id=${data._id}`, {
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
            const response = await fetch("/api/cliente", {
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