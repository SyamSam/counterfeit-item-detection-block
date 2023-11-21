import Web3 from 'web3';
import { web3 } from 'truffle';

// Creating a new instance of Web3 using Truffle's provider
const web3Instance = new Web3(web3.currentProvider);

export default web3Instance;