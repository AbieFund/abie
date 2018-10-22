import React, {Component} from 'react'
import request from 'superagent'
import {default as Web3} from 'web3'
import {default as contract} from 'truffle-contract'
import Abie from '../../build/contracts/Abie.json'
import '../www/styles/Home.scss'
import { Loader } from 'react-overlay-loader';

const TESTRPC_HOST = 'ropsten.infura.io'

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
    proposalName: '',
    searchName: '',
    valueDeposit: 0,
    dataDeposit: '',
    proposals: [],
    statement:'',
    members: '',
    addresses: [


      {name: '0x7f041abd5e84667b540370229b20a8fd4cdb8b09', value: '0x7f041abd5e84667b540370229b20a8fd4cdb8b09'},
      {name: '0xeee060a985c02d330ba43735bd50f1ba259ac883', value: '0xeee060a985c02d330ba43735bd50f1ba259ac883'},
      {name: '0xce73d3bb0beb4e75bd214bd9f4311bd7cf489845', value: '0xce73d3bb0beb4e75bd214bd9f4311bd7cf489845'},
      {name: '0xf03003f0f1ca38b8d26b8be44469aba51f31d9f3', value: '0xf03003f0f1ca38b8d26b8be44469aba51f31d9f3'},
      {name: '0xc42e30da7cb0087e6ad9200f876b084e8f72c040', value: '0xc42e30da7cb0087e6ad9200f876b084e8f72c040'}, {name:'Other', value: 'Other'}
    ],
    search: '0x7f041abd5e84667b540370229b20a8fd4cdb8b09',
    loading: false,
    searchBox: false
  }

  componentDidMount() {
    let AbieAddress = this.state.search;
    setTimeout(() => {
      if (typeof web3 !== 'undefined') {
        this.setState({web3: true})
        this.loadProposals(AbieAddress);
        this.loadMemberList(AbieAddress);
        this.loadStatements(AbieAddress);
      } else {
        alert("install Metamask or use Mist")
      }
    }, 200)
  }

  loadProposals = address => {
    let meta = contract(Abie)
    this.setState({metaContract: meta})
    meta.setProvider(web3.currentProvider)
    const web3RPC = new Web3(web3.currentProvider)
    this.setState({web3RPC})
    // Get accounts.
    web3
      .eth
      .getAccounts((err, acc) => {
        this.setState({accounts: acc})
        // Get Details
        meta
          .at(address)
          .then(contract => {
            this.setState({addressContract: contract.address})
            this.getProposals(contract);
          })
          .catch(err => console.log(err));
      })
  }

  loadMemberList = address => {
    let meta = contract(Abie)
    this.setState({metaContract: meta})
    meta.setProvider(web3.currentProvider)
    const web3RPC = new Web3(web3.currentProvider)
    this.setState({web3RPC})
    web3
      .eth
      .getAccounts((err, acc) => {
        this.setState({accounts: acc})
        meta
          .at(address)
          .then(contract => {
            this.setState({addressContract: contract.address})
            this.getMembersList(contract);
          })
          .catch(err => console.log(err));
      })
  }

  loadStatements = address => {
    let meta = contract(Abie)
    this.setState({metaContract: meta})
    meta.setProvider(web3.currentProvider)
    const web3RPC = new Web3(web3.currentProvider)
    this.setState({web3RPC})
    web3
      .eth
      .getAccounts((err, acc) => {
        this.setState({accounts: acc})
        meta
          .at(address)
          .then(contract => {
            this.setState({addressContract: contract.address})
            this.getStatements(contract);
          })
          .catch(err => console.log(err));
      })
  }

  handleChange = field => ({target: {
      value
    }}) => {
      if (value === 'Other') {
        this.setState({ searchBox: true })
      } else {
        this.setState({ searchBox: false })
        this.setState({[field]: value})
      }
    }

    handleChangeRequestAmount = value => {
      this.setState({
        valueDeposit: value
      })
    }

    handleChangePropsalName = value => {
      let hexValue = this.toHex(value);
      this.setState({
        proposalName: hexValue
      })
    }

    handleChangeDescription = value => {
      let hexValue = `0x${this.toHex(value)}`;
      this.setState({
        dataDeposit: hexValue
      })
    }

    toHex = (str) => {
      let result = '';
      for (var i=0; i<str.length; i++) {
        result += str.charCodeAt(i).toString(16);
      }
      return result;
    }

    fromHex = (hex) => {
      let string = '';
      for (var i = 0; i < hex.length; i += 2) {
        string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return string;
    }

  search = () => {
    this
      .state
      .metaContract
      .at(this.state.search)
      .then((contract) => {
        this.handleNameValue(contract.name())
        this.loadProposals(this.state.search);
        this.loadStatements(this.state.search);
        this.loadMemberList(this.state.search);
        return contract.contractBalance()
      })
      .then(result => {
        const etherValue = web3.fromWei(result, 'ether')
        this.setState({'balance': etherValue})
      })
      .catch(err => console.log(err))
  }

  handleNameValue(name) {
    name.then(result => {
      this.setState({name: result})
    });
  }

  getProposals = contract => {
    this
      .state
      .metaContract
      .at(this.state.addressContract)
      .then(contract => contract.nbProposalsFund())
      .then(result => [...new Array(result.toNumber()).keys()])
      .then(range => (Promise.all(range.map(i => contract.proposals(i))).then(results => {
        this.setState({proposals: results})
      })))
      .catch(err => console.error(err))
  }

  getMembersList = contract => {
    this
      .state
      .metaContract
      .at(this.state.addressContract)
      .then(contract => contract.isValidMember(this.state.accounts[0]))
      .then(result => (result) ? this.setState({ members: 'You are a member of this DAO.'}) : this.setState({ members: 'You are not a member of this DAO.'}))
      .catch(err => console.error(err))
  }

  getStatements = contract => {
    this
      .state
      .metaContract
      .at(this.state.addressContract)
      .then(contract => contract.statement())
      .then(result => this.setState({ statement: result }))
      .catch(err => console.error(err))
  }

  setDelegate = () => {
    if (typeof this.state.delegate !== 'undefined') {
      this
        .state
        .metaContract
        .at(this.state.addressContract)
        .then((contract) => contract.setDelegate(1, this.state.delegate, {from: this.state.accounts[0]}))
        .then(result => console.log(result))
        .catch(err => {
          console.error(err);
        })
    } else {
      console.log('Enter a valid data')
    }
  }

  askMembership = () => {
    this
      .state
      .metaContract
      .at(this.state.addressContract)
      .then((contract) => {
        return contract.askMembership({
          value: web3.toWei(0.001, "ether"),
          from: this.state.accounts[0],
          gas: 400000
        })
      })
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
      })
  }

  addProposal = () => {
    this
      .state
      .metaContract
      .at(this.state.addressContract)
      .then((contract) => {
        return contract.addProposal(this.state.proposalName, web3.toWei(this.state.valueDeposit, "ether"), this.state.dataDeposit, {
          value: web3.toWei(0.001, "ether"),
          from: this.state.accounts[0],
          gas: 400000
        })
      })
      .then(result => {
        console.log(result);
        //Non subtle rerending of the full page
        window
          .location
          .reload()
      })
      .catch(err => {
        console.error(err);
      })
  }

  voteYes = idx => {
    this
      .state
      .metaContract
      .at(this.state.addressContract)
      .then((contract) => {
        return contract.vote(idx, 1, {
          value: 0,
          from: this.state.accounts[0],
          gas: 400000
        })
      })
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
      })
  }

  voteNo = idx => {
    this
      .state
      .metaContract
      .at(this.state.addressContract)
      .then((contract) => {
        return contract.vote(idx, 2, {
          value: 0,
          from: this.state.accounts[0],
          gas: 400000
        })
      })
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
      })
  }

  countVotes = idx => {
    this.setState({ loading: true });
    this.state.metaContract.at(this.state.search)
        .then(contract => {
          return contract.countVotes(idx, 5, {
            value: 0,
            from: this.state.accounts[0]
          })
        })
        .then(result => {
          this.setState({ loading: false });
          window.location.reload();
          console.log(result);
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err)
        });
  }

  claim = idx => {
    this.setState({ loading: true });
    this.state.metaContract.at(this.state.addressContract)
        .then(contract => {
          return contract.claim(idx, {
            value: web3.toWei(0.001, "ether"),
            from: this.state.accounts[0],
          })
        })
        .then(result => {
          this.setState({ loading: false });
          window.location.reload();
          console.log(result);
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err)
        });
  }

  render() {
    const { name, balance, searchBox, addresses, proposals, statement, members, loading } = this.state;
    return (
      <div id="container">
        <Loader fullPage loading={loading} />
        <h2>{this.fromHex(name.replace("0x", ""))}</h2>
        <p>Balance: <strong>{balance
            .toString()} ETH</strong></p>

        <p>
        <strong><a href="https://kovan.etherscan.io/address/0x7f041abd5e84667b540370229b20a8fd4cdb8b09" >{this.state.search}</a></strong>
        </p>
        <p>
          <select onChange={this.handleChange('search')}>
            {
              addresses.map(item => <option key={item.value} value={item.value}>{item.name}</option>)
            }
          </select>
        </p>
        {
          searchBox ?
            <p>
              <input
                type="text"
                onChange={this.handleChange('search')}/>
            </p>
          : ''
        }
          <button onClick={this.search}>Search</button>

        <h1>{this.fromHex(statement.replace("0x", ""))}</h1>
        <p><small>{members}</small></p>
        <p>
          Set Delegate:&nbsp;
          <input type="text" onChange={this.handleChange('delegate')}/>
          &nbsp;<button onClick={this.setDelegate}>Add address</button>
        </p>
        <button onClick={this.askMembership}>Request membership</button>

        <p></p><p>
          <strong>Add proposal</strong></p><p>

          Proposal name: &nbsp;

          <input
            type="text"
            onChange={e => this.handleChangePropsalName(e.target.value)}
            placeholder="Improve X"/>&nbsp;&nbsp;

            Amount (ETH): &nbsp;
            <input
            type="text"
            onChange={e => this.handleChangeRequestAmount(e.target.value)}
            placeholder="0.01"/>&nbsp;&nbsp;

            Source: &nbsp;
            <input
            type="text"
            onChange={e => this.handleChangeDescription(e.target.value)}
            placeholder="https://goo.gl/feCXWZ"/>&nbsp;&nbsp;
          <button onClick={this.addProposal}>Submit proposal
          </button>
        </p>

        <p>
          Proposals
        </p>

        {proposals
          .map((obj, index) => (
            <ul key={index}>
              <li>proposal name: {this.fromHex(web3.toAscii(obj[0]))}</li>
              <li>recipient: {obj[3].toString()}</li>
              <li>value: {obj[4].toNumber()}</li>
              <li>data: <a href={'' + web3.toAscii(obj[5])}>{'' + web3.toAscii(obj[5])}</a></li>
              <li>proposalType: {obj[6].toNumber()}</li>
              <li>end date: {new Date(obj[7].toNumber()).toLocaleTimeString()}</li>
              <li>voteYes: {obj[1].toNumber()}</li>
              <li>voteNo: {obj[2].toNumber()}</li>
              <li>counted: {obj[8].toString()}</li>
              <li>executed: {'' + obj[9]}</li>
              <li>
                <button
                  style={{
                  color: "green"
                }}
                  onClick={() => this.voteYes(index)}>Vote Yes</button>
                &nbsp;
                <button
                  style={{
                  color: "red"
                }}
                  onClick={() => this.voteNo(index)}>Vote No</button>

              </li>
              <li>
              <button
                onClick={() => this.countVotes(index)}>Count votes</button>&nbsp;
                <button onClick={() => this.claim(index)}>Claim</button>
                  </li>
            </ul>
          ))}

      </div>
    )
  }
}

export default Home
