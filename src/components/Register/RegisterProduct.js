import React, { useState, useEffect } from "react";
import { Container, FormField, Label, Input, TextArea, Button } from "../AdminStyles/RegisterStyles";
import { registerProduct } from "../utils/API";
import QRCode from "qrcode.react";

export default function RegisterProduct() {
  useEffect(() => {
    document.title = "Register Product";
  }, [])
  ;
  

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [qrCode, setQRCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [AuthenID, setAuthenID] = useState(""); // State to store the AuthenID

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        itemName,
        price,
        description,
      };

      // Register the product on the server
      const response = await registerProduct(productData);

      if (response.message === "Product registered successfully.") {
        // If registration is successful, set the generated code number and show the QR code
        setGeneratedCode(response.data.codeNumber); // Access the codeNumber from the response data
        setAuthenID(response.data.AuthenID); // Access the authenID from the response data
        generateQRCode(response.data.AuthenID, response.data.codeNumber); // Pass authenID and codeNumber
        setIsRegistered(true);
      } else {
        console.error("Error registering the product:", response.error);
      }
    } catch (error) {
      console.error("Error registering the product:", error);
    }
  };

  const generateQRCode = (AuthenID, codeNumber) => {
    const linkToVerifyProduct = "http://localhost:3000/verify-product";
    // Concatenate the product data and code number to form the QR code value
    const qrCodeValue = `Link: ${linkToVerifyProduct}\nProduct ID: ${AuthenID}\nCodeNumber: ${codeNumber}`;
    setQRCode(<QRCode value={qrCodeValue} />);
  };
  

  return (
    <Container>
      <h1>Register The Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <FormField>
          <Label htmlFor="itemName">Item Name:</Label>
          <Input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="price">Price (RM):</Label>
          <Input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="description">Description:</Label>
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></TextArea>
        </FormField>

        <Button type="submit">Register</Button>
      </form>

      {isRegistered && (
        <>
          <h2>Registered Successfully!</h2>
          <p>Generated Code Number: {generatedCode}</p>
          <p>Product ID: {AuthenID}</p> {/* Display the AuthenID */}
          {/* Display the generated QR code */}
          {qrCode}
        </>
      )}
    </Container>
  );
}
