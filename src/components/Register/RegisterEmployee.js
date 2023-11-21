import React, { useState } from "react";
import "../ExternalStyle/register-container.css";

const RegisterEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber1, setContactNumber1] = useState("");
  const [contactNumber2, setContactNumber2] = useState("");
  const [password, setPassword] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [adminPrivileges, setAdminPrivileges] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the data object with the form data
    const employeeData = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      ContactNumber1: contactNumber1,
      ContactNumber2: contactNumber2,
      Password: password,
      Tiktok: tiktok,
      Facebook: facebook,
      Instagram: instagram,
      AdminPrivileges: adminPrivileges ? 1 : 0,
    };

    // Send the data to the server for insertion
    fetch("http://localhost:8000/api/register-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
        // Handle the response from the server here if needed
        // For example, show a success message or handle errors.

        if (data.message === "Employee registered successfully.") {
          setIsRegistered(true);
        }
      })
      .catch((error) => {
        console.error("Error registering employee:", error);
        // Handle any error that occurs during the fetch operation.
      });

    // Clear the form fields after submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNumber1("");
    setContactNumber2("");
    setPassword("");
    setTiktok("");
    setFacebook("");
    setInstagram("");
    setAdminPrivileges(false);
  };

  return (
    <div className="register-container">
      {isRegistered ? (
        <div>
          <h1>Employee Registered Successfully!</h1>
          <p>Your Employee has been successfully registered.</p>
          <p>Thank you for registering.</p>
        </div>
      ) : (
        <>
          <h1>Register Employee Here</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="firstName">First Name (*):</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="lastName">Last Name (*):</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email (*):</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="contactNumber1">Contact Number 1 (*):</label>
              <input
                type="text"
                id="contactNumber1"
                value={contactNumber1}
                onChange={(e) => setContactNumber1(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="contactNumber2">Contact Number 2:</label>
              <input
                type="text"
                id="contactNumber2"
                value={contactNumber2}
                onChange={(e) => setContactNumber2(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password (*):</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="tiktok">Tiktok:</label>
              <input
                type="text"
                id="tiktok"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="facebook">Facebook:</label>
              <input
                type="text"
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="instagram">Instagram:</label>
              <input
                type="text"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="adminPrivileges">Admin Privileges? (Y/N):</label>
              <select
                id="adminPrivileges"
                value={adminPrivileges ? "Y" : "N"}
                onChange={(e) => setAdminPrivileges(e.target.value === "Y")}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>
            <br />
            <button type="submit" className="register-button">
              Register
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default RegisterEmployee;
