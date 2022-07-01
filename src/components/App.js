import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import AboutPage from "./AboutPage";
import LoginPage from "./LoginPage";
import StorePage from "./StorePage";
import SkinPage from "./SkinPage";
import NotifyPage from "./NotifyPage";

function App() {
  return (
    <Switch>
      <Route>
        <Navbar />
        <Route exact path="/">
          <LoginPage />
        </Route>

        <Route exact path="/about">
          <AboutPage />
        </Route>

        <Route exact path="/store">
          <StorePage />
        </Route>

        <Route exact path="/skins">
          <SkinPage />
        </Route>

        <Route exact path="/notify">
          <NotifyPage />
        </Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
