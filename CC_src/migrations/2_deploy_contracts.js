var BuyProduct = artifacts.require("./BuyProduct.sol");

module.exports = function(deployer){
	deployer.deploy(BuyProduct);
};
