const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7f36e75226334b0498ce7547dca2bc14'));

const tokenContract = "0x4Fb63A985099FcDd0004bf7b93511E8CA8a7E7A1"
const tokenHolder = "0x4Fb63A985099FcDd0004bf7b93511E8CA8a7E7A1"

export const getETHBalance = async() => {
    

    // const contract = new web3.eth.Contract(getETHBalanceABI, tokenContract)
    // console.log("bello");
    const result = await web3.eth.getBalance("0x4Fb63A985099FcDd0004bf7b93511E8CA8a7E7A1").then(result => web3.utils.fromWei(result,"ether"))

    console.log(result);
    return result; 
    // Execute balanceOf() to retrieve the token balance
    // const result =  contract.methods.getETHBalance().call() / 10**18; 
    // const result = await contract.methods.balanceOf(tokenHolder).call(); // 29803630997051883414242659
  
    // Convert the value from Wei to Ether  
    // const formattedResult = web3.utils.fromWei(String(result), "ether"); // 29803630.997051883414242659
    
    // console.log(formattedResult);
    // return formattedResult
    

}