// import { mensagemErro, mensagemSucesso } from "../../config/constants";
// import { Módulos } from "../../interfaces/interfaces";
// import { IntegerType, ObjectId } from "mongodb";
// import clientPromise from "../../../lib/mongodb";

// async function postData(method: string, url: string, data?: any): Promise<Response> {
//   const options: RequestInit = {
//     method,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   if (data) {
//     options.body = JSON.stringify(data);
//   }

//   return await fetch(url, options);
// }

// export async function dbDelete(id: number): Promise<any> {
//   const response = await postData('DELETE', `/api/cliente?id=${id}`);
//   return response.json();
// }

// export async function dbOne(id: number): Promise<Módulos.ClienteInterface> {
//   const response = await postData('GET', `/api/cliente?id=${id}`);
//   return response.json();
// }

// export async function dbAll(): Promise<any> {
//   const response = await postData('GET', `/api/cliente`);
//   return response.json();
// }

// export async function dbEdit(data: any): Promise<any> {
//   const response = await postData('PATCH', `/api/cliente?id=${data._id}`, data);
//   return response.json();
// }

// export async function dbInsert(data: any): Promise<any> {
//   const response = await postData('POST', "/api/cliente", data);
//   return response.json();
// }


// export class Cliente implements Módulos.ClienteInterface {
//   id: number;
//   nome: string;
//   número: string;
//   mensagens: Módulos.MensagemInterface;

//   constructor(data: Módulos.ClienteInterface) {
//     this.id = data.id;
//     this.nome = data.nome;
//     this.número = data.número;
//     this.mensagens = data.mensagens;
//   }

//   static async createInstance(pCliente: Módulos.ClienteInterface) {
//     const vCliente = new Cliente(pCliente);
//     return vCliente;
//   }

//   async insert(): Promise<Cliente> {
//     const insertedCliente = await dbInsert(this);
//     return new Cliente(insertedCliente);
//   }

//   async delete(): Promise<any> {
//     return await dbDelete(this.id);
//   }

//   async edit(data: Módulos.ClienteInterface): Promise<Cliente> {
//     const editedCliente = await dbEdit(data);
//     return new Cliente(editedCliente);
//   }

//   static async findOne(id: number): Promise<Cliente> {
//     const clienteData = await dbOne(id);
//     return new Cliente(clienteData);
//   }

//   static async findAll(): Promise<Cliente[]> {
//     const clientesData = await dbAll();
//     return clientesData.map(clienteData => new Cliente(clienteData));
//   }
// }

import { mensagemErro, mensagemSucesso } from "../../config/constants";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

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
          const foundCliente = await db.collection("clientes").findOne({ _id: new ObjectId(id) });
          json = foundCliente;
        } else {
          const foundClientes = await db.collection("clientes").find().toArray();
          json = foundClientes;
        }
        res.status(200).json({ ...mensagemSucesso, json });
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "POST":
      try {
        console.log(req.body)
        await db.collection("clientes").insertOne(req.body);
        res.status(201).json(mensagemSucesso);
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    case "PATCH":
      try {
        const { id } = req.query;
        delete req.body._id;
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
        const result = await db
          .collection("clientes")
          .deleteMany({ _id: { $in: objIds } });
        res.status(200).json({ ...mensagemSucesso, data: result });
      } catch (error) {
        res.status(400).json(mensagemErro);
      }
      break;

    default:
      res.status(400).json(mensagemErro);
      break;
  }
}
