import React from "react"
import { load } from "./getWeb3"; 

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            admin: "0x7695Fa3c8A4d58Ed8E2B15C608535C2e14b402f2", 
            account: "", 
            tokenContractAddress: "",
            tokenSaleContractAddress: "",
            amountOfEth: 0.063,
            amountOfBian: 500, 
            ethInputValue: 0,
            ethReceiveValue: 0, 
            bianInputValue: 0,
            bianReceiveValue: 0, 

        }
        this.connectWallet = this.connectWallet.bind(this);
        this.ethChange = this.ethChange.bind(this);
        this.bianchange = this.bianChange.bind(this); 
        this.initiateTransaction = this.initiateTransaction.bind(this); 
    }

    initiateTransaction(e) {
    
    }

    

    ethChange(e) {
      console.log(e);
      let y; 
      if (e != "") {
        
        // console.log(this.state.amountOfEth + parseFloat(e));
        y = this.state.amountOfBian - (31.5 / (this.state.amountOfEth + parseFloat(e))) 
      }
     
      console.log(y); 
      
      this.setState({
        ethInputValue: e, 
        bianReceiveValue: y, 
      })
      
      
      /*  
      let temp = this.state.amountOfEth + e; 
      console.log(temp); 
      
      //let y = this.state.amountOfBian - (31.5 / (this.state.amountOfEth + e))
      //console.log(y); 
      this.setState({
        ethInputValue: e
        
      })
      */ 
      
    } 
    bianChange(e) {
      this.setState({
        bianInputValue: e
      })
    }

    
    async connectWallet() {
        const {account, contractBTS, contractBT, ethFunds, transactionCount, tokensSold, transactions, myBT} = await load(); 
        console.log(account);
        
        this.setState({
            account: account,
            tokenContractAddress: contractBT.address, 
            tokenSaleContractAddress: contractBTS.address
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
          <h1>BianTokenDEX</h1>
          <p>
            <b>Admin (Contract Creator) Address</b>: {this.state.admin}
            <br/><br/><b>Token Contract Address</b>: {this.state.tokenContractAddress} 
            <br/><b>Token Symbol</b>: BIAN
            <br/><b>Token Decimal</b>: 18
            <br/><br/><b>Token Sale Contract Address</b>: {this.state.tokenSaleContractAddress}
          </p>
          
          
          <p><b>Your Address</b>: {this.state.account}</p>
          <button onClick={this.connectWallet}>Connect Wallet</button> 
          <br/><br/><br/><h2>ETH → BIAN</h2>
          <p>Liquidity Pool Reserve: {this.state.amountOfEth} ETH, {this.state.amountOfBian} BIAN
            <br/>Market Price: {this.state.amountOfEth / this.state.amountOfBian} ETH per BIAN
            <br/>Market Price: {this.state.amountOfBian / this.state.amountOfEth} BIAN per ETH
            <br/>Constant k: {this.state.amountOfBian * this.state.amountOfEth}
          </p>
          <br/>
          Input ETH: <input value={this.state.ethInputValue} onChange={e => this.ethChange(e.target.value)}/><br/><br/>
          Receive BIAN: {this.state.bianReceiveValue}
          <br/><br/><b>Price</b>:  
          {this.state.bianReceiveValue == 0 || this.state.bianReceiveValue == undefined ? <></> : <> {this.state.ethInputValue / this.state.bianReceiveValue} ETH per BIAN </>}
          <br/>{this.state.bianReceiveValue == 0 || this.state.bianReceiveValue == undefined ? <></> : <> or {this.state.bianReceiveValue/ this.state.ethInputValue} BIAN per ETH </>}
          <br/><br/><button onClick={this.initiateTransaction}>Confirm Transaction</button>
          </center>
          
      </>
    )
  }
}


export default App;
