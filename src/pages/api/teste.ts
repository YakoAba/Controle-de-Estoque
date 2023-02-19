import { ProdutosServidorClass } from "../../classes/Pdv.class";
import { mensagemErro, mensagemSucesso } from "../../config/constants";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const json = await (new ProdutosServidorClass).IFoodAll();
                res.status(200).json({ ...mensagemSucesso, json });
            } catch (error) {
                res.status(400).json(mensagemErro);
            }
            break;
        default:
            res.status(400).json(mensagemErro);
            break;
    }
}
