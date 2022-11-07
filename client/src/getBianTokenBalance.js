const Web3 = require('web3');
const web3 = new Web3(window.web3.currentProvider); 

// const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7f36e75226334b0498ce7547dca2bc14'));

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

const tokenContract = "0x586a03aD8E72FC30af0177Ec73Cac88C7816110b"
const tokenHolder = "0x4Fb63A985099FcDd0004bf7b93511E8CA8a7E7A1"

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