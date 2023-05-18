// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract iViewCoin is ERC20, Ownable {

    uint  _initial_supply = 1000 * (10**18);
    uint _price_eth = 1;


    constructor() ERC20("iViewCoin", "IVC") {
        _mint(address(this), _initial_supply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function updatePrice(uint newPrice) public onlyOwner {
        require(newPrice > 0, "New price of this coin must be grater than 0.");
        _price_eth = newPrice;
    }

    function getPrice() public view returns(uint){
        return _price_eth;
    }

    function buyCoin(uint amount) public payable {
        require(amount > 0, "Amount must be grater than 0.");
        require(super.balanceOf(address(this)) >= amount, "All supplied coins are sold.");
        require(msg.value >= (_price_eth * amount), "Pay correct amount to get required coins.");
        
        _transfer(address(this), msg.sender, amount);
    }

    function withDrawAll() public onlyOwner {
		(bool success, ) = msg.sender.call{ value: address(this).balance }("");
		require(success, "Failed to withdraw money from coin contract.");
	}
}