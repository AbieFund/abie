import React, { Component } from "react";
import request from "superagent";
import { default as Web3 } from "web3";
import { default as contract } from "truffle-contract";
import Abie from "../../build/contracts/Abie.json";
import "../www/styles/Home.scss";
import { Loader } from "react-overlay-loader";

const TESTRPC_HOST = "ropsten.infura.io";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: false,
      balance: 0,
      addressContract: null,
      delegate: null,
      metaContract: null,
      accounts: null,
      askMembership: null,
      web3RPC: null,
      name: "",
      searchName: "",
      valueDeposit: 0,
      dataDeposit: "",
      proposals: [],
      statement: "",
      members: "",
      addresses: [
        {
          name: "0xf03003f0f1ca38b8d26b8be44469aba51f31d9f3",
          value: "0xf03003f0f1ca38b8d26b8be44469aba51f31d9f3"
        },
        {
          name: "0xc42e30da7cb0087e6ad9200f876b084e8f72c040",
          value: "0xc42e30da7cb0087e6ad9200f876b084e8f72c040"
        },
        { name: "Other", value: "Other" }
      ],
      search: "0xf03003f0f1ca38b8d26b8be44469aba51f31d9f3",
      loading: false,
      searchBox: false,
      donate: 0
    };
  }

  componentDidMount() {
    let AbieAddress = this.state.search;
    setTimeout(() => {
      if (typeof web3 !== "undefined") {
        this.setState({ web3: true });
        this.loadProposals(AbieAddress);
        this.loadMemberList(AbieAddress);
        this.loadStatements(AbieAddress);
      } else {
        alert("install Metamask or use Mist");
      }
    }, 1000);
  }

  loadProposals = address => {
    let meta = contract(Abie);
    this.setState({ metaContract: meta });
    meta.setProvider(web3.currentProvider);
    const web3RPC = new Web3(web3.currentProvider);
    this.setState({ web3RPC });
    // Get accounts.
    web3.eth.getAccounts((err, acc) => {
      this.setState({ accounts: acc });
      // Get Details
      meta
        .at(address)
        .then(contract => {
          this.setState({ addressContract: contract.address });
          this.getProposals(contract);
        })
        .catch(err => console.log(err));
    });
  };

  loadMemberList = address => {
    let meta = contract(Abie);
    this.setState({ metaContract: meta });
    meta.setProvider(web3.currentProvider);
    const web3RPC = new Web3(web3.currentProvider);
    this.setState({ web3RPC });
    web3.eth.getAccounts((err, acc) => {
      this.setState({ accounts: acc });
      meta
        .at(address)
        .then(contract => {
          this.setState({ addressContract: contract.address });
          this.getMembersList(contract);
        })
        .catch(err => console.log(err));
    });
  };

  loadStatements = address => {
    let meta = contract(Abie);
    this.setState({ metaContract: meta });
    meta.setProvider(web3.currentProvider);
    const web3RPC = new Web3(web3.currentProvider);
    this.setState({ web3RPC });
    web3.eth.getAccounts((err, acc) => {
      this.setState({ accounts: acc });
      meta
        .at(address)
        .then(contract => {
          this.setState({ addressContract: contract.address });
          this.getStatements(contract);
        })
        .catch(err => console.log(err));
    });
  };

  handleChange = field => ({ target: { value } }) => {
    if (value === "Other") {
      this.setState({ searchBox: true });
    } else {
      this.setState({ searchBox: false });
      this.setState({ [field]: value });
    }
  };

  handleChangeRequestAmount = value => {
    this.setState({
      valueDeposit: value
    });
  };

  handleChangePropsalName = value => {
    let hexValue = this.toHex(value);
    this.setState({
      name: hexValue
    });
  };

  handleChangeDonationValue = event => {
    this.setState({ donate: event.target.value });
  };

  handleChangeDescription = value => {
    let hexValue = `0x${this.toHex(value)}`;
    this.setState({
      dataDeposit: hexValue
    });
  };

  toHex = str => {
    let result = "";
    for (var i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  };

  fromHex = hex => {
    let string = "";
    for (var i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
  };

  search = () => {
    this.state.metaContract
      .at(this.state.search)
      .then(contract => {
        this.handleNameValue(contract.name());
        this.loadProposals(this.state.search);
        this.loadStatements(this.state.search);
        this.loadMemberList(this.state.search);
        return contract.contractBalance();
      })
      .then(result => {
        const etherValue = web3.fromWei(result, "ether");
        this.setState({ balance: etherValue });
      })
      .catch(err => console.log(err));
  };

  handleNameValue(name) {
    name.then(result => {
      this.setState({ name: result });
    });
  }

  getProposals = contract => {
    this.state.metaContract
      .at(this.state.addressContract)
      .then(contract => contract.nbProposalsFund())
      .then(result => [...new Array(result.toNumber()).keys()])
      .then(range =>
        Promise.all(range.map(i => contract.proposals(i))).then(results => {
          this.setState({ proposals: results });
        })
      )
      .catch(err => console.error(err));
  };

  getMembersList = contract => {
    this.state.metaContract
      .at(this.state.addressContract)
      .then(contract => contract.isValidMember(this.state.accounts[0]))
      .then(result =>
        result
          ? this.setState({ members: "You are a member of this DAO." })
          : this.setState({ members: "You are not a member of this DAO." })
      )
      .catch(err => console.error(err));
  };

  getStatements = contract => {
    this.state.metaContract
      .at(this.state.addressContract)
      .then(contract => contract.statement())
      .then(result => this.setState({ statement: result }))
      .catch(err => console.error(err));
  };

  setDelegate = () => {
    if (typeof this.state.delegate !== "undefined") {
      this.state.metaContract
        .at(this.state.addressContract)
        .then(contract =>
          contract.setDelegate(0, this.state.delegate, {
            from: this.state.accounts[0]
          })
        )
        .then(result => console.log(result))
        .catch(err => {
          console.error(err);
        });
    } else {
      console.log("Enter a valid data");
    }
  };

  askMembership = () => {
    this.state.metaContract
      .at(this.state.addressContract)
      .then(contract => {
        return contract.askMembership({
          value: web3.toWei(10, "ether"),
          from: this.state.accounts[4],
          gas: 4000000
        });
      })
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
      });
  };

  addProposal = () => {
    this.state.metaContract
      .at(this.state.addressContract)
      .then(contract => {
        return contract.addProposal(
          this.state.name,
          web3.toWei(this.state.valueDeposit, "ether"),
          this.state.dataDeposit,
          {
            value: web3.toWei(0.1, "ether"),
            from: this.state.accounts[0],
            gas: 4000000
          }
        );
      })
      .then(result => {
        console.log(result);
        //Non subtle rerending of the full page
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  };

  voteYes = idx => {
    this.state.metaContract
      .at(this.state.addressContract)
      .then(contract => {
        return contract.vote(idx, 1, {
          value: 0,
          from: this.state.accounts[0],
          gas: 4000000
        });
      })
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
      });
  };

  voteNo = idx => {
    this.state.metaContract
      .at(this.state.addressContract)
      .then(contract => {
        return contract.vote(idx, 2, {
          value: 0,
          from: this.state.accounts[0],
          gas: 4000000
        });
      })
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
      });
  };

  countVotes = idx => {
    this.setState({ loading: true });
    this.state.metaContract
      .at(this.state.search)
      .then(contract => {
        return contract.countVotes(idx, 5, {
          value: 0,
          from: this.state.accounts[0]
        });
      })
      .then(result => {
        this.setState({ loading: false });
        window.location.reload();
        console.log(result);
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  claim = idx => {
    this.setState({ loading: true });
    this.state.metaContract
      .at(this.state.addressContract)
      .then(contract => {
        return contract.claim(idx, {
          value: web3.toWei(0.1, "ether"),
          from: this.state.accounts[0]
        });
      })
      .then(result => {
        this.setState({ loading: false });
        window.location.reload();
        console.log(result);
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  donate = () => {
    const web3RPC = new Web3(web3.currentProvider);
    this.setState({ web3RPC });
    if (this.state.donate > 0) {
      this.setState({ loading: true });
      web3.eth.sendTransaction(
        {
          from: this.state.accounts[0],
          gasPrice: "20000000000",
          gas: 4000000,
          to: this.state.address,
          value: web3.toWei(this.state.donate, "ether"),
          data: "Donation"
        },
        (err, transactionHash) => {
          if (!err) {
            console.log("Tx ", transactionHash);
            this.setState({ loading: false });
          } else {
            console.log("Error ", err);
            this.setState({ loading: false });
          }
        }
      );
    }
  };

  render() {
    const {
      name,
      balance,
      searchBox,
      addresses,
      proposals,
      statement,
      members,
      loading
    } = this.state;
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <Loader fullPage loading={loading} />
            <h3>{this.fromHex(name.replace("0x", ""))}</h3>
            <h4 className="text-center">
              Balance: {balance.toString()} <span>ETH</span>{" "}
            </h4>
            {this.state.search && (
              <div className="card p-4">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Donation in ETH"
                    onChange={this.handleChangeDonationValue}
                  />
                  <div className="input-group-append">
                    <button
                      onClick={() => this.donate()}
                      className="btn-primary btn"
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="card p-4 mt-4">
              <div className="form-group">
                <label className="label-control">Contract Address</label>
                <select
                  className="form-control"
                  onChange={this.handleChange("search")}
                >
                  {addresses.map(item => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              {searchBox ? (
                <input
                  className="form-control mb-3"
                  type="text"
                  onChange={this.handleChange("search")}
                />
              ) : (
                ""
              )}
              <button className="btn btn-primary" onClick={this.search}>
                Search
              </button>
            </div>
            <div className="mt-3">
              <h4>Statement of intent:</h4>
              {this.fromHex(statement.replace("0x", ""))}
              <h5 className="text-center m-3">{members}</h5>
              <div className="form-group">
                <label className="control-label">Set Delegate</label>
                <input
                  className="form-control mb-2"
                  type="text"
                  onChange={this.handleChange("delegate")}
                />
                <button
                  className="btn btn-primary btn-block"
                  onClick={this.setDelegate}
                >
                  Add address
                </button>
              </div>
              <div className="form-group">
                <label className="label-control">Ask Membership</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  onChange={this.handleChange("askMembership")}
                />
                <button
                  className="btn btn-primary btn-block"
                  onClick={this.askMembership}
                >
                  Ask membership
                </button>
              </div>
              <div className="form-group">
                <label className="label-control">Add proposal&nbsp;</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  onChange={e => this.handleChangePropsalName(e.target.value)}
                  placeholder="Name of the proposition (hex)"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  onChange={e => this.handleChangeRequestAmount(e.target.value)}
                  placeholder="Requested amount (Wei)"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  onChange={e => this.handleChangeDescription(e.target.value)}
                  placeholder="Link IPFS"
                />
                <button
                  className="btn btn-primary btn-block"
                  onClick={this.addProposal}
                >
                  Submit add proposal
                </button>
              </div>

              <h4 className="text-center">Proposals</h4>

              <div className="card p-3">
                {proposals.map((obj, index) => (
                  <ul key={index} className="list-group">
                    <li className="list-group-item">
                      Proposal name: {this.fromHex(obj[0].replace("0x", ""))}
                    </li>
                    <li className="list-group-item">
                      recipient: {obj[3].toString()}
                    </li>
                    <li className="list-group-item">
                      value: {obj[4].toNumber()}
                    </li>
                    <li className="list-group-item">
                      data: {"" + web3.toAscii(obj[5])}
                    </li>
                    <li className="list-group-item">
                      proposalType: {obj[6].toNumber()}
                    </li>
                    <li className="list-group-item">
                      End Date:{" "}
                      {new Date(obj[7].toNumber()).toLocaleTimeString()}
                    </li>
                    <li className="list-group-item">
                      VoteYes: {obj[1].toNumber()}
                      voteNo: {obj[2].toNumber()}(
                      <i>Will be displayed once counted)</i>
                    </li>
                    <li className="list-group-item">
                      lastMemberCounted: {obj[8].toString()}
                    </li>
                    <li className="list-group-item">executed: {"" + obj[9]}</li>
                    <div className="btn-group mt-3">
                      <button
                        className="btn btn-success"
                        onClick={() => this.voteYes(index)}
                      >
                        Vote Yes
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.voteNo(index)}
                      >
                        Vote No
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.countAllVotes(index)}
                      >
                        Count all votes
                      </button>{" "}
                      <button
                        className="btn btn-default"
                        onClick={() => this.claim(index)}
                      >
                        Claim
                      </button>
                    </div>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
