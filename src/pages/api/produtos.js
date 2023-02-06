import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  try {
    //await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    //
    // Then you can execute queries against your database like so:

    // {
    //   props: { isConnected: true, data: sites.site }
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

          res.status(200).json({ success: true, produtos });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

      case "POST":
        try {
          await db.collection("produtos").insertMany(req.body);
          /* create a new model in the database */
          res.status(201).json({ success: true });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

      case "PATCH":
        try {
          const { id } = req.query;
          await db
            .collection("produtos")
            .updateOne({ id: Number(id) }, req.body);
          /* create a new model in the database */
          res.status(201).json({ success: true });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

      case "DELETE":
        try {
          const { id } = req.query;
          const alunos = await db
            .collection("produtos")
            .deleteMany({ id: Number(id) });
          /* find all the data in our database */
          res.status(200).json({ success: true, data: alunos });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

      default:
        res.status(400).json({ success: false });
        break;
    }
    // }
  } catch (e) {
    //  {
    //   props: { isConnected: false }
    // }
  }
}
