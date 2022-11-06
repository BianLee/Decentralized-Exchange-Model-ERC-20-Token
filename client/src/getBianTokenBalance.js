const Web3 = require('web3');
const web3 = new Web3(window.web3.currentProvider); 

// const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/7f36e75226334b0498ce7547dca2bc14'));

// Set the ERC-20 balanceOf() ABI
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

const tokenContract = "0x861A87be2F0b630e1da20b49065eFa4554f4514b"
const tokenHolder = "0x3e3cBFAA2d0e475A5109Bc325b72C07E66c3d8dD"

export const getBianTokenBalance = async() => {
    
    // Define the ERC-20 token contract
    const contract = new web3.eth.Contract(balanceOfABI, tokenContract)
    // Execute balanceOf() to retrieve the token balance
    const result = await contract.methods.balanceOf(tokenHolder).call(); // 29803630997051883414242659

    // Convert the value from Wei to Ether  
    const formattedResult = web3.utils.fromWei(result, "ether"); // 29803630.997051883414242659
    
    console.log(formattedResult);
    return formattedResult

}