import React from "react";
import { Module } from "../interfaces/Pdv.interface";
import { API_PROFISSIONAIS } from "../config/constants";

// Classe ProfissionaisClass que implementa a interface Module.ProfissionaisInterface
export class ProfissionaisClass extends React.Component<Module.ProfissionaisInterface> implements Module.ProfissionaisInterface {
    _id: string
    nome: string
    servico: string

    constructor(props: Module.ProfissionaisInterface) {
        super(props);
        this.state = {
        };
    }

    // Método estático para criar uma instância da classe ProfissionaisClass a partir de um item
    static async createInstance(item: Module.ProfissionaisInterface) {
        const profissional = new ProfissionaisClass({} as Module.ProfissionaisInterface);
        profissional._id = item._id;
        profissional.nome = item.nome;
        profissional.servico = item.servico
        return profissional;
    }

    // Método estático para excluir um servico do banco de dados
    static async dbDelete({ id }): Promise<any> {
        async function postData() {
            const response = await fetch(`${API_PROFISSIONAIS}?id=${id}`, {
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
            const response = await fetch(`${API_PROFISSIONAIS}?id=${id}`, {
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

    // Método estático para obter todos os Profissionais do banco de dados
    static async dbAll(): Promise<any> {
        async function postData() {
            const response = await fetch(API_PROFISSIONAIS, {
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
            const response = await fetch(`${API_PROFISSIONAIS}?id=${data._id}`, {
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
            const response = await fetch(API_PROFISSIONAIS, {
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
