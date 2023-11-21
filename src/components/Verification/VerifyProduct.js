import React, { useState, useEffect } from "react";
import { fetchProductData } from "../utils/API"; // Import the getProductData function from API.js
import { Link } from "react-router-dom";
import "../ExternalStyle/verify-product.css";

const VerifyProduct = () => {
  useEffect(() => {
    document.title = "Verify Product";
  }, []);

  const [productId, setProductId] = useState("");
  const [userInput, setUserInput] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [productData, setProductData] = useState(null); // State to store fetched product data
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  const handleVerification = async () => {
    try {
      if (!productId || !userInput) {
        setErrorMessage("Please fill in both Product ID and Code Number.");
        return;
      } else {
        setErrorMessage("");
      }

      // Fetch product data for the entered product ID from the server
      const response = await fetchProductData(productId);
      if (response.error) {
        throw new Error("Product not found.");
      }

      // 6 digits of the codeNumber must be correct.
      const correctNumber = response.CodeNumber.toString();

      if (userInput === correctNumber) {
        setVerificationResult(true);
        setProductData(response); // Store the fetched product data in the state
      } else {
        setVerificationResult(false);
      }
    } catch (error) {
      console.error("Error verifying product:", error);
      setVerificationResult(false);
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Verification</h1>
      <div>
        <label htmlFor="productId">Product ID: </label>
        <input
          type="text"
          id="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter product ID here"
          required
        />
      </div>
      <div>
        <label htmlFor="codeNumber">Code : </label>
        <input
          type="text"
          id="codeNumber"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter code number here"
          required
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleVerification}>Verify</button>
      
      {verificationResult === null ? (
        <p className="heading">
          Please Enter the Product ID and it's Code that the product you have bought.
          <hr />
          [Refer to the QR Code you have scanned]
        </p>
      ) : verificationResult ? (
        <>
          <p>Product is Genuine!! Please Enter Your e-mail to claim your product legitimacy:</p>
          {productData && (
            <>
              <p>Product ID: {productData.AuthenID}</p>
              <p>Product Name: {productData.AuthenItemName}</p>
              <p>Description: {productData.Descriptions}</p>
              <p>Price: RM {productData.Price} </p>
              <div>
                <label htmlFor="user_email">Email: </label>
                <input
                  type="text"
                  id="user_email"
                  placeholder="Enter your email here"
                />
                <button>Claim</button>
                <h3>
                  Don't have an account yet?{" "}
                  <Link to="/user-signup">Register Here</Link>
                </h3>
              </div>
            </>
          )}
        </>
      ) : (
        <p>I'm sorry, the Product is a counterfeit. </p>
      )}
      <p>
      <Link to="/user-login">Click Here to go Login Page</Link>
      </p>
    </div>
    
  );
};

export default VerifyProduct;
