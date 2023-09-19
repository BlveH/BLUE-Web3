pragma solidity ^0.5.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm {
    string public name = "DApp Token Farm";
    DaiToken public daiToken;
    DappToken public dappToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DaiToken _daiToken, DappToken _dappToken) public {
        daiToken = _daiToken;
        dappToken = _dappToken;
    }

    //Stakes Tokens (Deposit)
    function stakeToken(uint _amount) public {
        //Transfer mock DaiTokens to this contract of staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        //Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //Add user to stakers array *only* if they haven't staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
    //Unstaking Tokens (Withdraw)

    //Issuing Tokens
}
