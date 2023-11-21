import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Line } from "react-chartjs-2";

// Leave the chart untouched as it gives the scales to work. otherwise ERROR
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";


export default function HomeAdmin() {
  useEffect(() => {
    document.title = "Home Page (Admin)";
  }, []);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Authenticated",
        data: [10, 20, 30, 25, 15, 35],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  return (
    <>
    <div>
      <h1>Home Page</h1>

      <h2>Welcome to the Website</h2>
      <p>This is the Main Page</p>
      

      <h2>QR Codes</h2>
      <p>This section is for QR Codes area that has been recently created.</p>

      <h2>QR Codes List that has been scanned</h2>
      <NavLink exact to="/admin/scanned-products">
        Scanned products
      </NavLink>

      <h2>Statistics</h2>
      <div>
        <h3>QR Code Statistics</h3>
        <Line data={data} options={options} />
      </div>

      </div>
    </>
  );
}
