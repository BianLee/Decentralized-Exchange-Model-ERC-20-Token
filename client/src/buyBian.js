const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider); 

const BianTokenSaleABI = [
        {
            "inputs": [
                {
                    "internalType": "contract BianToken",
                    "name": "_token",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_buyer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "Sell",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "approveAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_bianInput",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_ethReceive",
                    "type": "uint256"
                }
            ],
            "name": "buyETHWithBian",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "buyToken",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "endSale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBianBalance",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getETHBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "token",
            "outputs": [
                {
                    "internalType": "contract BianToken",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "tokenPriceUSD",
            "outputs": [
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "tokensSold",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "transaction",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "transactionCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
];


//const account = web3.eth.getCoinbase();

//var contract = new web3.eth.Contract(BianTokenSaleABI).at(tokenSaleContract); 




export const buyTokenFunction = async(amount, passedValue) => {

   // const MyContract = require("./contracts/BianTokenSale.json"); 
    const contract = new web3.eth.Contract(BianTokenSaleABI, tokenSaleContract)
  
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //console.log(accounts[0]);
    //contract.methods.buyToken(amount).call({from: accounts[0], value: passedValue})


    contract.methods.buyToken(amount).send({
        from: accounts[0],
        value: passedValue
    })


    //contract.buyToken(amount).send({from: accounts[0], value: passedValue});

    //web3.eth.sendTransaction({from: accounts[0], to: tokenSaleContract, value: passedValue})
   // contract.buyToken.sendTransaction(amount, {from: accounts[0], value: passedValue});

    // Execute balanceOf() to retrieve the token balance
    // contract.buyToken.sendTransaction(amount, { from: account, value: passedValue }); 

}

/* 
from: this.state.account, 
value: this.state.ethInputValue * 10**18, 
gas: 6000000
*/ 