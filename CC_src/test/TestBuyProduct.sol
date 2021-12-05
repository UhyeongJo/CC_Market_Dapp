pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BuyProduct.sol";

contract TestBuyProduct {
        BuyProduct buyProduct = BuyProduct(DeployedAddresses.BuyProduct());

        //Testing the buy() function
        function testUserCanBuyProduct() public {
                uint returnedId = buyProduct.buy(8);
                uint expected = 8;
                Assert.equal(returnedId, expected, "Buy of product ID 8 should be recorded.");
        }

        //Testing retrieval of a single product's owner
        function testGetCustomerAddressByProductId() public {
                //Expected owner is this contract
                address expected = this;
                address customer = buyProduct.customers(8);
                Assert.equal(customer, expected, "Owner of product ID 8 shoud be recorded.");
        }

        //Testing retrieval of all sellers
        function testGetCustomerAddressByProductIdInArray() public {
                //Expected owner is this contract
                address expected = this;
                //Store customers in memory rather than contract's storage
                address[16] memory customers = buyProduct.getCustomers();
                Assert.equal(customers[8], expected, "Owner of product ID 8 should be recorded.");
        }
}
