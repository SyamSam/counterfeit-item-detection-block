import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, LoginContainer, LoginForm, FormField, Label, Input, Button } from "../AdminStyles/LoginStyleAdmin";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Admin (Login)";
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      // Admin login successful
      onLogin();
      window.location.href = "/admin/home";
      console.log("Admin login successful!");
    } catch (error) {
      setError(error.message);
      console.error("Admin login error:", error);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <h2>Admin Login</h2>
        <LoginForm>
          <FormField>
            <Label>Email:</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </FormField>
          <FormField>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </FormField>
          <Button onClick={handleLogin}>Login</Button>
          {error && <p>{error}</p>}
        </LoginForm>

        <p>
          <Link to="/user-login">User? Click here</Link>
        </p>
      </LoginContainer>
    </Container>
  );
};

export default AdminLogin;
