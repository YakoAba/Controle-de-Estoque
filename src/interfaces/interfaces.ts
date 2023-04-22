export module Módulos {

    export interface MensagemInterface {
        data: Date,
        hora: Date,
        mensagem: string
    }

    export interface ClienteInterface {
        id: number,
        nome: string,
        numero: string,
        mensagem : string
    }
}

export const clienteModelo: Módulos.ClienteInterface = {
    id: null,
    nome: '',
    numero: "",
    mensagem: ""
};