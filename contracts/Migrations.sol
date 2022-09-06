// SPDX-License-Identifier: MIT

pragma solidity 0.8.16; 

contract Migrations {
    address public owner = msg.sender;
    uint public last_completed_migration;

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        ); 
        _; 
    }

    // due to modifier, this function can only be called by owner
    function setcompleted(uint completed) public restricted {
        last_completed_migration = completed; 
    }

}