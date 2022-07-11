import { fetch } from "whatwg-fetch";

async function userAuth(username, password) {
  let authCookiesBody = {
    client_id: "play-valorant-web-prod",
    nonce: "1",
    redirect_uri: "https://playvalorant.com/opt_in",
    response_type: "token id_token",
    scope: "account openid",
  };

  let authUrl = "https://auth.riotgames.com/api/v1/authorization";
  let authCookies = await fetch(authUrl, {
    method: "POST",
    body: JSON.stringify(authCookiesBody),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  console.log("cookies");
  console.log(authCookies);

  let authRequestBody = {
    type: "auth",
    username: username,
    password: password,
    remember: true,
    language: "en_US",
  };

  let authRequest = await fetch(authUrl, {
    method: "PUT",
    body: JSON.stringify(authRequestBody),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  console.log("auth request");
  console.log(authRequest);
}

export default userAuth;
