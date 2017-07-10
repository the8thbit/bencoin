var Bencoin = artifacts.require("./Bencoin.sol");

contract('Bencoin', function(accounts) {
  it("should put 0 Bencoin in totalSupply", function() {
    var bencoin;

    return Bencoin.deployed().then(function(instance) {
      bencoin = instance;
    })
    .then(function() {
      return bencoin.totalSupply.call();
    }).then(function(balance) {
      assert.equal(
        balance.valueOf(),
        0,
        "0 wasn't in totalSupply"
      );
    });
  });


  it("should mint Bencoin correctly", function() {
    var bencoin;
    var account = accounts[0]

    return Bencoin.deployed().then(function(instance) {
      bencoin = instance;
    })

    .then(function() {
      return bencoin.balanceOf.call(account);
    }).then(function(balance) {
      // all accounts start with 0, so the balance of the account should be 0
      assert.equal(
        balance.valueOf(),
        0,
        "0 wasn't in the first account"
      );
    })

    .then(function() {
      bencoin.mintCoin(account, 10);
    }).then(function() {
      return bencoin.balanceOf.call(account);
    }).then(function(balance) {
      // 10 was added to 0, so the balance of the account should be 10
      assert.equal(
        balance.valueOf(),
        10,
        "10 wasn't in the first account"
      );
    })

    .then(function() {
      bencoin.mintCoin(account, 7);
    }).then(function() {
      return bencoin.balanceOf.call(account);
    }).then(function(balance) {
      // 7 was added to 10, so the balance of the account should be 17
      assert.equal(
        balance.valueOf(),
        17,
        "17 wasn't in the first account"
      );
    })

    .then(function() {
      bencoin.mintCoin(account, 0.123);
    }).then(function() {
      return bencoin.balanceOf.call(account);
    }).then(function(balance) {
      // you should NOT be able to mint a fraction of a coin
      // the balance of the account should still be 17
      assert.equal(
        balance.valueOf(),
        17,
        "17 wasn't in the first account"
      );
    });
  });


  it("should send coin correctly", function() {
    var bencoin;

    var amount;

    // Get initial balances of first and second account.
    var account_one = accounts[0]; // should be 0;
    var account_two = accounts[1]; // should be 0;

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_running_balance;
    var account_two_running_balance;

    return Bencoin.deployed().then(function(instance) {
      bencoin = instance;
    })

    .then(function() {
      amount = 17;
    }).then(function() {
      return bencoin.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return bencoin.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
    }).then(function() {
      // the balance of account one should start off empty
      assert.equal(
        account_one_starting_balance,
        amount,
        "Account one did not start with a balance of 17"
      );
      // the balance of account two should start off empty
      assert.equal(
        account_two_starting_balance,
        0,
        "Account two did not start with a balance of 0"
      );
    })

    .then(function() {
      amount = 5;
    }).then(function() {
      return bencoin.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return bencoin.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
    }).then(function() {
      return bencoin.transfer(account_two, amount);
    }).then(function() {
      return bencoin.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_running_balance = balance.toNumber();
    }).then(function(balance) {
      return bencoin.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_running_balance = balance.toNumber();
    }).then(function() {
      // 5 was taken from 17, so the balance of account one should be 12
      assert.equal(
        account_one_running_balance,
        account_one_starting_balance - amount,
        "Amount wasn't correctly taken from the sender"
      );
      // 5 was added to 0, so the balance of account two should be 5
      assert.equal(
        account_two_running_balance,
        account_two_starting_balance + amount,
        "Amount wasn't correctly sent to the receiver"
      );
    })

    .then(function() {
      amount = 3;
    }).then(function() {
      return bencoin.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return bencoin.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
    }).then(function() {
      return bencoin.transfer(account_two, amount);
    }).then(function() {
      return bencoin.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_running_balance = balance.toNumber();
      return bencoin.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_running_balance = balance.toNumber();
    }).then(function() {
      // 3 was taken from 12, so the balance of account one should be 9
      assert.equal(
        account_one_running_balance,
        account_one_starting_balance - amount,
        "Amount wasn't correctly taken from the sender"
      );
      // 3 was added to 5, so the balance of account two should be 8
      assert.equal(
        account_two_running_balance,
        account_two_starting_balance + amount,
        "Amount wasn't correctly sent to the receiver"
      );
    });
  });
});
