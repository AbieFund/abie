# Abie

Abie was first released on March 5th, 2017 under [MIT License](https://github.com/AbieFund/abie/blob/master/LICENSE) with the help of the Ethergency team.

## Intro

Abie is a DAO that includes a voting system and a minimalist membership system resistant to Sybil attacks. Only the vote of the members can trigger a transaction to the beneficiary. The 'liquid democracy' allows members that don't have any device or Internet access to express their opinion on each incoming proposal.

On [May-10-2018 01:58:02 PM +UTC](https://ropsten.etherscan.io/tx/0x76220369843ec5e7d612ccf3c2f07452e135ca606bf7a89e30b8b3e577a5774c), Abie has run as expected on Ropsten network.

It is deployed at [0xf03003f0f1ca38b8d26b8be44469aba51f31d9f3](https://ropsten.etherscan.io/address/0xf03003f0f1ca38b8d26b8be44469aba51f31d9f3). It has 2 members and holds 1 ETH.

## Test

Make sure you have latest versions of [npm](https://www.npmjs.com/), [Node](https://nodejs.org/en/), [Truffle](https://github.com/trufflesuite/truffle) and [Ganache](https://www.npmjs.com/package/ganache-cli) installed. Here's how install Truffle and Ganache:

```
npm install -g truffle
npm install -g ganache-cli
```
Run it:

```
yarn ganache-cli --port 9545
```

In a new tab:

```
git clone https://github.com/AbieFund/abie.git
cd abie
truffle migrate
truffle test
```
#### Versions

* node v9.4.0
* npm 5.7.1
* Ganache CLI v6.1.0 (ganache-core: 2.1.0)
* Truffle v4.0.5 (core: 4.0.5)
* Solidity v0.4.18 (solc-js)

## Run

```
npm i
npm start
```

In your browser, you can now open the interface on port 3000:  

[http://localhost:3000](http://localhost:3000)

## To do

* [Create an explorer](https://github.com/AbieFund/abie/projects/1#card-9604722)
* [Improve the interface](https://github.com/AbieFund/abie/projects/1#card-9604731)
* [Deploy a DAO to main net, donate 10 ETH and call for attacks](https://github.com/AbieFund/abie/projects/1#card-9604705)
* [Measure the participation and relevancy rates](https://github.com/AbieFund/abie/projects/1#card-9604708)

## Resources

* [Project Website](http://abie.fund/)
* [Abie Wiki](https://github.com/AbieFund/abie/wiki/Abie-Wiki)
* [Using Abie with Remix (video)](https://youtu.be/NCzbua9R_eE)
* [When you test Abie](https://imgur.com/a/m7fFvVi)

Feel free to join the [Riot](https://riot.im/app/#/room/#abie:matrix.org) discussion chan!
