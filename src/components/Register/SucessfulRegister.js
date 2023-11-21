import React, {useEffect} from "react";

const SuccessfulRegister = () => {
  useEffect(() => {
    document.title = "Sucessful Register";
  }, []);
  return (
    <div>
      <h1>Registration Successful!</h1>
      <p>The Product QR has been successfully registered.</p>
      <p>Thank you for registering.</p>
      {/* Add any additional content or links here */}
    </div>
  );
};

export default SuccessfulRegister;
