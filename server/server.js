const express = require("express");
const fetch = require("node-fetch");
const app = express();
const multer = require("multer");
const cors = require("cors");
const { Agent } = require("https");
const { json } = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "something",
  host: "localhost",
  port: 5432,
  database: "valorantstorechecker",
});

/** for application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true })); // built-in middleware

/** for application/json */
app.use(express.json()); // built-in middleware

/** for multipart/form-data (required with FormData) */
app.use(multer().none()); // requires the "multer" module

app.use(cors());

const AUTHURL = "https://auth.riotgames.com/api/v1/authorization";
const ENTITLEMENTURL = "https://entitlements.auth.riotgames.com/api/token/v1";
const userAgent =
  "RiotClient/43.0.1.4195386.4190634 rso-auth (Windows; 10;;Professional, x64)";
const ciphers = [
  "TLS_CHACHA20_POLY1305_SHA256",
  "TLS_AES_128_GCM_SHA256",
  "TLS_AES_256_GCM_SHA384",
  "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
];
const agent = new Agent({
  ciphers: ciphers.join(":"),
  honorCipherOrder: true,
  minVersion: "TLSv1.2",
});

// Endpoints
app.post("/auth", async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let loginSession;
  let asid;
  let authRes;
  let authResJson;
  let ssid;
  let puuid;
  let accessToken;
  let entitlementRes;
  let entitlementResJson;
  let entitlementToken;
  let storeJson;
  let playerName;

  let result = {
    displayName: "",
    store: "",
    puuid: "",
  };

  // creating login session
  try {
    loginSession = await createLoginSession();
    asid = getCookie(loginSession, "asid");
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }

  // logging in
  try {
    authRes = await login(username, password, asid);
    ssid = getCookie(authRes, "ssid");
    puuid = getCookie(authRes, "sub").split("=")[1];
    authResJson = await authRes.json();
    accessToken = getAccessToken(authResJson.response.parameters.uri);
    result.puuid = puuid;

    let playerInfo = await getPlayerInfo(puuid);
    await updatePlayerInfo(playerInfo.length !== 0, puuid, ssid);
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }

  // obtaining entitlement token
  try {
    entitlementRes = await getEntitlement(accessToken, ssid);
    entitlementResJson = await entitlementRes.json();
    entitlementToken = entitlementResJson.entitlements_token;
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }

  // obtaining player username
  try {
    playerName = await getDisplayName(
      accessToken,
      entitlementToken,
      puuid,
      ssid
    );
    result.displayName = playerName;
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }

  // obtaining current store offers
  try {
    storeJson = await getStore(accessToken, entitlementToken, puuid, ssid);
    result.store = storeJson.SkinsPanelLayout;
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
  res.send(result);
});

