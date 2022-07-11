import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import AboutPage from "./AboutPage";
import LoginPage from "./LoginPage";
import StorePage from "./StorePage";
import BundlePage from "./BundlePage";
import NotifyPage from "./NotifyPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [selectedSkins, setSelectedSkins] = useState(new Map());
  const [storeOffers, setStoreOffers] = useState([]);
  const [storeTimeLeft, setStoreTimeLeft] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bundles, setBundles] = useState([]);

  const dummyOffers = [
    "ef773863-472d-4d81-e50e-1d887cea40f4",
    "63a65008-4266-1117-fe3d-d1bf290b7da9",
    "2607b2c6-45f7-e75e-94f8-58a738773d5c",
    "37851a69-4719-d8ae-d305-49bcee8d853c",
  ];

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

  const handleSelect = (uuid, skin) => {
    let temp = new Map(selectedSkins);
    console.log("im clicked");

    if (temp.has(uuid)) {
      console.log("deselecting skin");
      temp.delete(uuid);
    } else {
      console.log("selecting skin");
      temp.set(uuid, skin);
    }
    console.log(temp);
    setSelectedSkins(temp);
  };

  //{isLogin ? <StorePage setIsLoginCallback={setIsLogin} /> : <Redirect to="/login" />} replace under /store route
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
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route exact path="/bundles">
          <BundlePage
            handleSelectCallback={handleSelect}
            selectedSkins={selectedSkins}
            bundles={bundles}
          />
        </Route>

        <Route exact path="/notify">
          <NotifyPage
            handleSelectCallback={handleSelect}
            selectedSkins={selectedSkins}
          />
        </Route>
      </Route>
    </Switch>
  );
}

export default App;
