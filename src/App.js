import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";

//Verification Sections
import VerifyProduct from "./components/Verification/VerifyProduct";

// Admin Related Components
import HomeAdmin from "./components/AdminPages/HomeAdmin";
import AdminMain from "./components/AdminStyles/AdminMain";
import AdminNav from "./components/AdminStyles/AdminNav";
import AdminHeader from "./components/AdminStyles/AdminHeader";
import ManageReport from "./components/AdminPages/ReportMonthly";

// Login Sections on Admin
import AdminLogin from "./components/AdminProfile/AdminLogin";
import Logout from "./components/AdminProfile/AdminLogout";

// Login Sections on Users
import UserLogin from "./components/UserProfile/UserLogin";
import UserRegister from "./components/UserProfile/UserRegister";
import UserLogout from "./components/UserProfile/UserLogout"; 

// For components function on Admins
import EmployeeList from "./components/EmployeeListing/ListEmployee";
import EmployeeRegister from "./components/Register/RegisterEmployee";
import EmployeeEdit from "./components/EmployeeListing/EmployeeEdit";
import RegisterProduct from "./components/Register/RegisterProduct";
import ProductList from "./components/ProductListing/listofproducts";
import ScannedProducts from "./components/ProductListing/ScannedProducts";
import NotFound from "./components/ErrorPage/NotFound";
import UserList from "./components/EmployeeListing/ListUser";
import UserEdit from "./components/EmployeeListing/UserEdit";


// For components function on Users.
import UserHeader from "./components/UserPages/UserHeader";
import UserNav from "./components/UserPages/UserNav";
import UserMain from "./components/UserPages/UserMain";
import UserHome from "./components/UserPages/UserHome";
import PurchasedProducts from "./components/UserPages/UserPurchasedProducts";

export const activeStyle = {
  color: "white",
  filter: "drop-shadow(0 0 2px blue)",
};

export default function App() {
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleProductDropdownToggle = () => {
    setProductDropdownOpen(!productDropdownOpen);
    // Close the account dropdown
    setAccountDropdownOpen(false);
  };

  const handleAccountDropdownToggle = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
    // Close the product dropdown
    setProductDropdownOpen(false);
  };

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
  };

  const handleUserLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(false);
  };

  const handleLogout = () => {
    // Reset the logged-in state
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("isLoggedIn");
  };

  const handleUserLogout = () => {
    // Reset the user login state
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    // Check local storage for saved login state on app load
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState) {
      const parsedLoginState = JSON.parse(storedLoginState);
      setIsLoggedIn(parsedLoginState.isLoggedIn);
      setIsAdmin(parsedLoginState.isAdmin);
    }
  }, []);

  useEffect(() => {
    // Save login state to local storage whenever isLoggedIn or isAdmin changes
    const loginState = { isLoggedIn, isAdmin };
    localStorage.setItem("isLoggedIn", JSON.stringify(loginState));
  }, [isLoggedIn, isAdmin]);

  // Define a function to get the default route based on user role
  const getDefaultRoute = () => {
    if (isAdmin) {
      return "/admin/home";
    } else {
      return "/user-login"; // Change this to the desired user page
    }
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <>
          {isAdmin ? (
            <>
            {/*ADMIN PLACE*/ }
              <AdminHeader />
              <AdminNav>
                <ul>
                  <li>
                    <NavLink to="/admin/home" exact={true}>
                      Home
                    </NavLink>
                  </li>
                  <li onMouseEnter={handleProductDropdownToggle} onMouseLeave={handleProductDropdownToggle}>
                    <div className="dropdown">
                      <NavLink>Manage Product</NavLink>
                      {productDropdownOpen  && (
                        <div className="dropdown-content">
                          <NavLink exact to="/admin/list-products" activeStyle={activeStyle}>
                            Product List
                          </NavLink>
                          <NavLink exact to="/admin/scanned-products" activeStyle={activeStyle}>
                            Scanned Products
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </li>
                  <li onMouseEnter={handleAccountDropdownToggle} onMouseLeave={handleAccountDropdownToggle}>
                    <div className="dropdown">
                      <NavLink>Manage Account</NavLink>
                      {accountDropdownOpen  && (
                        <div className="dropdown-content">
                          <NavLink exact to="/admin/manage-employee" activeStyle={activeStyle}>
                            Manage Employee
                          </NavLink>
                          <NavLink exact to="/admin/manage-user" activeStyle={activeStyle}>
                            Manage User
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </li>
                  <li>
                    <NavLink to="/admin/manage-report" exact={true}>
                      Manage Report
                    </NavLink>
                  </li>
                </ul>
              </AdminNav>

              <AdminMain>
                <Routes>
                
                  <Route path="/admin/home" element={<HomeAdmin />} />
                  <Route path="/admin/register-employee" element={<EmployeeRegister />} />
                  <Route path="/admin/manage-employee" element={<EmployeeList />} />
                  <Route path="/admin/manage-user" element={<UserList />} />
                  <Route path="/admin/edit-user/:UserID" element={<UserEdit />} />
                  <Route path="/admin/edit-employee/:AdminID" element={<EmployeeEdit />} />
                  <Route path="/admin/list-products" element={<ProductList />} />
                  <Route path="/admin/scanned-products" element={<ScannedProducts />} />
                  <Route path="/admin/register-product" element={<RegisterProduct />} />
                  <Route path="/admin/manage-report" element={<ManageReport />} />
                  <Route path="/admin/profile" element={<div>Profile</div>} />
                  <Route path="/admin-logout" element={<Logout onLogout={handleLogout} />} />
                  <Route path="*" element={<NotFound />} />
                
                </Routes>
              </AdminMain>
              
               {/*ADMIN PLACE*/ }
            </>
          ) : (
            <>
            {/*USER PLACE*/ }
              <UserHeader />
              <UserNav>
                <ul>
                  <li>
                    <NavLink to="/user/home" exact={true}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/user/purchased-products" exact={true}>
                      Purchased Products
                    </NavLink>
                  </li>

                </ul>
              </UserNav>
              <UserMain>
                <Routes>
                  <Route path="/" element={<Navigate to={getDefaultRoute()} />} />
                  <Route path="/user/home" element={<UserHome />} />
                  <Route path="/user/purchased-products" element={<PurchasedProducts/>}/>
                
                  <Route path="/user-logout" element={<UserLogout onLogout={handleUserLogout} />} />
                </Routes>
              </UserMain>
              {/*USER PLACE*/ }
            </>
          )}
        </>
      ) : (
        <Routes>
          <Route path="/user-login" element={<UserLogin onLogin={handleUserLogin} />} />
          <Route path="/user-signup" element={<UserRegister />} />
          <Route path="/admin-login" element={<AdminLogin onLogin={handleAdminLogin} />} />
          <Route path="/" element={<Navigate to="/user-login" />} />
          <Route path="/verify-product" element={<VerifyProduct />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
