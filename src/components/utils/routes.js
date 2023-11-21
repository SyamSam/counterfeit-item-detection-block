const express = require("express");
const router = express.Router();
const db = require("./database");

// Route to register a new product in the database
// Route to register a new product in the database
router.post("/register-product", (req, res) => {
  const { itemName, price, description, qrCode, authenStatus } = req.body;

  const sql = "INSERT INTO authenticate (AuthenItemName, Descriptions, Price, QRCode, AuthenStatus) VALUES (?, ?, ?, ?, ?)";
  const values = [itemName, description, price, qrCode, authenStatus];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error registering product:", error);
      res.status(500).json({ message: "Error registering product" });
    } else {
      console.log("Product registered successfully!");
      res.json({ message: "Product registered successfully" });
    }
  });
});

module.exports = router;
