// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract iViewNFT is ERC721, Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(address => bool) internal _allowed;

    uint private _royaltyPersantage = 10;

    mapping(uint => uint) internal _nft_price;
    mapping(uint => bool) public nftForSale;

    address tokenAddress;

    constructor(address _tokenAddress) ERC721("iViewNFT", "IVNFT") {
        _allowed[msg.sender] = true;
        tokenAddress = _tokenAddress;
    }


    // NFT Minting related functions

    function safeMint(address to, string memory uri, uint price) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _nft_price[tokenId] = price;
        nftForSale[tokenId] = false;
        emit NFTMinted(tokenId);
    }

    event NFTMinted(uint256 indexed _id);

    function mintNFT(string memory uri, uint price) public {
        require(
            _allowed[msg.sender],
            "You don't have permission to create new NFT."
        );
        require(price > 0, "Amount must be grater than 0.");
        safeMint(msg.sender, uri, price);
    }


    // Royalty defined by Contract related functions
    function getRoyaltyPercentage() public view returns (uint){
        return _royaltyPersantage;
    }

    function updateRoyaltyPercentage(uint newValue) public onlyOwner{
        _royaltyPersantage = newValue;
    }


    // NFT price update by NFT creator or Owner
    function getNFTPrice(uint tokenId) public view returns (uint){
        return _nft_price[tokenId]; 
    }

    function updateNFTPrice(uint tokenId, uint newPrice) public {
        require(newPrice > 0, "Amount must be grater than 0.");
        require(
            msg.sender == super.ownerOf(tokenId),
            "Only onwer of the NFT can update the price."
        );
        _nft_price[tokenId] = newPrice;
    }



    // control NFT is available for sale or not
    function enableNFTSale(uint tokenId) public{
        require(
            msg.sender == super.ownerOf(tokenId),
            "Only onwer of the NFT can update the price."
        );
        approve(address(this), tokenId);
        nftForSale[tokenId] = true;
    }

    function disableNFTSale(uint tokenId) public{
        require(
            msg.sender == super.ownerOf(tokenId),
            "Only onwer of the NFT can update the price."
        );
        approve(address(0), tokenId);
        nftForSale[tokenId] = false;
    }

    function getNFTSale(uint tokenId) public view returns(bool){
        return nftForSale[tokenId];
    }



    // NFT minting allowed to user or not related functions
    function requestMintingNFT() public {
        require(
            !_allowed[msg.sender],
            "You already requested for miniting application. Contact owner to allow."
        );
        _allowed[msg.sender] = false;
    }

    function approveMintingNFT(address to) public onlyOwner {
        require(to != super.owner(), "You already allowed.");
        require(_allowed[to] == true, "Already allowed for this user.");
        _allowed[to] = true;
    }

    function declineMintingNFT(address to) public onlyOwner {
        require(
            to != super.owner(),
            "You can not decline yourself for creating NFT."
        );
        require(_allowed[to] == false, "Already declined for this user.");
        _allowed[to] = false;
    }

    function isMintingAllowed() public view returns (bool) {
        return _allowed[msg.sender];
    }


    // Buy NFT functionality related functions
    function GetCoinAllowance() public view returns (uint256) {
        return IERC20(tokenAddress).allowance(msg.sender, address(this));
    }

    function GetContractCoinBalance() public view onlyOwner returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }

    event NFTSold(uint256 indexed _id, address _from, address _to, uint _royalty, uint _amount);
    
    function buyNFT(uint tokenId) public {

        require(_nft_price[tokenId] <= GetCoinAllowance(), "Please approve coin before transferring.");
        require(_nft_price[tokenId] <= IERC20(tokenAddress).balanceOf(msg.sender), "User doesn't have enough coin.");

        address seller = ownerOf(tokenId);
        uint coinAmount = _nft_price[tokenId];
        uint royalty = (coinAmount * _royaltyPersantage)/100;
        uint sellerAmount = coinAmount - royalty;
        
        // transfer coin from buyer to contract
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), _nft_price[tokenId]);

        // send coin seller after deducting royalty
        IERC20(tokenAddress).transfer(seller, sellerAmount);

        _transfer(seller, msg.sender, tokenId);
        nftForSale[tokenId] = false;
        emit NFTSold(tokenId, seller, msg.sender, royalty, coinAmount);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
