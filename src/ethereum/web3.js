import Web3 from 'web3';

// Create a new instance of Web3 using the Ganache provider
const web3 = new Web3("http://localhost:8545"); // Use the correct port for your local blockchain (Ganache)

export default web3;
