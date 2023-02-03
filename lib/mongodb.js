import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

const mensagemErro = "Adicione sua URI do Mongo ao .env.local";
if (!process.env.MONGODB_URI) {
  throw new Error(mensagemErro);
}

const mensagemDesenvolvimento =
  "Em modo de desenvolvimento, use uma variável global para que o valor seja preservado através das recargas de módulo causadas pelo HMR (Hot Module Replacement)";
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const mensagemProducao =
    "Em modo de produção, é melhor não usar uma variável global.";
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

const mensagemModulo =
  "Exporta uma promessa do MongoClient no escopo do módulo. Ao fazer isso em um módulo separado, o cliente pode ser compartilhado entre funções.";
export default clientPromise;
