import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { mensagemErro, mensagemSucesso } from "../../config/constants";

// Função para criar o menu de texto
function createMenu(jsonData) {
  console.log(jsonData)
  const menu = jsonData.map(item => {
    return `${item.nome}`;
  });
  return menu.join('\n'); // Une as opções em uma única string separada por quebras de linha
}

export default async function handler(req, res) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  switch (method) {

    case "GET":
      try {
        const { id, menu } = req.query;
        let json;
        if (id) {
          json = await db.collection("servicos").findOne({ _id: new ObjectId(id) });
          if (!json) {
            return res.status(404).json({ erro: `servico não encontrado` });
          }
        } else {
          json = await db.collection('servicos').find().toArray();
          if (!json) {
            return res.status(404).json({ erro: `servicos não encontrados` });
          }
          if (menu) {// Chamando a função para criar o menu
            const menuText = createMenu(json);
            res.status(200).json({ ...mensagemSucesso, menuText });
          }
        }
        res.status(200).json({ ...mensagemSucesso, json });
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "POST":
      try {
        const servico = await db.collection("servicos").insertOne(req.body);
        /* create a new model in the database */
        res.status(201).json(servico);
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "PATCH":
      try {
        const { id } = req.query;
        delete req.body._id
        const response = await db
          .collection("servicos")
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
        const servico = await db
          .collection("servicos")
          .deleteMany({ _id: { $in: objIds } });
        /* find all the data in our database */
        res.status(200).json({ ...mensagemSucesso, data: servico });
      } catch (error) {

        res.status(400).json(mensagemErro);

      }
      break;

    default:
      res.status(400).json(mensagemErro);
      break;
  }
}
