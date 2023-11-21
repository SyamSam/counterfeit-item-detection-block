// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QRCode {
    struct Authentication {
        uint256 AuthenID;
        string AuthenItemName;
        string Descriptions;
        uint256 AdminID;
        string AdminName;
        uint256 Price;
        string QRCode;
        uint8 AuthenStatus; // 0: Inactive, 1: Active, 2: Used, etc.
    }

    uint256 public nextAuthenID;
    mapping(uint256 => Authentication) public authentications;

    event AuthenCreated(uint256 authenID);

    // Create a new QR code authentication
    function createAuthen(
        string memory _itemName,
        string memory _description,
        uint256 _adminID,
        string memory _adminName,
        uint256 _price,
        string memory _qrCode
    ) external {
        uint256 authenID = nextAuthenID++;
        authentications[authenID] = Authentication(
            authenID,
            _itemName,
            _description,
            _adminID,
            _adminName,
            _price,
            _qrCode,
            0 // Set the initial status as 0 (Inactive)
        );
        emit AuthenCreated(authenID);
    }

    // Update the status of a QR code authentication
    function updateAuthenStatus(uint256 authenID, uint8 newStatus) external {
        require(authenID < nextAuthenID, "Invalid AuthenID");
        authentications[authenID].AuthenStatus = newStatus;
    }
}
