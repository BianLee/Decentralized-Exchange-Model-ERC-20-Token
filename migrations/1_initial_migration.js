const BianToken = artifacts.require("BianToken");
const BianTokenSale = artifacts.require("BianTokenSale");

module.exports = function(deployer) {

    deployer.deploy(BianToken).then(function() {
        return deployer.deploy(BianTokenSale, BianToken.address); 
    })
}