var Bencoin = artifacts.require("./Bencoin.sol");

module.exports = function(deployer) {
  deployer.deploy(Bencoin);
};
