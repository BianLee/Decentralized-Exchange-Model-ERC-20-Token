const Web3 = require('web3');


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



export const getAccount = async() => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    var account = accounts[0]
    return { account } ;
}


