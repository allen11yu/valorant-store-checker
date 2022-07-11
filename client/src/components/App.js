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
  const [selectedSkins, setSelectedSkins] = useState(new Map());
  const [storeOffers, setStoreOffers] = useState([]);
  const [storeTimeLeft, setStoreTimeLeft] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bundles, setBundles] = useState([]);

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

    if (temp.has(uuid)) {
      temp.delete(uuid);
    } else {
      temp.set(uuid, skin);
    }
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
              bundles={bundles}
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
          <WishListPage
            handleSelectCallback={handleSelect}
            selectedSkins={selectedSkins}
          />
        </Route>
      </Route>
    </Switch>
  );
}

export default App;
