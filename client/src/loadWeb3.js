const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider); 

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
    {
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export const approveBTS = async(amount) => {
    
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts[0])
    // Define the ERC-20 token contract
    const contract = new web3.eth.Contract(balanceOfABI, tokenContract)
    // Execute balanceOf() to retrieve the token balance
    await contract.methods.approve(tokenHolder, amount).send({
        from: accounts[0],
        value: 0

    }); // 29803630997051883414242659

    // Convert the value from Wei to Ether  
    // const formattedResult = web3.utils.fromWei(result, "ether"); // 29803630.997051883414242659
    
    // console.log(formattedResult);
    // return formattedResult

}
