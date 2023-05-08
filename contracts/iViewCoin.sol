// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract iViewCoin is ERC20, Ownable, ERC20Burnable {

    uint  _initial_supply = 1000 * (10**18);
    uint _price_eth = 1;


    constructor() ERC20("iViewCoin", "IVC") {
        _mint(msg.sender, _initial_supply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function updatePrice(uint newPrice) public onlyOwner {
        require(newPrice > 0, "New price of this coin must be grater than 0.");
        _price_eth = newPrice;
    }

    function buyCoin(uint amount) public payable {
        require(amount > 0, "Amount must be grater than 0.");
        require(super.balanceOf(super.owner()) > amount, "Insufficent coins remianing with Owner.");
        require(msg.value > (_price_eth * amount), "Pay correct amount to get required coins.");
        
        super.transferFrom(super.owner(), msg.sender, amount);
    }

    function withDrawAll() public onlyOwner {
		(bool success, ) = msg.sender.call{ value: address(this).balance }("");
		require(success, "Failed to withdraw money from coin contract.");
	}
}