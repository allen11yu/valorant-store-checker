import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import AboutPage from "./AboutPage";
import LoginPage from "./LoginPage";
import StorePage from "./StorePage";
import BundlePage from "./BundlePage";
import WishListPage from "./WishListPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [storeOffers, setStoreOffers] = useState([]);
  const [storeTimeLeft, setStoreTimeLeft] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bundles, setBundles] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const fetchBundles = async () => {
    await fetch("https://api.valtracker.gg/bundles")
      .then((res) => res.json())
      .then((data) => {
        setBundles(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  const addToWishlist = async (puuid, uuid) => {
    await fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ puuid, uuid }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const removeFromWishlist = async (puuid, uuid) => {
    await fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ puuid, uuid }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleSelect = (uuid) => {
    let temp = new Set(wishlist);
    if (temp.has(uuid)) {
      console.log("deselecting");
      removeFromWishlist(playerId, uuid);
      temp.delete(uuid);
    } else {
      console.log("selecting");
      addToWishlist(playerId, uuid);
      temp.add(uuid);
    }
    setWishlist(Array.from(temp));
  };

  return (
    <Switch>
      <Route>
        <Navbar />
        <Route exact path="/">
          {isLogin ? <StorePage /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/login">
          <LoginPage
            setIsLoginCallback={setIsLogin}
            setStoreOffersCallback={setStoreOffers}
            setStoreTimeLeftCallback={setStoreTimeLeft}
            setPlayerNameCallback={setPlayerName}
            setIsLoadingCallback={setIsLoading}
            isLoading={isLoading}
            setPlayerIdCallback={setPlayerId}
            setWishlistCallback={setWishlist}
          />
        </Route>

        <Route exact path="/about">
          <AboutPage />
        </Route>

        <Route exact path="/store">
          {isLogin ? (
            <StorePage
              setIsLoginCallback={setIsLogin}
              storeOffers={storeOffers}
              storeTimeLeft={storeTimeLeft}
              playerName={playerName}
              setIsLoadingCallback={setIsLoading}
              bundles={bundles}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route exact path="/bundles">
          {isLogin ? (
            <BundlePage
              handleSelectCallback={handleSelect}
              bundles={bundles}
              wishlist={wishlist}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route exact path="/notify">
          {isLogin ? (
            <WishListPage
              handleSelectCallback={handleSelect}
              playerId={playerId}
              bundles={bundles}
              wishlist={wishlist}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Route>
    </Switch>
  );
}

export default App;
