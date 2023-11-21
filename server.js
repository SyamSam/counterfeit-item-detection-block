const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json()); // Add this line to parse JSON data in the request body

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Syamsul',
  password: 'syamsulafham@2A',
  database: 'mydatabase',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
  } else {
    console.log('Connected to the database!');
  }
});

// Function to generate a random 6-digit code number
const generateCodeNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateQRCode = (AuthenID, codeNumber) => {
  const linkToVerifyProduct = 'http://localhost:3000/verify-product';
  // Generate the QR code data with the link, product ID, and code number
  const qrCodeData = `${linkToVerifyProduct}\nProduct ID: ${AuthenID}\nCodeNumber: ${codeNumber}`;
  // You can use a QR code library here to generate the QR code image or simply return the QR code data as a string
  console.log('QR code generated');
  // Return the generated QR code data for testing purposes
  return qrCodeData;
};

app.post('/api/register-product', (req, res) => {
  const productData = req.body;

  // Perform validation on productData if necessary
  // For example, you can check if all required fields are provided.

  // Generate the CodeNumber
  const codeNumber = generateCodeNumber();

  // Insert the product data into the authenticate table without QRCode
  const insertQuery = `INSERT INTO authenticate (AuthenItemName, Descriptions, Price, AuthenStatus, CodeNumber) VALUES (?, ?, ?, ?, ?)`;
  const insertValues = [
    productData.itemName,
    productData.description,
    productData.price,
    0, // Set the initial authentication status as 0 (not authenticated)
    codeNumber, // Insert the generated CodeNumber into the database
  ];

  connection.query(insertQuery, insertValues, (insertError, insertResults) => {
    if (insertError) {
      console.error('Error inserting product data into the database: ', insertError);
      res.status(500).json({ error: 'An error occurred while registering the product.' });
    } else {
      console.log('Successfully inserted product data into the database.');
      const AuthenID = insertResults.insertId; // Get the AuthenID (Product ID) of the inserted product

      // Generate the QR code data for the product
      const qrCodeValue = generateQRCode(AuthenID, codeNumber);

      // Update the QRCode column with the generated QR code data
      const updateQuery = `UPDATE authenticate SET QRCode = ? WHERE AuthenID = ?`;
      const updateValues = [qrCodeValue, AuthenID];

      connection.query(updateQuery, updateValues, (updateError, updateResults) => {
        if (updateError) {
          console.error('Error updating QRCode in the database: ', updateError);
          res.status(500).json({ error: 'An error occurred while registering the product.' });
        } else {
          console.log('Successfully updated QRCode in the database.');
          res.status(200).json({ message: 'Product registered successfully.' });
        }
      });
    }
  });
});

// Define the route to register a purchased product
app.post('/api/register-purchased', (req, res) => {
  const purchasedData = req.body;

  // Insert the purchased data into the purchased table
  const query = 'INSERT INTO purchased (Date, UserID, AuthenID, AuthenItemName) VALUES (?, ?, ?, ?)';
  const values = [purchasedData.Date, purchasedData.UserID, purchasedData.AuthenID, purchasedData.AuthenItemName];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error inserting purchased data into the database: ', error);
      res.status(500).json({ error: 'An error occurred while registering the purchased product.' });
    } else {
      console.log('Successfully inserted purchased data into the database.');
      res.status(200).json({ message: 'Product registered as purchased successfully.' });
    }
  });
});

// Define the route to register a counterfeit product
app.post('/api/register-counterfeit', (req, res) => {
  const counterfeitData = req.body;

  // Insert the counterfeit data into the counterfeit table
  const query = 'INSERT INTO counterfeit (CounterfeitName, CounterfeitDesc, Price, QRCode, AuthenStatus) VALUES (?, ?, ?, ?, ?)';
  const values = [counterfeitData.CounterfeitName, counterfeitData.CounterfeitDesc, counterfeitData.Price, counterfeitData.QRCode, counterfeitData.AuthenStatus];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error inserting counterfeit data into the database: ', error);
      res.status(500).json({ error: 'An error occurred while registering the counterfeit product.' });
    } else {
      console.log('Successfully inserted counterfeit data into the database.');
      res.status(200).json({ message: 'Product registered as counterfeit successfully.' });
    }
  });
});



