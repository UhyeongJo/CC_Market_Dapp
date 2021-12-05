const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = ["afd2168f63635b5235cc8b4d69730faa4ffbea5cfcfab7b7d7625f91656e7d9f"];

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    awsNetwork: {
	provider: () => {
	    return new HDWalletProvider(privateKeys, "http://internal-TestN-LoadB-1OB27N8UWZK7E-955331309.us-west-2.elb.amazonaws.com:8545")
	},
	network_id: 1500,
	gas: 300000
    },
    develop: {
      port: 8545
    }
  }
};
