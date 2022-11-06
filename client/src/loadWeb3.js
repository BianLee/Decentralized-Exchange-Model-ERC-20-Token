const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/7f36e75226334b0498ce7547dca2bc14'));
const web3 = new Web3(window.web3.currentProvider); 


const tokenContract = "0x861A87be2F0b630e1da20b49065eFa4554f4514b" 
const tokenSaleContract = "0x3e3cBFAA2d0e475A5109Bc325b72C07E66c3d8dD"

const balanceOfABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
];


// const account = web3.eth.getCoinbase();
const account = web3.eth.getCoinbase();
const contract = new web3.eth.Contract(balanceOfABI, tokenContract)



export function approveBTS(amount) {
    contract.methods.approve("0x3e3cBFAA2d0e475A5109Bc325b72C07E66c3d8dD", amount).send({
        from: account
    })
}