// Define the route to delete a product
app.delete('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;

  // Delete the product with the given productId from the authenticate table
  const query = 'DELETE FROM authenticate WHERE AuthenID = ?';
  connection.query(query, [productId], (error, results) => {
    if (error) {
      console.error('Error deleting product: ', error);
      res.status(500).json({ error: 'An error occurred while deleting the product.' });
    } else if (results.affectedRows === 0) {
      // If no rows were affected, the product with the given productId was not found
      res.status(404).json({ error: 'Product not found.' });
    } else {
      console.log('Successfully deleted product.');
      res.status(200).json({ message: 'Product deleted successfully.' });
    }
  });
});

// Define the route to authenticate admin login
app.post("/api/admin-login", (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are valid
  // You should use a proper authentication mechanism, like bcrypt, to securely compare the password with the hashed password stored in the database
  const query = "SELECT * FROM admin WHERE Email = ? AND Password = ?";
  const values = [email, password];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error querying the database: ", error);
      res.status(500).json({ error: "An error occurred while authenticating the admin." });
    } else if (results.length === 0) {
      // If no matching admin is found
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      // Admin login successful
      res.status(200).json({ message: "Admin login successful" });
    }
  });
});

// Define the route to register an employee
app.post('/api/register-employee', (req, res) => {
  const employeeData = req.body;

  // Perform validation on employeeData if necessary
  // For example, you can check if all required fields are provided.

  // Insert the employee data into the Admin table
  const query = 'INSERT INTO admin (FirstName, LastName, Email, ContactNumber1, ContactNumber2, Password, TikTok, Facebook, Instagram, AdminPrivileges) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    employeeData.FirstName,
    employeeData.LastName,
    employeeData.Email,
    employeeData.ContactNumber1,
    employeeData.ContactNumber2,
    employeeData.Password,
    employeeData.TikTok,
    employeeData.Facebook,
    employeeData.Instagram,
    employeeData.AdminPrivileges ? 1 : 0,
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error inserting data into the database: ', error);
      res.status(500).json({ error: 'An error occurred while registering the employee.' });
    } else {
      console.log('Successfully inserted data into the database.');
      res.status(200).json({ message: 'Employee registered successfully.' });
    }
  });
});

// Define the route to fetch admin data
app.get('/api/admindata', (req, res) => {
  // Fetch the admin data from the database
  const query = 'SELECT * FROM admin';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving admin data: ', error);
      res.status(500).json({ error: 'An error occurred while retrieving admin data.' });
    } else {
      console.log('Admin data retrieved successfully.');
      res.status(200).json(results);
    }
  });
});

// Define the route to delete an employee
app.delete('/api/employees/:id', (req, res) => {
  const AdminID = req.params.id;

  // Delete the employee with the given adminID from the Admin table
  const query = 'DELETE FROM admin WHERE AdminID = ?';
  connection.query(query, [AdminID], (error, results) => {
    if (error) {
      console.error('Error deleting employee: ', error);
      res.status(500).json({ error: 'An error occurred while deleting the employee.' });
    } else if (results.affectedRows === 0) {
      // If no rows were affected, the employee with the given adminID was not found
      res.status(404).json({ error: 'Employee not found.' });
    } else {
      console.log('Successfully deleted employee.');
      res.status(200).json({ message: 'Employee deleted successfully.' });
    }
  });
});

// Define the route to update an employee
app.put('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const employeeData = req.body;

  // Update the employee data in the Admin table
  const query = `
    UPDATE admin
    SET FirstName = ?, LastName = ?, Email = ?, ContactNumber1 = ?, ContactNumber2 = ?, 
    Password = ?, TikTok = ?, Facebook = ?, Instagram = ?, AdminPrivileges = ?
    WHERE AdminID = ?`;
  const values = [
    employeeData.FirstName,
    employeeData.LastName,
    employeeData.Email,
    employeeData.ContactNumber1,
    employeeData.ContactNumber2,
    employeeData.Password,
    employeeData.TikTok,
    employeeData.Facebook,
    employeeData.Instagram,
    employeeData.AdminPrivileges ? 1 : 0,
    employeeId,
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error updating employee: ', error);
      res.status(500).json({ error: 'An error occurred while updating the employee.' });
    } else if (results.affectedRows === 0) {
      // If no rows were affected, the employee with the given AdminID was not found
      res.status(404).json({ error: 'Employee not found.' });
    } else {
      console.log('Successfully updated employee.');
      res.status(200).json({ message: 'Employee updated successfully.' });
    }
  });
});


