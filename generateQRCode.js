const QRCode = require("qrcode");

// Function to generate QR code from data
const generateQRCode = async (data) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
};

module.exports = { generateQRCode };

