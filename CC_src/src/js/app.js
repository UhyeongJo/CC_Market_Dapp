App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load products.
    $.getJSON('../products.json', function(data) {
      var productsRow = $('#productsRow');
      var productTemplate = $('#productTemplate');

      for (i = 0; i < data.length; i ++) {
        productTemplate.find('.panel-name').text(data[i].name);
        productTemplate.find('img').attr('src', data[i].picture);
        productTemplate.find('.product-company').text(data[i].company);
        productTemplate.find('.product-date').text(data[i].date);
        productTemplate.find('.product-price').text(data[i].price);
        productTemplate.find('.btn-buy').attr('data-id', data[i].id);

        productsRow.append(productTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: async function() {
        //Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
                App.web3Provider = web3.currentProvider;
        }else{
        //If no injected web3 instance is detected, fall back to Ganache
                App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
  },

  initContract: function() {
        $.getJSON('BuyProduct.json', function(data) {
                //Get the necessary contract artifact file and instantiate it with truffle-contract
                var BuyProductArtifact = data;
                App.contracts.BuyProduct = TruffleContract(BuyProductArtifact);

                //Set the provider for our contract
                App.contracts.BuyProduct.setProvider(App.web3Provider);

                //User our contract to retrieve and mark the bought products
                return App.markBought();
        });

        return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handleBuy);
  },

  markBought: function(customers, account) {
        var buyProductInstance;

        App.contracts.BuyProduct.deployed().then(function(instance){
                buyProductInstance = instance;

                return buyProductInstance.getCustomers.call();
        }).then(function(customers){
                for(i = 0; i < customers.length; i++){
                        if(customers[i] !== '0x0000000000000000000000000000000000000000'){
                                $('.panel-product').eq(i).find('button').text('Purchased').attr('disabled', true);
                        }
                }
        }).catch(function(err){
                console.log(err.message);
        });
  },

  handleBuy: function(event) {
        event.preventDefault();

        var productId = parseInt($(event.target).data('id'));

        var buyProductInstance;

        web3.eth.getAccounts(function(error, accounts){
               if(error){
                        console.log(error);
                }

                var account = accounts[0];

                App.contracts.BuyProduct.deployed().then(function(instance){
                        buyProductInstance = instance;

                        //Execute buy as a transaction by sending account
                        return buyProductInstance.buy(productId, {from: account});
                }).then(function(result){
                        return App.markBought();
                }).catch(function(err){
                        console.log(err.message);
                });
        });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});


