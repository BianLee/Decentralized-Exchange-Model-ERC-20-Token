const Web3 = require('web3');

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