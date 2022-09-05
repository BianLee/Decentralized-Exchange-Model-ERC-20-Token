// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import './BianToken.sol';
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol"; 


contract BianTokenSale {
    address payable public admin;
    // ethFunds is like the reserve ?? 
    address payable private ethFunds = payable(0x74C0F91422412949Dc63f8721Fd53B280A36a368);
    BianToken public token;
    uint256 public tokensSold; 
    int public tokenPriceUSD;
    AggregatorV3Interface internal priceFeed;
    
    // initialized at 0. 
    uint256 public transactionCount; 

    event Sell(address _buyer, uint256 _amount); 

    struct Transaction {
        address buyer;
        uint256 amount;
    }

    mapping(uint256 => Transaction) public transaction;

    constructor(BianToken _token) {
        priceFeed = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419); 
        tokenPriceUSD = 5;
        token = _token;
        admin = payable(msg.sender); 
    }

   function getETHPrice() public view returns (int) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return (price / 10**8);
    }

    function bianTokenPriceInETH() public view returns(int) {
        int ethPrice = getETHPrice();
        return tokenPriceUSD / ethPrice;
    }

    function buyToken(uint256 _amount) public payable {
        int bianTokenPriceETH = bianTokenPriceInETH();
        require(int(msg.value) >= bianTokenPriceETH * int(_amount)); 
        require(token.balanceOf(address(this)) >= _amount);
       
        // OpenZeppelin transfer() function is defined as follows:
        /* 
            function transfer(address to, uint256 amount) public virtual override returns (bool) {

            } 



        */ 

        // following needs to be true.

        // buyer receiving token from buyer? 
        require(token.transfer(msg.sender, _amount));
        
        // vault receiving eth from buyer? 
        ethFunds.transfer(msg.value);
        tokensSold += _amount; 
        transaction[transactionCount] = Transaction(msg.sender, _amount);
        transactionCount++;
        emit Sell(msg.sender, _amount); 
    }

    function endSale() public {
        // only the admin can self destruct. 
        require(msg.sender == admin);
        uint256 amount = token.balanceOf(address(this));
        require(token.transfer(admin, amount)); 
        selfdestruct(payable(admin));
    }


}