import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAdminData, deleteEmployee, updateEmployee } from "../utils/API.js";
import EmployeeEdit from "./EmployeeEdit";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editedEmployee, setEditedEmployee] = useState(null);


  useEffect(() => {
    document.title = "Employee List";
  }, []);
  useEffect(() => {
    // Fetch the data when the component mounts
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    getAdminData()
      .then((data) => {
        // Set the employees state with the data from the server
        setEmployees(data);
      })
      .catch((error) => {
        console.error("Error retrieving admin data:", error);
      });
  };

  const handleDelete = (AdminID) => {
    // Call the deleteEmployee function to delete the employee with the given AdminID
    deleteEmployee(AdminID)
      .then(() => {
        // After successful deletion, fetch the updated list of employees
        fetchEmployees();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };


  return (
    <div>
      <h1>Manage Accounts [Employees]</h1>
      <Link to="/admin/register-employee">
        <button>Register New Employee</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.AdminID}>
              <td>{employee.AdminID}</td>
              <td>{employee.FirstName}</td>
              <td>{employee.LastName}</td>
              <td>{employee.Email}</td>
              <td>{employee.ContactNumber1}</td>
              <td>
                {/* Pass the employee object with the AdminID property to EmployeeEdit component */}
                <Link to={`/admin/edit-employee/${employee.AdminID}`}>Edit</Link>
                <button onClick={() => handleDelete(employee.AdminID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editedEmployee && (
        // Pass the employee object with the AdminID property to EmployeeEdit component
        <EmployeeEdit
          employee={editedEmployee}
          onEdit={(updatedEmployee) => {
            // Here you can call your API to update the employee data using the updateEmployee function
            // Pass the updatedEmployee data to the API function and handle the response if needed
            updateEmployee(updatedEmployee)
              .then(() => {
                // Fetch the updated list of employees after successful update
                fetchEmployees();
                // Reset the editedEmployee state after successful update
                setEditedEmployee(null);
              })
              .catch((error) => {
                console.error("Error updating employee:", error);
              });
          }}
        />
      )}
    </div>
  );
}
