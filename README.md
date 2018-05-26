# Abie

Abie was first released on March 5th, 2017 under [MIT License](https://github.com/AbieFund/abie/blob/master/LICENSE) with the help of the Ethergency team.

## Intro

Abie is a DAO that includes a voting system and a minimalist membership system resistant to Sybil attacks. Only the vote of the members can trigger a transaction to the beneficiary. The 'liquid democracy' allows members that don't have any device or Internet access to express their opinion on each incoming proposal.

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

## Instances on Ropsten:

| Date of deployment | Address | Balance |
| --- | --- | --- |
| [May-10-2018 01:58:02 PM +UTC](https://ropsten.etherscan.io/tx/0x76220369843ec5e7d612ccf3c2f07452e135ca606bf7a89e30b8b3e577a5774c) | [0xf03003f0f1ca38b8d26b8be44469aba51f31d9f3](https://ropsten.etherscan.io/address/0xf03003f0f1ca38b8d26b8be44469aba51f31d9f3) | 1 ETH |
| [May-23-2018 10:54:13 PM +UTC](https://ropsten.etherscan.io/tx/0xcf4ad25bc122c42986e71d6d96ce659280465ea71620289073cc0c9994731032) | [0xc42e30da7cb0087e6ad9200f876b084e8f72c040](https://ropsten.etherscan.io/address/0xc42e30da7cb0087e6ad9200f876b084e8f72c040) | 0.6 ETH |

## To do

* [Create a contract search engine](https://github.com/AbieFund/abie/projects/1#card-9604722)
* [Improve the interface](https://github.com/AbieFund/abie/projects/1#card-9604731)
* [Deploy a DAO to main net, donate 10 ETH and call for attacks](https://github.com/AbieFund/abie/projects/1#card-9604705)
* [Measure the participation and relevancy rates](https://github.com/AbieFund/abie/projects/1#card-9604708)

## Resources

* [Project Website](http://abie.fund/)
* [Abie Wiki](https://github.com/AbieFund/abie/wiki/Abie-Wiki)
* [Using Abie with Remix (video)](https://youtu.be/NCzbua9R_eE)
* [When you test Abie](https://imgur.com/a/m7fFvVi)

Feel free to join the [Riot](https://riot.im/app/#/room/#abie:matrix.org) discussion chan!
