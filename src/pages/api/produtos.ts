import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const mensagemErro = { success: false };
  const mensagemSucesso = { success: true }

  switch (method) {
    case "GET":
      try {
        const { categoria } = req.query;
        let produtos;
        if (categoria === undefined) {
          produtos = await db.collection("produtos").find().toArray();
        } else {
          const filtro =
            categoria === "Ofertas"
              ? { offer: true }
              : { categoria: categoria };
          produtos = await db.collection("produtos").find(filtro).toArray();
        }

        res.status(200).json({ ...mensagemSucesso, produtos });
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "POST":
      try {
        await db.collection("produtos").insertMany(req.body);
        /* create a new model in the database */
        res.status(201).json(mensagemSucesso);
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "PATCH":
      try {
        const { id } = req.query;
        await db
          .collection("produtos")
          .updateOne({ id: Number(id) }, req.body);
        /* create a new model in the database */
        res.status(201).json(mensagemSucesso);
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        const alunos = await db
          .collection("produtos")
          .deleteMany({ id: Number(id) });
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