app.post("/check", async function (req, res) {
  let ssid = req.body.ssid;
  let puuid = req.body.puuid;
  let reauthRes;
  let accessToken;
  let entitlementToken;
  let entitlementRes;
  let entitlementResJson;
  let storeJson;
  let storeOffers;
  try {
    reauthRes = await cookieReauth(ssid);
    accessToken = getAccessToken(reauthRes.headers.raw().location[0]);
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }

  // obtaining entitlement token
  try {
    entitlementRes = await getEntitlement(accessToken, ssid);
    entitlementResJson = await entitlementRes.json();
    entitlementToken = entitlementResJson.entitlements_token;
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }

  try {
    storeJson = await getStore(accessToken, entitlementToken, puuid, ssid);
    storeOffers = storeJson.SkinsPanelLayout.SingleItemOffers;
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
  res.send(storeOffers);
});

// test endpoint -- currently testing player found or not.
app.post("/test", async function (req, res) {
  let puuid = req.body.puuid;
  let ssid = req.body.ssid;
  try {
    let playerInfo = await getPlayerInfo(puuid);
    let result = await updatePlayerInfo(playerInfo.length !== 0, puuid, ssid);
    res.send(result);
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

app.post("/getphone", async function (req, res) {
  let puuid = req.body.puuid;
  try {
    let query = "SELECT phone_number FROM players WHERE puuid = $1";
    let playerPhone = await pool.query(query, [puuid]);
    res.send(playerPhone.rows[0]);
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

// get wishlish weapons
app.post("/wishlist", async function (req, res) {
  let puuid = req.body.puuid;
  try {
    let query = "SELECT uuid FROM wishlists WHERE puuid = $1";
    let selectedSkins = await pool.query(query, [puuid]);
    let selectedSkinsArr = [];
    for (let i = 0; i < selectedSkins.rows.length; i++) {
      selectedSkinsArr.push(selectedSkins.rows[i].uuid);
    }
    res.send({
      wishlist: selectedSkinsArr,
    });
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

// add to wishlist endpoint
app.post("/add", async function (req, res) {
  let uuid = req.body.uuid; // level uuid
  let puuid = req.body.puuid; // player id
  try {
    let query =
      "INSERT INTO wishlists(puuid, uuid) VALUES ($1, $2) RETURNING *";
    let values = [puuid, uuid];
    let inserted = await pool.query(query, values);
    res.send(inserted.rows);
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

// delete skin from wishlist endpoint
app.post("/delete", async function (req, res) {
  let uuid = req.body.uuid; // level uuid
  let puuid = req.body.puuid; // player id
  try {
    let query =
      "DELETE FROM wishlists WHERE puuid = $1 AND uuid = $2 RETURNING *";
    let values = [puuid, uuid];
    let deleted = await pool.query(query, values);
    res.send(deleted.rows);
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

// update phone number endpoint
app.post("/updatephone", async function (req, res) {
  let newPhone = req.body.phone;
  let puuid = req.body.puuid;

  try {
    let query =
      "UPDATE players SET phone_number = $1 WHERE puuid = $2 RETURNING *";
    let values = [newPhone, puuid];
    let updated = await pool.query(query, values);
    res.send(updated.rows[0]);
  } catch (error) {
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

// Functions
async function updatePlayerInfo(isFound, puuid, ssid) {
  let updated;
  if (isFound) {
    console.log("player found! Updating cookie.");
    let query = "UPDATE players SET ssid = $1 WHERE puuid = $2";
    let values = [ssid, puuid];
    updated = await pool.query(query, values);
  } else {
    console.log("player not found! Inserting new player.");
    let query = "INSERT INTO players(puuid, ssid) VALUES ($1, $2)";
    let values = [puuid, ssid];
    updated = await pool.query(query, values);
  }
}

async function getPlayerInfo(puuid) {
  let query = "SELECT * FROM players WHERE puuid = $1";
  let playerInfo = await pool.query(query, [puuid]);
  return playerInfo.rows;
}

function getAccessToken(uri) {
  let url = new URL(uri);
  let params = new URLSearchParams(url.hash.substring(1));
  return params.get("access_token");
}

function getCookie(res, cookieName) {
  let cookies = res.headers.raw()["set-cookie"];

  for (let i = 0; i < cookies.length; i++) {
    currCookieName = cookies[i].split("=")[0];
    if (currCookieName === cookieName) {
      return cookies[i].split(";")[0];
    }
  }
  return -1;
}

async function createLoginSession() {
  let createSessionBody = {
    client_id: "play-valorant-web-prod",
    nonce: "1",
    redirect_uri: "https://playvalorant.com/opt_in",
    response_type: "token id_token",
    scope: "account openid",
  };

  let session = await fetch(AUTHURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent,
    },
    body: JSON.stringify(createSessionBody),
    agent: agent,
  });
  return session;
}

async function login(username, password, asid) {
  let loginBody = {
    type: "auth",
    username: username,
    password: password,
    remember: true,
    language: "en_US",
  };

  let authRes = await fetch(AUTHURL, {
    method: "PUT",
    body: JSON.stringify(loginBody),
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent,
      Cookie: `${asid}`,
    },
    agent: agent,
  });
  return authRes;
}

async function getEntitlement(accessToken, ssid) {
  let entitlementRes = await fetch(ENTITLEMENTURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent,
      Authorization: `Bearer ${accessToken}`,
      Cookie: `${ssid}`,
    },
    agent: agent,
  });
  return entitlementRes;
}

async function getStore(accessToken, entitlementToken, puuid, ssid) {
  let storeUrl = "https://pd.na.a.pvp.net/store/v2/storefront/" + puuid;
  let storeResJson = await fetch(storeUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent,
      "X-Riot-Entitlements-JWT": `${entitlementToken}`,
      Authorization: `Bearer ${accessToken}`,
      Cookie: `${ssid}`,
    },
    agent: agent,
  }).then((res) => res.json());
  return storeResJson;
}

async function getDisplayName(accessToken, entitlementToken, puuid, ssid) {
  let playerUrl = "https://pd.NA.a.pvp.net/name-service/v2/players";
  let playerResJson = await fetch(playerUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent,
      "X-Riot-Entitlements-JWT": `${entitlementToken}`,
      Authorization: `Bearer ${accessToken}`,
      Cookie: `${ssid}`,
    },
    body: JSON.stringify([puuid]),
    agent: agent,
  }).then((res) => res.json());
  let displayName = playerResJson[0].GameName + " #" + playerResJson[0].TagLine;
  return displayName;
}

async function cookieReauth(ssid) {
  let reauthUrl =
    "https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1";

  let reauthRes = await fetch(reauthUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent,
      Cookie: `${ssid}`,
    },
    agent: agent,
    redirect: "manual",
  });

  return reauthRes;
  // if(reauthRes.headers.location.startsWith("/login")) {
  //   console.log("invalid cookie");
  // } else { // valid cookie

  // }
}

const PORT = process.env.PORT || 8000;

/** Listens on port 8000 for connection */
app.listen(PORT, () => console.log("Server started on port 8000"));
