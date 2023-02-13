export const API_PRODUTOS = "api/listaProdutosIfood";
export const API_CATEGORIAS = "api/categorias";
export const URL_DE_AUTENTICACAO = 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token';

export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const MONGODB_DB = process.env.MONGODB_DB;

export const SECOES = [
    {
        titulo: "CADASTRO",
        links: [
            {
                rotulo: "CATEGORIAS",
                href: "/categorias",
            },
            {
                rotulo: "PRODUTOS",
                href: "/produtos",
            },
        ],
    },
    {
        titulo: "ESTOQUE",
        links: [
            {
                rotulo: "SAÍDAS",
                href: "/saidas-estoque",
            },
        ],
    },
];