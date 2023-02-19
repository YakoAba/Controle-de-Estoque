
import { mensagemErro, mensagemSucesso } from "../../config/constants";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    // case "GET":
    //   try {
    //     const json = await (new ProdutosServidorClass).DbAll();;
    //     res.status(200).json({ ...mensagemSucesso, json });
    //   } catch (error) {
    //     res.status(400).json(mensagemErro);
    //   }
    //   break;

    // case "POST":
    //   try {
    //     // const Produto = await JSON.parse(req.body) as ProdutosClienteClass;
    //     // await Produto.InsertDB();
    //     console.log(req.body);
    //     /* create a new model in the database */
    //     res.status(201).json(mensagemSucesso);
    //   } catch (error) {
    //     res.status(400).json(mensagemErro);
    //   }
    //   break;

    default:
      res.status(400).json(mensagemErro);
      break;
  }
}
