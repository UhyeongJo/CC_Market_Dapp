pragma solidity ^0.4.24;

contract BuyProduct {

        address[16] public customers;

        //buy a product
        function buy(uint productId) public returns (uint) {
                require(productId >= 0 && productId <= 15);
                customers[productId] = msg.sender;
                return productId;
        }

        //retrieving the customers
        function getCustomers() public view returns (address[16]) {
                return customers;
        }
}



