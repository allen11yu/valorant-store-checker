import { React, useState } from "react";
import { Form, FloatingLabel, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function LoginPage({ setIsLoginCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [wrongLoginInfo, setWrongLoginInfo] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleError = (
    <p className="error-msg">Please check your username or password.</p>
  );

  const handleLogin = () => {
    if (username === "" || password === "") {
      setWrongLoginInfo(true);
      setIsLoading(false);
    } else {
      setWrongLoginInfo(false);
      setIsLoading(true);
      // fetch
      // if successfull
      console.log("Logging in!");
      console.log(username);
      console.log(password);
      setIsLoginCallback(true);
      history.push("/store");

      // not sucessful, display error message

      // no matter what, setIsLoading(false);
    }
  };

  let loadingOrNot = null;
  if (isLoading) {
    loadingOrNot = <Spinner animation="border" />;
  } else {
    loadingOrNot = (
      <button className="action-btn" type="button" onClick={handleLogin}>
        Login
      </button>
    );
  }

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
          {loadingOrNot}
          {wrongLoginInfo ? handleError : <div></div>}
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
