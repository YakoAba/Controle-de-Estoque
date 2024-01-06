import React from "react";
import { Module } from "../interfaces/Pdv.interface";
import { API_SERVICOS } from "../config/constants";

// Classe ServicosClass que implementa a interface Module.ServicosInterface
export class ServicosClass extends React.Component<Module.ServicosInterface> implements Module.ServicosInterface {
    _id: string
    nome: string

    constructor(props: Module.ServicosInterface) {
        super(props);
        this.state = {
        };
    }

    // Método estático para criar uma instância da classe ServicosClass a partir de um item
    static async createInstance(item: Module.ServicosInterface) {
        const servico = new ServicosClass({} as Module.ServicosInterface);
        servico._id = item._id;
        servico.nome = item.nome;
        return servico;
    }

    // Método estático para excluir um servico do banco de dados
    static async dbDelete({ id }): Promise<any> {
        async function postData() {
            const response = await fetch(`${API_SERVICOS}?id=${id}`, {
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

    // Método estático para obter um servico do banco de dados por ID
    static async dbOne({ id }): Promise<any> {
        async function postData() {
            const response = await fetch(`${API_SERVICOS}?id=${id}`, {
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

    // Método estático para obter todos os Servicos do banco de dados
    static async dbAll(): Promise<any> {
        async function postData() {
            const response = await fetch(API_SERVICOS, {
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

    // Método para editar um servico no banco de dados
    async dbEdit(data: any): Promise<any> {
        async function postData() {
            const response = await fetch(`${API_SERVICOS}?id=${data._id}`, {
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

    // Método para inserir um novo servico no banco de dados
    async dbInsert(data: any): Promise<any> {
        async function postData() {
            const response = await fetch(API_SERVICOS, {
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
