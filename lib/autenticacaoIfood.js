import { useEffect, useState } from "react";

const authenticate = async () => {
  try {
   
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  fetch('https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grantType=client_credentials&clientId=${clientId}&clientSecret=${clientSecret}&authorizationCode=&authorizationCodeVerifier=&refreshToken=`
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });


    
  } catch (error) {
    throw error;
  }
}

// export default authenticate;



// import { useEffect, useState } from 'react';
// import cookie from 'cookie';

// async function authenticate(ctx) {
//   let accessToken = ctx && ctx.req && ctx.req.cookies && ctx.req.cookies.access_token;
//   const expiresAt = ctx && ctx.req && ctx.req.cookies && ctx.req.cookies.expires_at;

//   // Verifica se o token ainda é válido.
//   if (accessToken && expiresAt && new Date().getTime() < expiresAt) {
//     return accessToken;
//   }

//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;

//   const response = await fetch("https://api.ifood.com/oauth2/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
//   });

//   const json = await response.json();
//   accessToken = json.access_token;

//   // Armazene o token de acesso e a hora de expiração em um cookie seguro.
//   if (ctx && ctx.res) {
//     ctx.res.setHeader('Set-Cookie', cookie.serialize('access_token', accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: json.expires_in,
//     }));
//     ctx.res.setHeader('Set-Cookie', cookie.serialize('expires_at', new Date().getTime() + json.expires_in * 1000, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: json.expires_in,
//     }));
//   }

//   return accessToken;
// }

function Authentication({children}) {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    async function fetchAccessToken() {
      const token = await authenticate();
      setAccessToken(token);
    }

    if (!accessToken) {
      fetchAccessToken();
    }
  }, [accessToken]);

  return accessToken ? children(accessToken) : null;
}

export default Authentication;
