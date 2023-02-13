import { TokenApiIfoodInterface, TokenApiResponseIfoodInterface, TokenBdIfoodInterface } from "../interfaces/Token.interface";
import { MONGODB_DB, CLIENT_ID, CLIENT_SECRET, URL_DE_AUTENTICACAO } from '../config/constants';

import clientPromise from "../../lib/mongodb";

export class TokenApiResponseIfoodClass implements TokenApiResponseIfoodInterface {
    accessToken: string;
    type: string;
    expiresIn: number;
    success: boolean;
    createdAt: Date;
    expires: Date;
    client: any;
    db: any;

    private constructor() {

    };

    static instance: TokenApiResponseIfoodClass = null;

    static async createInstance(data: TokenApiResponseIfoodInterface = null): Promise<TokenApiResponseIfoodClass> {
        if (!TokenApiResponseIfoodClass.instance) {
            TokenApiResponseIfoodClass.instance = new TokenApiResponseIfoodClass();
            TokenApiResponseIfoodClass.instance.client = await clientPromise;
            TokenApiResponseIfoodClass.instance.db = TokenApiResponseIfoodClass.instance.client.db(MONGODB_DB);
            if (data) {
                TokenApiResponseIfoodClass.instance.accessToken = data.accessToken;
                TokenApiResponseIfoodClass.instance.type = data.type;
                TokenApiResponseIfoodClass.instance.expiresIn = data.expiresIn;
                TokenApiResponseIfoodClass.instance.success = data.success;
                TokenApiResponseIfoodClass.instance.createdAt = data.createdAt;
            } else {
                const tokenDb: TokenBdIfoodInterface = await TokenApiResponseIfoodClass.instance.db();
                if (tokenDb) {
                    TokenApiResponseIfoodClass.instance.accessToken = tokenDb.accessToken;
                    TokenApiResponseIfoodClass.instance.expiresIn = tokenDb.expiresIn;
                    TokenApiResponseIfoodClass.instance.createdAt = tokenDb.createdAt;
                    TokenApiResponseIfoodClass.instance.type = tokenDb.type;
                }
            }
            TokenApiResponseIfoodClass.instance.expires = new Date(TokenApiResponseIfoodClass.instance.createdAt.getTime() + TokenApiResponseIfoodClass.instance.expiresIn * 1000);
            if (TokenApiResponseIfoodClass.instance.tokenInvalido()) {
                const DataApi: TokenApiIfoodInterface = await TokenApiResponseIfoodClass.instance.obterTokenIfood();
                TokenApiResponseIfoodClass.instance.accessToken = DataApi.accessToken;
                TokenApiResponseIfoodClass.instance.expiresIn = DataApi.expiresIn;
                TokenApiResponseIfoodClass.instance.createdAt = new Date();
                TokenApiResponseIfoodClass.instance.type = DataApi.type;
                TokenApiResponseIfoodClass.instance.expires = new Date(TokenApiResponseIfoodClass.instance.createdAt.getTime() + TokenApiResponseIfoodClass.instance.expiresIn * 1000);
            }
        }
        return TokenApiResponseIfoodClass.instance;
    }

    async obterTokenIfood(): Promise<TokenApiIfoodInterface> {

        const PARAMETROS_DA_REQUISICAO = new URLSearchParams();
        PARAMETROS_DA_REQUISICAO.append('grantType', 'client_credentials');
        PARAMETROS_DA_REQUISICAO.append('clientId', CLIENT_ID);
        PARAMETROS_DA_REQUISICAO.append('clientSecret', CLIENT_SECRET);
        PARAMETROS_DA_REQUISICAO.append('authorizationCode', '');
        PARAMETROS_DA_REQUISICAO.append('authorizationCodeVerifier', '');
        PARAMETROS_DA_REQUISICAO.append('refreshToken', '');

        const OPCOES_DE_CHAMADA: RequestInit = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: PARAMETROS_DA_REQUISICAO,
        };

        try {
            const resposta = await fetch(URL_DE_AUTENTICACAO, OPCOES_DE_CHAMADA);

            if (!resposta.ok) {
                throw new Error(
                    `Erro ao obter token: ${resposta.statusText}`
                );
            }

            const dados = await resposta.json();
            return dados;
        } catch (erro) {
            throw new Error(`Erro ao obter token: ${erro.message}`);
        }
    }

    temTokenAtivo(): boolean {
        return !!this.accessToken;
    }

    tokenInvalido(): boolean {
        const horaAtual = new Date().getTime();
        return horaAtual >= this.expires.getTime();
    }

    async Db(): Promise<TokenBdIfoodInterface> {
        try {
            return await this.db.collection('token').findOne();
        } catch (error) {
            console.error(`Erro ao obter token do banco de dados: ${error}`);
            throw error;
        }
    }

    async insertDB(): Promise<any> {
        try {
            return await this.db.collection('token').insertOne(this);
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async deleteDB(): Promise<any> {
        try {
            return await this.db.collection('token').deleteOne({ createdAt: this.createdAt });
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}