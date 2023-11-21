export const getAdminData = () => {
  return fetch("http://localhost:8000/api/admindata")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error retrieving admin data: ' + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error retrieving admin data:", error);
      throw error;
    });
};

export const adminLogin = (credentials) => {
  return fetch("http://localhost:8000/api/admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Admin login error:", error);
      throw error;
    });
};


export const userLogin = (credentials) => {
  return fetch("http://localhost:8000/api/user-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("User login error:", error);
      throw error;
    });
};

// API.js

// Function to fetch user data
export const getUserData = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/users");
    if (!response.ok) {
      throw new Error("Error retrieving user data: " + response.status);
    }
    return response.json();
  } catch (error) {
    console.error("Error retrieving user data:", error);
    throw error;
  }
};

// Function to delete a user
export const deleteUser = async (userID) => {
  try {
    const response = await fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting user: " + response.status);
    }
    return response.json();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Function to update a user
export const updateUser = async (userData) => {
  try {
    const response = await fetch(`http://localhost:8000/api/users/${userData.UserID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Error updating user: " + response.status);
    }
    return response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};


export const deleteEmployee = (AdminID) => {
  return fetch(`http://localhost:8000/api/employees/${AdminID}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error deleting employee: ' + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error deleting employee:', error);
      throw error;
    });
};

export const updateEmployee = (employee) => {
  return fetch(`http://localhost:8000/api/employees/${employee.AdminID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error updating employee: ' + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error updating employee:', error);
      throw error;
    });
};

export const registerEmployee = (employeeData) => {
  return fetch("http://localhost:8000/api/register-employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error registering employee: " + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error registering employee:", error);
      throw error;
    });
};


export const registerProduct = async (productData, userEmail, isGenuine) => {
  try {
    const response = await fetch("http://localhost:8000/api/register-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to register product.");
    }

    const data = await response.json();
    const AuthenID = data.AuthenID; // Get the AuthenID (Product ID) of the inserted product

    if (isGenuine) {
      // If the product is genuine, insert an entry into the purchased table
      const purchasedData = {
        Date: new Date().toISOString().slice(0, 10), // Set the purchase date to today's date
        UserID: userEmail, // Set the UserID to the user's email
        AuthenID,
        AuthenItemName: productData.AuthenItemName,
      };

      const purchasedResponse = await fetch(
        "http://localhost:8000/api/register-purchased",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchasedData),
        }
      );

      if (!purchasedResponse.ok) {
        throw new Error("Failed to register purchased product.");
      }
    } else {
      // If the product is counterfeit, insert an entry into the counterfeit table
      const counterfeitData = {
        CounterfeitName: productData.AuthenItemName,
        CounterfeitDesc: productData.Descriptions,
        Price: productData.Price,
        QRCode: productData.QRCode,
        AuthenStatus: 2, // Set the AuthenStatus to 2 for counterfeit products
      };

      const counterfeitResponse = await fetch(
        "http://localhost:8000/api/register-counterfeit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(counterfeitData),
        }
      );

      if (!counterfeitResponse.ok) {
        throw new Error("Failed to register counterfeit product.");
      }
    }

    return data; // Return the complete product data, including QRCode, from the server

  } catch (error) {
    console.error("Error registering the product:", error);
    return { error: "An error occurred while registering the product." };
  }
};


export const getProductData = () => {
  return fetch("http://localhost:8000/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error retrieving product data: ' + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error retrieving product data:", error);
      throw error;
    });
};

export const fetchProductData = async (productId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/products/${productId}`);
    if (!response.ok) {
      throw new Error("Error retrieving product data: " + response.status);
    }
    return response.json();
  } catch (error) {
    console.error("Error retrieving product data:", error);
    throw error;
  }
};



export const deleteProduct = (productId) => {
  return fetch(`http://localhost:8000/api/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error deleting product: " + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      throw error;
    });
};
  



export const registerUser = (userData) => {
  return fetch("http://localhost:8000/api/register-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error registering user: " + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error registering user:", error);
      throw error;
    });
};

