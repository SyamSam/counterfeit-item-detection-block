// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RegistryProduct {
    struct Product {
        uint256 productID;
        string itemName;
        uint256 price;
        string description;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductRegistered(uint256 indexed productID, string itemName, uint256 price, string description);

    function registerProduct(string memory _itemName, uint256 _price, string memory _description) external {
        productCount++;
        products[productCount] = Product(productCount, _itemName, _price, _description);
        emit ProductRegistered(productCount, _itemName, _price, _description);
    }
}
