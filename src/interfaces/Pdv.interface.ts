// Importa a classe ClientesClass do arquivo "../classes/clientes/clientes"
import { ClientesClass } from "../classes/clientes";
import { ProfissionaisClass } from "../classes/profissionais";
import { ServicosClass } from "../classes/servicos";

// Define um módulo chamado Module
export module Module {
    // Define a interface ClientesInterface com propriedades para representar informações de clientes
    export interface ClientesInterface {
        _id: string,       // Identificador único do cliente
        nome: string,      // Nome do cliente
        telefone: string,  // Número de telefone do cliente
    }
    // Define a interface ServicosInterface com propriedades para representar informações de servocp
    export interface ServicosInterface {
        _id: string,       // Identificador único do servico
        nome: string,      // Nome do servico
    }
    // Define a interface ProfissionalInterface com propriedades para representar informações de profissional
    export interface ProfissionaisInterface {
        _id: string,       // Identificador único do profissional
        nome: string,      // Nome do profissional
        servico: string
    }
}

// Cria uma instância clienteModelo do tipo Module.ClientesInterface utilizando a classe ClientesClass
export const clienteModelo: Module.ClientesInterface = new ClientesClass({} as Module.ClientesInterface);
export const servicoModelo: Module.ServicosInterface = new ServicosClass({} as Module.ServicosInterface);
export const profissionalModelo: Module.ProfissionaisInterface = new ProfissionaisClass({} as Module.ProfissionaisInterface);

