/* 
import Web3 from 'web3';
import BianToken from "./contracts/BianToken.json"; 
import BianTokenSale from "./contracts/BianTokenSale.json";
const contract = require('@truffle/contract'); 

export const getLiquidity = async() => {
    const BTContract = contract(BianToken); 
    const BTSContract = contract(BianTokenSale);

    BTSContract.setProvider(window.web3.currentProvider);
    BTContract.setProvider(window.web3.currentProvider); 
    const contractBT = await BTContract.deployed(); 
    const contractBTS = await BTSContract.deployed();  
  
    console.log("bello"); 
    
    const asdf = await contractBTS.getBianBalance() / 10**18;
    console.log(asdf); 

    const bianFunds = await contractBTS.getBianBalanceSample() / 10**18;
    console.log(bianFunds);
    console.log(await contractBTS.getETHBalance() / 10**18); 
    const ethFunds = await contractBTS.getETHBalance() / 10**18;

    console.log(await contractBTS.getAddressOfToken()); 


  
    let tokenAddress = "0x399F1bd1497005dd65e639Cf8CAcbb3533383244";
    let walletAddress = "0x453101DacBf7E14f011Fc35A39601FB75Bbb3aff";

    

    return {bianFunds, ethFunds}; 

}
*/ 