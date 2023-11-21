import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductData, deleteProduct } from "../utils/API";
import { toPng } from 'html-to-image'; // Import the toPng function
import QRCode from "qrcode.react";
import download from "downloadjs";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  // For Page Title
  useEffect(() => {
    document.title = "List Products";
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProductData();
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      // After successfully deleting the product, fetch the updated list of products
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDownloadQRCode = async (product) => {
    const qrCodeContainer = document.getElementById(`qr-code-${product.AuthenID}`);
    if (!qrCodeContainer) {
      console.error("QR code container not found.");
      return;
    }

    try {
      // Get the data URL of the QR code image
      const imageUrl = await toPng(qrCodeContainer); // Use the toPng function
      // Use the download function to trigger the download of the image
      download(imageUrl, `QR_Code_${product.AuthenID}.png`);
    } catch (error) {
      console.error("Error generating or downloading the QR code:", error);
    }
  }

  return (
    <>
      <div>
        <h1>Product List</h1>
        <Link to="/admin/register-product">Create a Product Item</Link>
      </div>
      <hr />
      <div>
        {products.map((product) => (
          <div key={product.AuthenID}>
            <h3>{product.AuthenItemName}</h3>
            <p>Price: RM {product.Price}</p>
            <p>Description: {product.Descriptions}</p>
            <p>Status: {product.AuthenStatus ? "Registered" : "Not Registered"}</p>
            {/* Display the QR code */}
            <div id={`qr-code-${product.AuthenID}`}>
              <QRCode
                value={`Link For Verification: http://localhost:3000/verify-product\nProduct ID:${product.AuthenID}\nCodeNumber: ${product.CodeNumber}`}
              />
            </div>
            {/* Display the Code Generated Number */}
            <p>Code Number: {product.CodeNumber}</p>
            {/* Download button for the QR code */}
            <button onClick={() => handleDownloadQRCode(product)}>Download QR Code</button>
            {/* Remove button */}
            <button onClick={() => handleRemoveProduct(product.AuthenID)}>Remove</button>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
