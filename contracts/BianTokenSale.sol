// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16; 

import './BianToken.sol';
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/Strings.sol";



contract BianTokenSale {
    address payable public admin;
    // ethFunds is like the reserve ?? 
    address payable private ethFunds = payable(address(this));
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

    function getETHBalance() public view returns(uint256) {
        return address(this).balance; 
    }

    function getBianBalance() public view returns(string memory) {
        return Strings.toString(IERC20(address(token)).balanceOf(address(this))); 
    }
    function getBianBalanceSample() public view returns(uint256) {
       return IERC20(address(token)).balanceOf(address(this)); 
    }
    function getAddressOfToken() public view returns(address) {
        return address(token); 
    }

    // ETH --> BIAN
    function buyToken(uint256 _amount) public payable {
        // int bianTokenPriceETH = bianTokenPriceInETH();
        // require(int(msg.value) >= bianTokenPriceETH * int(_amount)); 
        // require(address(this).balance >= _amount);
       
        // buyer receiving token from vault? 
        token.transfer(msg.sender, _amount);
        // transfer the ETH of the buyer to us. 
        ethFunds.transfer(msg.value);

        // tokensSold += _amount; 
        // transaction[transactionCount] = Transaction(msg.sender, _amount);
        // transactionCount++;
        emit Sell(msg.sender, _amount); 
    }

    function approveAddress(uint256 _amount) public {
        token.approve(msg.sender, _amount); 
    }



    // BIAN --> ETH
    function buyETHWithBian(uint256 _bianInput, uint256 _ethReceive) public payable {
       
        // token.approve(address(this), _bianInput);
        token.transferFrom(msg.sender, address(this), _bianInput);
        address payable receiver = payable(msg.sender);
        receiver.transfer(_ethReceive); 


       /* 
     // int bianTokenPriceETH = bianTokenPriceInETH();
        // require(int(msg.value) >= bianTokenPriceETH * int(_amount)); 
   
        // IERC20(token).transferFrom(msg.sender, address(this), _amount);
        token.approve(msg.sender, msg.value); 
        token.transferFrom(msg.sender, address(this), msg.value); 
        require(_amount > 0); 
        // require(token.transfer(address(this), msg.value)); 
        // ethFunds.transfer(msg.sender, _amount); 
    */ 


    }

    function endSale() public {
        // only the admin can self destruct. 
        require(msg.sender == admin);
        uint256 amount = token.balanceOf(address(this));
        require(token.transfer(admin, amount)); 
        selfdestruct(payable(admin));
    }

    receive() external payable {

    }

}