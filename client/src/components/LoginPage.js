import { React, useState } from "react";
import { Form, FloatingLabel, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function LoginPage({
  setIsLoginCallback,
  setStoreOffersCallback,
  setStoreTimeLeftCallback,
  setPlayerNameCallback,
  setIsLoadingCallback,
  isLoading,
}) {
  const [wrongLoginInfo, setWrongLoginInfo] = useState(false);
  const [username, setUsername] = useState("imafan13");
  const [password, setPassword] = useState("Valorantpassword1");
  const history = useHistory();

  const handleData = (data) => {
    console.log(data);
    setPlayerNameCallback(data.displayName);
    setStoreOffersCallback(data.store.SingleItemOffers);
    setStoreTimeLeftCallback(
      data.store.SingleItemOffersRemainingDurationInSeconds
    );
    setIsLoginCallback(true);
    history.push("/store");
  };

  const userLogin = async (username, password) => {
    await fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleData(data);
      })
      .catch((err) => console.log(err));
  };

  const handleError = (
    <p className="error-msg">Please check your username or password.</p>
  );

  const handleLogin = () => {
    if (username === "" || password === "") {
      setWrongLoginInfo(true);
      setIsLoadingCallback(false);
    } else {
      setWrongLoginInfo(false);
      setIsLoadingCallback(true);

      console.log("Logging in!");


      userLogin(username, password);
      //setIsLoginCallback(true); //remove
      //history.push("/store"); //remove
      // fetch
      // if successfull

      // not sucessful, display error message

      // no matter what, setIsLoading(false);
    }
  };

  return (
    <div className="login-page page-padding">
      <h1 className="valorant-heading center">VALORANT STORE CHECKER</h1>
      <h2 className="center">Please login with your Riot account below</h2>
      <div className="form-container center">
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              size="lg"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              size="lg"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FloatingLabel>
          <br />
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <button className="action-btn" type="button" onClick={handleLogin}>
              Login
            </button>
          )}
          {wrongLoginInfo ? handleError : <div></div>}
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
