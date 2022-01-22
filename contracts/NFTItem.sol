// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract NFTItem is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("GameItem", "ITM") {}
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // for opensea collection 
    // function contractURI() public pure returns (string memory) {
    //     return "https://ipfs.io/ipfs/QmXRCUyprvjxZis9Qo64ku9mTnbiohWcaJg67QTkhVExAW";
    // }
    function awardItem(address player, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
