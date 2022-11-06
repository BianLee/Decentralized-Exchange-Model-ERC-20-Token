import Web3 from 'web3';
import BianToken from "./contracts/BianToken.json"; 
import BianTokenSale from "./contracts/BianTokenSale.json";
const contract = require('@truffle/contract'); 

export const load = async() => {

    await loadWeb3();

    const account = await loadAccount(); 
    const { contractBT, contractBTS } = await loadContracts(); 
    const { ethFunds, bianFunds, transactionCount, tokensSold, ethPriceN, transactions } = await loadVariables(contractBT, contractBTS);
    const bal = await contractBT.balanceOf(account); //balance on buyer's account (what's the unit?)
    const myBT = bal / 10**18;

   


    return {account, contractBTS, contractBT, ethFunds, bianFunds, transactionCount, tokensSold, transactions, myBT};
}



const loadVariables = async (contractBT, contractBTS) => {


   

    /* 
    const tempAddress = contractBTS.address; 
    // Getting balance of BIAN tokens in Token Sale Contract
    const bianFunds = await contractBTS.getBianBalance() / 10**18; 
    const temp = await window.web3.eth.getBalance(tempAddress);
    // Getting balance of ETH tokens in Token Sale Contract
    const ethFunds = window.web3.utils.fromWei(temp, 'ether');
    */ 

    const tCount = await contractBTS.transactionCount(); 
    const transactionCount = tCount.toNumber();
    const tSold = await contractBTS.tokensSold();
    const tokensSold = window.web3.utils.fromWei(tSold, 'ether');
    
    // Soemthing is wrong getETHPrice function ?? 
    // const ethPrice = await contractBTS.getETHPrice();
   // const ethPriceN = ethPrice.toNumber();

    const transactions = [];
    var j = 0; 
    /*
    As long as i >= 0 && j < 10 condition satisfies. 
    below for-loop returns 10 recent transactions (if exist).  
    */ 
    for (var i = transactionCount - 1; i >= 0 && j < 10; i--) {
        const t = await contractBTS.transaction(i); 
        j++;
        transactions.push(t); 
    }
    return {transactionCount, tokensSold, transactions  };
}


//web3.currentProvider can be wallets like MetaMask. 

/*  In this function, get two contracts while providing provider information (such as metamask)
    to them. 
*/ 
const loadContracts = async () => { 
    const BTContract = contract(BianToken); 
    BTContract.setProvider(window.web3.currentProvider);

    
    
    const BTSContract = contract(BianTokenSale);
    BTSContract.setProvider(window.web3.currentProvider);

    const contractBT = await BTContract.deployed();
    const contractBTS = await BTSContract.deployed();
    



    
    return { contractBT, contractBTS }; 

    /* await contract.deployed() is creating instance of MyContract
    that represents the default address managed by MyContract. 
    
    */ 
}

const loadAccount = async () => {
    const account = window.web3.eth.getCoinbase();
    
    return account;
}

// Process to connect to wallets like Metamask (?) 
const loadWeb3 = async() => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum); // ???
        try {
            // Request account access
            await window.ethereum.enable(); // ??? 
            // What does this line do? 
            Web3.eth.sendtransaction({ /* ... */ })
        } catch (error) {

        }
    } // Legacy dapp browser
    else if (window.web3) {
        window.web3 = new Web3(Web3.currentProvider);
        Web3.eth.sendTransaction({/*  */}); 
    } // Non-dapp browser
    else {
        console.log("Non ethereum browser detected. ")
    }
}