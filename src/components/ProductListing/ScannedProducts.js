import React, { useEffect } from "react";


export default function ProductList() {
  // For Page Title
  useEffect(() => {
    document.title = "Scanned Products";
  }, []);

  return (
    <>
<div>
      <h1>Scanned Products</h1>
      <p>Below here is the products that have been scanned by the customers</p>
      <p>Bawah list ini ialah produk yang sudah diskan QR Code dari pelanggan</p>
      {/* Scanned Product Lists */}
      
    </div>

      <hr />
    </>
  );
}
