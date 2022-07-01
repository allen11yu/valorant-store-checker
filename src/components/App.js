import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import AboutPage from "./AboutPage";
import LoginPage from "./LoginPage";
import StorePage from "./StorePage";
import SkinPage from "./SkinPage";
import NotifyPage from "./NotifyPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
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

        <Route exact path="/skins">
          <SkinPage />
        </Route>

        <Route exact path="/notify">
          <NotifyPage />
        </Route>
      </Route>
    </Switch>
  );
}

export default App;
