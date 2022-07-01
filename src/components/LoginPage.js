import { React, useState } from "react";
import { Form, FloatingLabel, Spinner } from "react-bootstrap";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    //setIsLoading(true);
    console.log("Logging in!");
  };

  let loadingOrNot = null;
  if (isLoading) {
    loadingOrNot = <Spinner animation="border" />;
  } else {
    loadingOrNot = (
      <button className="login-btn" type="button" onClick={handleLogin}>
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
            <Form.Control size="lg" type="text" placeholder="Username" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control size="lg" type="password" placeholder="Password" />
          </FloatingLabel>
          <br />
          {loadingOrNot}
        </Form>
      </div>
      <div className="additional-info"></div>
    </div>
  );
}

export default LoginPage;
