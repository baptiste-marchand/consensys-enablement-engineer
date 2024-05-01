// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { Script } from "forge-std/Script.sol";

import { NftVault } from "../NftVault.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();

        NftVault nftVault = new NftVault();
    }
}
