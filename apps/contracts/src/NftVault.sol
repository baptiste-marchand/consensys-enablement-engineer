// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IERC721 {
    function transferFrom(address from, address to, uint256 tokenId) external;
    function ownerOf(uint256 tokenId) external returns (address);
}

contract NftVault {
    // Mapping from contract address and token ID to owner address
    mapping(address => mapping(uint256 => address)) public nftOwners;

    // Deposit an NFT into the vault
    function deposit(address nftContract, uint256 tokenId) external {
        IERC721 token = IERC721(nftContract);

        require(token.ownerOf(tokenId) == msg.sender, "Not the owner");

        token.transferFrom(msg.sender, address(this), tokenId);

        nftOwners[nftContract][tokenId] = msg.sender;
    }

    // Withdraw an NFT from the vault
    function withdraw(address nftContract, uint256 tokenId) external {
        require(nftOwners[nftContract][tokenId] == msg.sender, "Not the owner");

        IERC721 token = IERC721(nftContract);

        token.transferFrom(address(this), msg.sender, tokenId);

        delete nftOwners[nftContract][tokenId];
    }
}
