import React from "react"
import { load } from "./getWeb3"; 

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            account: "", 
            contractAddress: "0xa7dAB845A24Ab0f504faA5fb54Ea4Cfff35F7183", 
        }
        this.connectWallet = this.connectWallet.bind(this);
        
    }


    
    async connectWallet() {
        const {account, contractBTS, contractBT, ethFunds, transactionCount, tokensSold, transactions, myBT} = await load(); 
        console.log(account);
        
        this.setState({
            account: account,
        })
    }


  render() {

    {/*
    load.then((e) => {
      console.log(e.account); 
    })
    */}
   

    return (
      <>
        <center>
          <h1>BianToken</h1>
          <p><b>Token Contract Address</b>: {this.state.contractAddress} 
            <br/><b>Token Symbol</b>: BIAN
            <br/><b>Token Decimal</b>: 18
            <br/><br/>
          </p>
          
          
          <p><b>Your Address</b>: {this.state.account}</p>
          <button onClick={this.connectWallet}>Connect Wallet</button> 
        </center>
      </>
    )
  }
}


export default App;
