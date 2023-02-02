import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const { method } = req
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    //
    // Then you can execute queries against your database like so:

  switch (method) {
      case 'GET':
        try {
        const pedidos = await db.collection("pedidos").find().toArray()
       // await db.collection("pedidos").deleteMany({"Site" : 1});
          res.status(200).json({ pedidos })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break

      case 'POST':
        try {
        await db.collection("pedidos").insert(JSON.parse(req.body)) 
         /* create a new model in the database */
          res.status(201).json({ success: true })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break

      //   case 'DELETE':
      //     try {
      //       const alunos = await Aluno.deleteOne({
      //           _id: req.body._id,
      //       }) /* find all the data in our database */
      //       res.status(200).json({ success: true, data: alunos })
      //     } catch (error) {
      //       res.status(400).json({ success: false })
      //     }
      //     break

      //  

      default: res.status(400).json({ success: false })
        break
    }
    // }
  } catch (e) {
    //  {
    //   props: { isConnected: false }
    // }
  }


}