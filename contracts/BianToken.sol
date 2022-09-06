// SPDX-License-Identifier: MIT

pragma solidity 0.8.16; 
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract BianToken is ERC20 {
    constructor() ERC20("BianToken", "BIAN") {
        _mint(msg.sender, 1000 * 10**18); 
    }
   
}