// Define the route to register a user
app.post('/api/register-user', (req, res) => {
  const userData = req.body;

  // Perform validation on userData if necessary
  // For example, you can check if all required fields are provided.

  // Insert the user data into the user table
  const query = 'INSERT INTO user (User_FullName, User_Email, User_Password) VALUES (?, ?, ?)';
  const values = [userData.User_FullName, userData.User_Email, userData.User_Password];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error inserting user data into the database: ', error);
      res.status(500).json({ error: 'An error occurred while registering the user.' });
    } else {
      console.log('Successfully inserted user data into the database.');
      res.status(200).json({ message: 'User registered successfully.' });
    }
  });
});

// Define the route to fetch product data
app.get('/api/products', (req, res) => {
  // Fetch all products from the authenticate table
  const query = 'SELECT * FROM authenticate';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving product data: ', error);
      res.status(500).json({ error: 'An error occurred while retrieving product data.' });
    } else {
      console.log('Product data retrieved successfully.');
      res.status(200).json(results);
    }
  });
});

app.get('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  console.log('Fetching product with ID:', productId);
  // Fetch the product from the database using the provided ID
  const query = 'SELECT * FROM authenticate WHERE AuthenID = ?';
  connection.query(query, [productId], (error, results) => {
    if (error) {
      console.error('Error retrieving product data: ', error);
      res.status(500).json({ error: 'An error occurred while retrieving product data.' });
    } else if (results.length === 0) {
      // If no product is found with the provided ID, return a 404 status
      res.status(404).json({ error: 'Product not found.' });
    } else {
      console.log('Product data:', results[0]);
      console.log('Product data retrieved successfully.');
      // Add cache-control header to disable caching
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json(results[0]); // Return the first product found (assuming the ID is unique)
    }
  });
});


// Define the route to authenticate user login
app.post("/api/user-login", (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are valid
  // You should use a proper authentication mechanism, like bcrypt, to securely compare the password with the hashed password stored in the database
  const query = "SELECT * FROM user WHERE User_Email = ? AND User_Password = ?";
  const values = [email, password];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error querying the database: ", error);
      res.status(500).json({ error: "An error occurred while authenticating the user." });
    } else if (results.length === 0) {
      // If no matching user is found
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      // User login successful
      res.status(200).json({ message: "User login successful" });
    }
  });
});


// Define the route to fetch user data
app.get('/api/users', (req, res) => {
  // Fetch all users from the user table
  const query = 'SELECT * FROM user';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving user data: ', error);
      res.status(500).json({ error: 'An error occurred while retrieving user data.' });
    } else {
      console.log('User data retrieved successfully.');
      res.status(200).json(results);
    }
  });
});

// Define the route to delete a user
app.delete('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;

  // Delete the user with the given userId from the user table
  const query = 'DELETE FROM user WHERE UserID = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error deleting user: ', error);
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
    } else if (results.affectedRows === 0) {
      // If no rows were affected, the user with the given userId was not found
      res.status(404).json({ error: 'User not found.' });
    } else {
      console.log('Successfully deleted user.');
      res.status(200).json({ message: 'User deleted successfully.' });
    }
  });
});

// Define the route to update a user
app.put('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const userData = req.body;

  // Update the user data in the user table
  const query = 'UPDATE user SET User_FullName = ?, User_Email = ?, User_Password = ? WHERE UserID = ?';
  const values = [userData.User_FullName, userData.User_Email, userData.User_Password, userId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error updating user: ', error);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    } else if (results.affectedRows === 0) {
      // If no rows were affected, the user with the given userId was not found
      res.status(404).json({ error: 'User not found.' });
    } else {
      console.log('Successfully updated user.');
      res.status(200).json({ message: 'User updated successfully.' });
    }
  });
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
