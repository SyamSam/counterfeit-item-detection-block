import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Container, RegisterForm, RegisterContainer, FormField, Label, Input, Button } from "../UserStyles/UserRegisterStyles";
import { registerUser } from "../utils/API";

export default function UserRegisterPage() {
  useEffect(() => {
    document.title = "User Register";
  }, []);
  const [formData, setFormData] = useState({
    User_FullName: "",
    User_Email: "",
    User_Password: "",
    confirmPassword: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState({
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.User_Password !== formData.confirmPassword) {
      console.error("Password and Confirm Password must match.");
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;

      const response = await registerUser(userData);
      console.log("User registered successfully:", response);
      setRegistrationStatus({ success: true, error: null });
    } catch (error) {
      console.error("Error registering user:", error);
      setRegistrationStatus({ success: false, error: "Error registering user. Please try again." });
    }
  };

  return (
    <Container>
      <RegisterContainer>
        <h2>Create an Account</h2>
        <RegisterForm onSubmit={handleSubmit}>
          <FormField>
            <Label>Full Name:</Label>
            <Input
              type="text"
              name="User_FullName"
              value={formData.User_FullName}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </FormField>
          <FormField>
            <Label>Email:</Label>
            <Input
              type="email"
              name="User_Email"
              value={formData.User_Email}
              onChange={handleChange}
              placeholder="Email"
            />
          </FormField>
          <FormField>
            <Label>Password:</Label>
            <Input
              type="password"
              name="User_Password"
              value={formData.User_Password}
              onChange={handleChange}
              placeholder="Password"
            />
          </FormField>
          <FormField>
            <Label>Confirm Password:</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </FormField>

          {/* Conditional rendering of success and error messages */}
          {registrationStatus.success && <p>Registration successful! You can now log in.</p>}
          {registrationStatus.error && <p>Error: {registrationStatus.error}</p>}

          <Button type="submit">Sign Up</Button>
          <p>
            <Link to="/user-login">Already a user? Click here</Link>
          </p>
        </RegisterForm>
      </RegisterContainer>
    </Container>
  );
}
