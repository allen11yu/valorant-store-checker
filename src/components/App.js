import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState } from "react";
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
          <LoginPage setIsLoginCallback={setIsLogin} />
        </Route>

        <Route exact path="/about">
          <AboutPage />
        </Route>

        <Route exact path="/store">
          {isLogin ? (
            <StorePage setIsLoginCallback={setIsLogin} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route exact path="/bundles">
          <BundlePage
            handleSelectCallback={handleSelect}
            selectedSkins={selectedSkins}
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
