import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { mensagemErro, mensagemSucesso } from "../../config/constants";

export default async function handler(req, res) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  switch (method) {

    case "GET":
      try {
        const { id, telefone } = req.query;
        let json;
        if (telefone) { 
          json = await db.collection("clientes").findOne({telefone : telefone}) 
          if (!json) {
            return res.status(404).json({ erro: `cliente não encontrado` });
        }
        } else if (id) {
            json = await db.collection("clientes").findOne({ _id: new ObjectId(id) });
          } else {
            json = await db.collection('clientes').find().toArray();
          }
        res.status(200).json({ ...mensagemSucesso, json });
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "POST":
      try {
        const cliente = await db.collection("clientes").insertOne(req.body);
        /* create a new model in the database */
        res.status(201).json(cliente);
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "PATCH":
      try {
        const { id } = req.query;
        delete req.body._id
        const response = await db
          .collection("clientes")
          .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
        res.status(201).json(mensagemSucesso);
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        const objIds = id.split(',').map(idx => new ObjectId(idx));
        const alunos = await db
          .collection("clientes")
          .deleteMany({ _id: { $in: objIds } });
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
