import Web3 from 'web3';
import BianToken from "./contracts/BianToken.json"; 
import BianTokenSale from "./contracts/BianTokenSale.json";
const contract = require('@truffle/contract'); 

export const getLiquidity = async() => {
    const BTContract = contract(BianToken); 
    const BTSContract = contract(BianTokenSale);
    BTSContract.setProvider(window.web3.currentProvider);
    BTContract.setProvider(window.web3.currentProvider); 
    const contractBTS = await BTSContract.deployed(); 
    const contractBT = await BTContract.deployed(); 

    // const tempAddress = contractBTS.address; 
    // Getting balance of BIAN tokens in Token Sale Contract
    console.log("bello"); 
    const bianFunds = await contractBTS.getBianBalance() / 10**18;
    console.log(bianFunds);
    const ethFunds = await contractBTS.getETHBalance() / 10**18;

   
    
    // Getting balance of ETH tokens in Token Sale Contract
    // const ethFunds = window.web3.utils.fromWei(temp, 'ether');


    return {bianFunds, ethFunds}; 

}