import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const mensagemErro = {success : false};
  const mensagemSucesso = {success : true}

  switch (method) {
    case "GET":
      try {
        const categorias = await db.collection("categorias").find().toArray();
        res.status(200).json({...mensagemSucesso, categorias});
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "POST":
      try {
        await db.collection("categorias").insertMany(req.body);
        res.status(201).json(mensagemSucesso);
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        await db.collection("categorias").updateOne({ _id: id }, { $set: req.body });
        res.status(200).json(mensagemSucesso);
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        await db.collection("categorias").deleteOne({ _id: id });
        res.status(200).json(mensagemSucesso);
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    default:
      res.status(400).json(mensagemErro);
      break;
  }
}