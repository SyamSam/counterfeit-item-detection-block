import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeEdit = ({ employee, onEdit }) => {
  useEffect(() => {
    document.title = "Employee Edit";
  }, []);
  const navigate = useNavigate();
  const [editedEmployee, setEditedEmployee] = useState(null);

  useEffect(() => {
    // Set the editedEmployee state with the employee prop when it is available
    setEditedEmployee(employee);
  }, [employee]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedEmployee({
      ...editedEmployee,
      [name]: value,
    });
  };

  const handleEdit = () => { // Remove the event argument since we don't need it here
    // Call the onEdit function to update the employee data
    onEdit(editedEmployee);
    // Redirect back to the EmployeeList page after editing
    navigate("/admin");
  };
  if (!editedEmployee) {
    // If the editedEmployee is not available yet, you can show a loading state or return null
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Edit Employee</h3>
      <form onSubmit={handleEdit}>
        {/* Add your form fields here */}
        {/* For example: */}
        <div className="form-field">
          <label htmlFor="firstName">First Name (*):</label>
          <input
            type="text"
            id="firstName"
            name="FirstName"
            value={editedEmployee.FirstName}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add the rest of your form fields */}
        {/* ... */}
        <br />
        <button type="submit" className="update-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
