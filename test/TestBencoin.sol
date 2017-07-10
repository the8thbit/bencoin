pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Bencoin.sol";

contract TestBencoin {
  function testInitialTotalSupply() {
    Bencoin instance = Bencoin(DeployedAddresses.Bencoin());

    uint expected = 0;
    Assert.equal(instance.totalSupply(), expected, "totalSupply should have 0 Bencoin initially");
  }

  function testMintCoin() {
    Bencoin instance = Bencoin(DeployedAddresses.Bencoin());

    instance.mintCoin(msg.sender, 10);

    uint expected = 10;
    Assert.equal(instance.balanceOf(msg.sender), expected, "Owner should have 10 Bencoin after mint");    
  }
}
