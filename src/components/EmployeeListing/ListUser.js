import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserData, deleteUser, updateUser } from "../utils/API.js";
import UserEdit from "./UserEdit";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    document.title = "User List";
  }, []);

  useEffect(() => {
    // Fetch the data when the component mounts
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    getUserData()
      .then((data) => {
        // Set the users state with the data from the server
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });
  };

  const handleDelete = (UserID) => {
    // Call the deleteUser function to delete the user with the given UserID
    deleteUser(UserID)
      .then(() => {
        // After successful deletion, fetch the updated list of users
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div>
      <h1>Manage Accounts [Users]</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.UserID}>
              <td>{user.UserID}</td>
              <td>{user.User_FullName}</td>
              <td>{user.User_Email}</td>
              <td>**********</td>
              <td>
                {/* Pass the user object with the UserID property to UserEdit component */}
                <Link to={`/admin/edit-user/${user.UserID}`}>Edit</Link>
                <button onClick={() => handleDelete(user.UserID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editedUser && (
        // Pass the user object with the UserID property to UserEdit component
        <UserEdit
          user={editedUser}
          onEdit={(updatedUser) => {
            // Here you can call your API to update the user data using the updateUser function
            // Pass the updatedUser data to the API function and handle the response if needed
            updateUser(updatedUser)
              .then(() => {
                // Fetch the updated list of users after successful update
                fetchUsers();
                // Reset the editedUser state after successful update
                setEditedUser(null);
              })
              .catch((error) => {
                console.error("Error updating user:", error);
              });
          }}
        />
      )}
    </div>
  );
}
