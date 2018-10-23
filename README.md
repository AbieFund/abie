# Abie

Abie was first released on March 5th, 2017 with the outstanding contribution of the [Ethergency](https://twitter.com/ethergency) team at [Hacker House Paris](http://www.hackerhouse.paris/).

## Intro

Abie is a DAO that includes a voting system and a Sybil-resistant membership system. Only the vote of the members can trigger a transaction to the beneficiary. The 'liquid democracy' allows members that don't have any device or Internet access to express their opinion on each incoming proposal.

## Run

```
npm i
npm start
```

In your browser:

* Make sure that your Metamask is up and logged to Kovan
* Go to [http://localhost:3000](http://localhost:3000)
* Click on `Search`.

You're not a member of this DAO so you can't vote, but you can submit a proposal. 

Give it: 

* A name
* An amount (don't exceed the DAO balance)
* Any mini-URL

When you're done, please drop a msg in the [Riot chan](https://riot.im/app/#/room/#abie:matrix.org) so that somebody can vote it up. On this version the duration of the vote is set to 5 minutes! 

## Deployment

To deploy your own DAO, you can use [Remix](https://remix.ethereum.org) and fill out the `deploy` field with this: 

`"0x4162696520446576","0x57652077616e7420746f207465737420416269652e",["<your addr>","<your friend's addr>","0x24cfc8f7ff347c158e6f06c37e94525892b4df44","0xeefb9234302128259d46ed9e223fbc48b5edb5d1"]`

You can then copy the contract address and paste it in the app.

To learn more about that, a complete tutorial is available on the [Wiki page](https://github.com/AbieFund/abie/wiki/Abie-Wiki).

## Next step

Abie Dev will be deployed on Ethereum mainnet in the coming days. Every contributors vote. Here's [Abie Dev first proposal](https://abiefund.consider.it/abie-dev-first-proposal), it gives an idea of the expected contributions to develop the project.

## Resources

* [Project Website](http://abie.fund/)
* [Abie Wiki](https://github.com/AbieFund/abie/wiki/Abie-Wiki)

Feel free to join the [Riot](https://riot.im/app/#/room/#abie:matrix.org) discussion chan!
