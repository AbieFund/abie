# EthCC 2019 Workshop info

* Network: Ropsten
* URL of the app: https://abie-fund.herokuapp.com/#/
* Contract address: 0xdac953477f1c53f828599411362ad4a1afda9b3d
* Ropsten Faucet: https://faucet.metamask.io/

# Abie

Abie was first released on March 5th, 2017 with the contribution of the [Ethergency](https://twitter.com/ethergency) team at [Hacker House Paris](http://www.hackerhouse.paris/).

## Intro

Abie is a minimalist DAO that includes a Sybil-resistant voting system based on liquid democracy. Members that don't have any device or Internet access can express their opinion on each incoming proposal.

It's live on Heroku: [try the app now!](https://abie-fund.herokuapp.com)

## Run

```
npm i
npm start
```

In your browser:

* Make sure that your Metamask is up and logged to Kovan
* Go to [http://localhost:3000](http://localhost:3000)
* Click on `Search`.

![alt text](https://i.imgur.com/YZjDTM8.png)

You can:

* Submit a proposal
* Vote (members only)
* Count the votes
* Claim a proposal

## Deployment

Don't do that if you don't know what you're doing. The team can't be held  liable or responsible for any damage which results from wild use of [Abie.sol](https://github.com/AbieFund/abie/blob/master/contracts/Abie.sol).

To deploy your own DAO, you can use [Remix](https://remix.ethereum.org).

* Copy the contract address and paste it in the app
* You can convert your string [here](https://codebeautify.org/string-hex-converter), then add a `0x` right before your converted string.
* Do the same for the `statement`.
* Now the `deploy` field should look like this:

`"0x4162696520446576","0x57652077616e7420746f207465737420416269652e",["<your addr>","<another member addr>","0x24cfc8f7ff347c158e6f06c37e94525892b4df44","0xeefb9234302128259d46ed9e223fbc48b5edb5d1"]`

To learn more about that, a complete tutorial is available on the [Wiki page](https://github.com/AbieFund/abie/wiki/Abie-Wiki).

## Next step

We're getting ready to deploy 2 pilots: Abie Dev (See the [1st proposal](https://abiefund.consider.it/abie-dev-first-proposal)) and Abie Sting.

## Resources

* New Slides (in French): "[Abie, un système de vote on-chain](https://slides.com/julienbrg/abie)"
* [Abie Wiki](https://github.com/AbieFund/abie/wiki/Abie-Wiki)
* [Trello board](https://trello.com/b/rsZKEFIm/abie)
* [Abie features](https://docs.google.com/spreadsheets/d/10MxQ_ptFI5Fpj6eNO2iS_5bISSuOUAxudCINUfAKNPc/edit?usp=sharing) (project management)

We're on [Twitter](https://twitter.com/AbieFund), [Facebook](https://www.facebook.com/abiefund/) and [Riot](https://riot.im/app/#/room/#abie:matrix.org), let's talk!
