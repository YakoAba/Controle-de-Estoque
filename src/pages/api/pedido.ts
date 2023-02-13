// import clientPromise from "../../../lib/mongodb";
// const client = await clientPromise;
// const db = client.db(process.env.MONGODB_DB);
// const { method } = req;

export default async function handler(req, res) {
  // switch (method) {
  //   case "GET":
  //     try {
  //       const pedidos = await db.collection("pedidos").find().toArray();
  //       // await db.collection("pedidos").deleteMany({"Site" : 1});
  //       res.status(200).json({ pedidos });
  //     } catch (error) {
  //       res.status(400).json({ success: false });
  //     }
  //     break;

  //   case "POST":
  //     try {
  //       await db.collection("pedidos").insert(JSON.parse(req.body));
  //       /* create a new model in the database */
  //       res.status(201).json({ success: true });
  //     } catch (error) {
  //       res.status(400).json({ success: false });
  //     }
  //     break;
  //   default:
  //     res.status(400).json({ success: false });
  //     break;
  // }
  res.status(400).json({ success: false });
}
