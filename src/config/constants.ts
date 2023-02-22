export const API_PRODUTOS = "/api/produtos";
export const API_PRODUTOS_IFOOD = "/api/listaProdutosIfood";
export const API_CATEGORIAS = "/api/categorias";
export const URL_DE_AUTENTICACAO = 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token';

export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const MONGODB_DB = process.env.MONGODB_DB;

export const mensagemErro = { success: false };
export const mensagemSucesso = { success: true }

export const Sections = [
    {
        title: "CADASTRO",
        links: [
            {
                label: "CATEGORIAS",
                href: "/categorias",
            },
            // {
            //     label: "PRODUTOS",
            //     href: "/produtos",
            // },
        ],
    },
    // {
    //     title: "ESTOQUE",
    //     links: [
    //         {
    //             label: "SAÍDAS",
    //             href: "/saidas-estoque",
    //         },
    //     ],
    // },
];

export const merchantId = "799b5203-981f-4b1b-96d0-b7122cc1a246";
export const catalogId = "2f8f10f9-20ea-4634-9e09-1d74f04773a7";
export const catalogURL = `https://merchant-api.ifood.com.br/catalog/v1.0/merchants/${merchantId}/products?page=1&limit=100`;
