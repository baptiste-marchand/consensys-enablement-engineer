// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { Script } from "forge-std/Script.sol";

import { MockERC721 } from "../src/MockERC721.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();

        MockERC721 erc721 = new MockERC721("FakeDoodles", "FD");
    }
}
