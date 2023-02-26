import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { ProdutosServidorClass } from "../../classes/produto.servidor.class";
import { mensagemErro, mensagemSucesso } from "../../config/constants";

export default async function handler(req, res) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  switch (method) {

    case "GET":
      try {
        const { id } = req.query;
        let json;
        if (id) {
          json = await db.collection("produtos").findOne({ _id: new ObjectId(id) });
        } else {
          json = await ProdutosServidorClass.DbAll();
        }
        res.status(200).json({ ...mensagemSucesso, json });
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "POST":
      try {
        await db.collection("produtos").insertOne(req.body);
        /* create a new model in the database */
        res.status(201).json(mensagemSucesso);
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    // case "PATCH":
    //   try {
    //     const { id } = req.query;
    //     await db
    //       .collection("produtos")
    //       .updateOne({ id: Number(id) }, req.body);
    //     /* create a new model in the database */
    //     res.status(201).json(mensagemSucesso);
    //   } catch (error) {
    //     res.status(400).json(mensagemErro);
    //   }
    //   break;

    case "DELETE":
      try {
        const { id } = req.query;
        const alunos = await db
          .collection("produtos")
          .deleteMany({ _id: new ObjectId(id) });
        /* find all the data in our database */
        res.status(200).json({ ...mensagemSucesso, data: alunos });
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    default:
      res.status(400).json(mensagemErro);
      break;
  }
}
