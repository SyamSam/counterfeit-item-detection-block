// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QRCode {
    struct QRCodeInfo {
        string qrCodeData;
        bool isRegistered;
    }

    mapping(uint256 => QRCodeInfo) public qrCodes;

    event QRCodeRegistered(uint256 indexed authenID, string qrCodeData);

    function registerQRCode(uint256 authenID, string memory qrCodeData) external {
        // Check if the QR code is not already registered for the given authenID
        require(!qrCodes[authenID].isRegistered, "QR code already registered");

        qrCodes[authenID] = QRCodeInfo(qrCodeData, true);
        emit QRCodeRegistered(authenID, qrCodeData);
    }

    function getQRCode(uint256 authenID) external view returns (string memory) {
        require(qrCodes[authenID].isRegistered, "QR code not registered");
        return qrCodes[authenID].qrCodeData;
    }
}
