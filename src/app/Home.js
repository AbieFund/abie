
import React, {Component} from 'react'
import request from 'superagent'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import Abie from '../../build/contracts/Abie.json'

import '../www/styles/Home.scss'

const TESTRPC_HOST = 'ropsten.infura.io/qnR8Jknp1cgCbw5mv5cU'
const TESTRPC_PORT = '9545'

class Home extends Component {

  state = {
    web3: false,
    balance: 0,
    addressContract: null,
    delegate: null,
    metaContract: null,
    accounts: null,
    askMembership: null,
    web3RPC: null,
    name: '',
    valueDeposit: 0,
    dataDeposit: '',
    proposals: [],
    search: '0xc42e30da7cb0087e6ad9200f876b084e8f72c040',
  }

  componentDidMount() {
    setTimeout(() => {
      if (typeof web3 !== 'undefined') {
        this.setState({web3: true})
        let meta = contract(Abie)
        this.setState({metaContract: meta})
        let provider = new Web3.providers.HttpProvider(`https://${TESTRPC_HOST}:${TESTRPC_PORT}`)
        meta.setProvider(provider)
        const web3RPC = new Web3(provider)
        this.setState({web3RPC})

      } else {
        alert("install Metamask or use Mist")
      }
    }, 1000)
  }

  getProposals = contract => {
    this.state.metaContract.at(this.state.addressContract)
      .then(contract => contract.nbProposalsFund())
      .then(result => [...new Array(result.toNumber()).keys()])
      .then(range => (
        Promise.all(range.map(i => contract.proposals(i)))
          .then(results => {
            this.setState({ proposals: results })
            // console.log(proposals)
        })
      ))
      .catch(err => console.error(err))
  }

  handleChange = field => ({ target: { value } }) => this.setState({ [field]: value })

  search = () => {
    this.state.metaContract.at(this.state.search)
      .then((contract) => {
        this.handleNameValue(contract.name())
        return contract.contractBalance()
      })
      .then(result => {
        const etherValue = web3.fromWei(result, 'ether')
        this.setState({
          'balance': etherValue
        })
        //window.location = `http://abie.fund/c/${this.state.search}`;
      })
      .catch(err => console.log(err))
  }

  handleNameValue(name) {
    name.then(result => {
      this.setState({
        name: result
      })
    });
  }

  setDelegate = () => {
    this.state.metaContract.at(this.state.addressContract)
      .then((contract) => contract.setDelegate(
        0,
        this.state.delegate,
        {from: this.state.accounts[0]}
      ))
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
      })
  }

  askMembership = () => {
    this.state.metaContract.at(this.state.addressContract)
      .then((contract) => {
        return contract.askMembership(
        {
          value: web3.toWei(10, "ether"),
          from: this.state.accounts[4],
          gas: 4000000
        }
      )})
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
      })
  }

  addProposal = () => {
    this.state.metaContract.at(this.state.addressContract)
      .then((contract) => {
        return contract.addProposal(
          this.state.name,
          this.state.valueDeposit,
          this.state.dataDeposit,
        {
          value: web3.toWei(1, "ether"),
          from: this.state.accounts[0],
          gas: 4000000
        }
      )})
      .then(result => {
        console.log(result);
        //Non subtle rerending of the full page
        window.location.reload()
      })
      .catch(err => {
        console.error(err);
      })
  }

  voteYes = idx => {
    this.state.metaContract.at(this.state.addressContract)
      .then((contract) => {
        return contract.vote(
          idx,
          1,
        {
          value: 0,
          from: this.state.accounts[0],
          gas: 4000000
        }
      )})
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
      })
  }

   voteNo = idx => {
    this.state.metaContract.at(this.state.addressContract)
      .then((contract) => {
        return contract.vote(
          idx,
          2,
        {
          value: 0,
          from: this.state.accounts[0],
          gas: 4000000
        }
      )})
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <div id="container">
        <h1>Abie</h1>
        <p>Balance : {this.state.balance.toString()} ETH</p>
        <p>{(this.state.name) ? `Name:  ${this.state.name}` : ''}</p>
        <p>
            Enter Address <input type="text" value={this.state.search} onChange={this.handleChange('search')} />
            <button onClick={this.search}>Search</button>
        </p>
        <p>
            Set Delegate <input type="text" onChange={this.handleChange('delegate')} />
            <button onClick={this.setDelegate}>Add address</button>
        </p>
        <p>
            Ask Membership <input type="text" onChange={this.handleChange('askMembership')} />
            <button onClick={this.askMembership}>Ask membership</button>
        </p>
        <p>
          Add proposal&nbsp;
          <input type="text" onChange={this.handleChange('name')} placeholder="Name of the proposition (hex)" />
          <input type="text" onChange={this.handleChangeRequestAmount} placeholder="Requested amount (Wei)" />
          <input type="text" onChange={this.handleChangeDescription} placeholder="Link IPFS" />
          <button onClick={this.addProposal}>Submit add proposal </button>
        </p>

        <p>
          Proposals
        </p>

          {this.state.proposals.map(
            (obj, index) =>
              (
                <ul key={index}>
                  <li>Proposal name: {web3.toAscii(obj[0])}</li>
                  <li>recipient: {obj[3].toString()}</li>
                  <li>value: {obj[4].toNumber()}</li>
                  <li>data: {'' + web3.toAscii(obj[5])}</li>
                  <li>proposalType: {obj[6].toNumber()}</li>
                  <li>End Date: {new Date(obj[7].toNumber()).toLocaleTimeString()}</li>
                  <li>VoteYes: {obj[1].toNumber()}    voteNo: {obj[2].toNumber()} (<i>Will be displayed once counted)</i></li>
                  <li>lastMemberCounted: {obj[8].toString()}</li>
                  <li>executed: {'' + obj[9]}</li>
                  <li>
                    <button style={{color: "green"}} onClick={() => this.voteYes(index)}>Vote Yes</button>
                    &nbsp;
                    <button style={{color: "red"}} onClick={() => this.voteNo(index)}>Vote No</button>
                  </li>
                </ul>
              )
          )}

      </div>
    )
  }
}

export default Home
