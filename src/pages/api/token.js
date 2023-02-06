import clientPromise from "../../../lib/mongodb";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const dbName = process.env.MONGODB_DB;

const getToken = async () => {
  const client = await clientPromise;
  const db = client.db(dbName);

  const existingToken = await db.collection("token").findOne();
  if (existingToken) {
    const { accessToken, expiresIn, createAt } = existingToken;
    if (createAt >= expiresIn) {
      await db.collection("token").deleteOne({ createAt });
      return await getToken();
    }
    return { success: true, accessToken, expiresIn, createAt };
  }

  const resposta = await fetch(
    "https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grantType=client_credentials&clientId=${clientId}&clientSecret=${clientSecret}&authorizationCode=&authorizationCodeVerifier=&refreshToken=`,
    }
  );

 
  const data = await resposta.json();
  const { accessToken } = data;

  const createAt =   new Date();
  const expiresIn =  new Date(Date.parse(createAt) + data.expiresIn * 1000) 


  await db.collection("token").insertOne({ accessToken, expiresIn, createAt });

  return { success: true, accessToken, expiresIn, createAt };
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const token = await getToken();
      res.status(200).json({ success: true, ...token });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
