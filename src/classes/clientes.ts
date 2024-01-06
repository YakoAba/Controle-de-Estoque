import React from "react";
import { Module } from "../interfaces/Pdv.interface";
import { API_CLIENTES } from "../config/constants";

// Classe ClientesClass que implementa a interface Module.ClientesInterface
export class ClientesClass extends React.Component<Module.ClientesInterface> implements Module.ClientesInterface {
    _id: string
    nome: string
    telefone: string

    constructor(props: Module.ClientesInterface) {
        super(props);
        this.state = {
        };
    }

    // Método estático para formatar um número de telefone com DDI, DDD e número
    static formatarTelefoneComDDI(telefone: string): string {
        console.log(telefone)
        if (!telefone) return ""
        const apenasNumeros = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (apenasNumeros.length === 13) {
            // Formato com 13 dígitos (DDI + DDD + número)
            return apenasNumeros.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '($1) $2 $3-$4');
        } if (apenasNumeros.length === 11) {
            // Formato com 13 dígitos (DDI + DDD + número)
            return apenasNumeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '$1 $2-$3');
        }
        else {
            // Retorna o número original caso não tenha 13 dígitos
            return telefone;
        }
    }

    // Método estático para criar uma instância da classe ClientesClass a partir de um item
    static async createInstance(item: Module.ClientesInterface) {
        const cliente = new ClientesClass({} as Module.ClientesInterface);
        cliente._id = item._id;
        cliente.nome = item.nome;
        cliente.telefone = item.telefone
        return cliente;
    }

    // Método estático para excluir um cliente do banco de dados
    static async dbDelete({ id }): Promise<any> {
        async function postData() {
            const response = await fetch(`${API_CLIENTES}?id=${id}`, {
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

    // Método estático para obter um cliente do banco de dados por ID
    static async dbOne({ id }): Promise<any> {
        async function postData() {
            const response = await fetch(`${API_CLIENTES}?id=${id}`, {
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

    // Método estático para obter todos os clientes do banco de dados
    static async dbAll(): Promise<any> {
        async function postData() {
            const response = await fetch(API_CLIENTES, {
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

    // Método para editar um cliente no banco de dados
    async dbEdit(data: any): Promise<any> {
        async function postData() {
            const response = await fetch(`${API_CLIENTES}?id=${data._id}`, {
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

    // Método para inserir um novo cliente no banco de dados
    async dbInsert(data: any): Promise<any> {
        async function postData() {
            const response = await fetch(API_CLIENTES, {
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
