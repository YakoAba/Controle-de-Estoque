// Constantes que representam as URLs das APIs
export const API_CLIENTES = "/api/clientes";
export const API_SERVICOS = "/api/servicos";
export const API_PROFISSIONAIS = "/api/profissionais";
export const API_HORARIOS = "/api/horarios";

// Constantes que armazenam informações sensíveis obtidas do ambiente
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const MONGODB_DB = process.env.MONGODB_DB;

// Constantes para mensagens de erro e sucesso
export const mensagemErro = { success: false };
export const mensagemSucesso = { success: true }

// Constante que armazena um objeto com valores booleanos
export const modelosBotoes = { a: true, d: false, e: false }

// Constante que define as seções do sistema
export const Sections = [
    {
        title: "CADASTRO",
        links: [
            {
                label: "CLIENTES",
                href: "/",
            },
            {
                label: "SERVIÇOS",
                href: "/servicos",
            },
            {
                label: "PROFISSIONAIS",
                href: "/profissionais",
            },
            {
                label: "HORÁRIOS",
                href: "/horarios",
            },
        ],
    },
];