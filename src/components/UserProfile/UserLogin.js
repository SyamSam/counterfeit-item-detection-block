import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, LoginContainer, LoginForm, FormField, Label, Input, Button, } from "../UserStyles/LoginUserStyles";
import { userLogin } from "../utils/API"; // Import the userLogin function from API.js

export default function UserLoginPage({ onLogin }) {
  useEffect(() => {
    document.title = "User Login";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Call the userLogin function with the provided email and password
      userLogin({ email, password })
        .then((data) => {
          // User login successful
          setError("");
          onLogin();
          window.location.href = "/user/home";
        })
        .catch((error) => {
          // User login failed
          setError(error.message);
        });
    } catch (error) {
      console.error("User login error:", error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <Container>
      <LoginContainer>
        <h2>Welcome User!!!</h2>
        <h3>Login (User)</h3>
        <LoginForm>
          <FormField>
            <Label>Email:</Label>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label>Password:</Label>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          {error && <p>{error}</p>}
          <Button onClick={handleLogin}>Login</Button>
        </LoginForm>
        <p>
          New Customer? <Link to="/user-signup">Click here to Sign Up</Link>
        </p>
        <p>
          <Link to="/admin-login">Admin? Click here</Link>
        </p>
        <p>
        <Link to="/verify-product">Want to Verify a Product? Click Here.</Link>
        </p>
      </LoginContainer>
    </Container>
  );
}
