/* global BigInt */

import React from "react"
import { load } from "./getWeb3"; 
import { getLiquidity } from "./getLiquidity"; 

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            admin: "", 
            account: "", 
            tokenContractAddress: "",
            tokenSaleContractAddress: "",
            amountOfEth: 0,
            amountOfBian: 0, 
            ethInputValue: 0,
            ethReceiveValue: 0, 
            bianInputValue: 0,
            bianReceiveValue: 0, 
            contractBTS: {}, 
            contractBT:  {}, 

        }
        this.connectWallet = this.connectWallet.bind(this);
        this.ethChange = this.ethChange.bind(this);
        this.bianchange = this.bianChange.bind(this); 
        this.initiateTransactionETHToBIAN = this.initiateTransactionETHToBIAN.bind(this); 
    }


    componentDidMount = async() => {
      const { ethFunds, bianFunds } = await getLiquidity(); 
      this.setState({
        amountOfEth: parseFloat(ethFunds), 
        amountOfBian: parseFloat(bianFunds), 
      })
    }


    initiateTransactionETHToBIAN = async() => {
      console.log(this.state.account); 
      const big = BigInt(this.state.bianReceiveValue * 10**18);
      console.log(this.state.account); 
      await this.state.contractBTS.buyToken(big, {
        from: this.state.account, 
        value: this.state.ethInputValue * 10**18, 
        gas: 500000
      })
    }

    initiateTransactionBIANToETH = async() => {
      console.log(this.state.account); 
     
      const bianInput = BigInt(parseInt(this.state.bianInputValue * 10**18));
      console.log(bianInput); 
      const ethReceive = BigInt(parseInt(this.state.ethReceiveValue * 10**18));
      console.log("pe"); 
      await this.state.contractBT.approve(this.state.contractBTS.address, bianInput, {
        from: this.state.account,
        value: 0,
        gas: 500000
      }); 
      console.log("asdfasdfasdfasdf"); 

      
      await this.state.contractBTS.buyETHWithBian(bianInput, ethReceive, {
        from: this.state.account,
        value: 0,
        gas: 500000
      }); 
      console.log("bbbbbb"); 
      
   


      /* 
      const big = BigInt(parseInt(this.state.ethReceiveValue * 10**18));
      console.log("This is being called"); 
      console.log(big); 
      await this.state.contractBTS.buyETH(parseInt(this.state.bianInputValue * 10**18), {
        from: this.state.account,
        value: big,
        gas: 50000
      })
      */ 
    }

    
    ethChange(e) {
      console.log(e);
      let y;
      console.log(this.state.amountOfBian); 
      if (e != "") {
        const k = this.state.amountOfBian * this.state.amountOfEth 
        // console.log(this.state.amountOfEth + parseFloat(e));
        y = this.state.amountOfBian - (k / (this.state.amountOfEth + parseFloat(e))) 
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
      console.log(e);
      let y;
      console.log(this.state.amountOfEth);
      if (e != "") {
        const k = this.state.amountOfBian * this.state.amountOfEth 
        y = this.state.amountOfEth - (k / (this.state.amountOfBian + parseFloat(e)))
      }
      console.log(y); 
      this.setState({
        bianInputValue: e,
        ethReceiveValue: y, 
      })
    }

    
    async connectWallet() {
        const {account, contractBTS, contractBT, transactionCount, tokensSold, transactions, myBT} = await load(); 
        // console.log(account);
        // console.log(ethFunds); 
        // console.log(bianFunds); 
        
        this.setState({
            account: account,
            contractBT: contractBT, 
         
            tokenContractAddress: contractBT.address, 
            tokenSaleContractAddress: contractBTS.address,
            contractBTS: contractBTS
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
            {/* <b>Admin (Contract Creator) Address</b>: {this.state.admin} */} 
            <b>Token Contract Address</b>: {this.state.tokenContractAddress} 
            <br/><b>Token Symbol</b>: BIAN
            <br/><b>Token Decimal</b>: 18
            <br/><br/><b>Token Sale Contract Address</b>: {this.state.tokenSaleContractAddress}
          </p>
          
          
          <p><b>Your Address</b>: {this.state.account}</p>
          <button onClick={this.connectWallet}>Connect Wallet</button> 
          
          <br/><br/><br/><hr/><h2>ETH → BIAN</h2>
          <p>Liquidity Pool Reserve: {this.state.amountOfEth} ETH, {this.state.amountOfBian} BIAN
            {/* <br/>Market Price: {this.state.amountOfEth / this.state.amountOfBian} ETH per BIAN
            <br/>Market Price: {this.state.amountOfBian / this.state.amountOfEth} BIAN per ETH */} 
            <br/>Constant k: {this.state.amountOfBian * this.state.amountOfEth}
          </p>
          <br/>
          
          Input ETH: <input value={this.state.ethInputValue} onChange={e => this.ethChange(e.target.value)}/><br/><br/>
          Receive BIAN: {this.state.bianReceiveValue}
          <br/><br/><b>Price</b>:  
          {this.state.bianReceiveValue == 0 || this.state.bianReceiveValue == undefined ? <></> : <> {this.state.ethInputValue / this.state.bianReceiveValue} ETH per BIAN </>}
          <br/>{this.state.bianReceiveValue == 0 || this.state.bianReceiveValue == undefined ? <></> : <> or {this.state.bianReceiveValue/ this.state.ethInputValue} BIAN per ETH </>}
          <br/><br/><button onClick={this.initiateTransactionETHToBIAN}>Confirm Transaction</button>
          <br/><br/><br/><hr/><h2>BIAN → ETH</h2>
          <p>Liquidity Pool Reserve: {this.state.amountOfEth} ETH, {this.state.amountOfBian} BIAN
            {/* <br/>Market Price: {this.state.amountOfEth / this.state.amountOfBian} ETH per BIAN
            <br/>Market Price: {this.state.amountOfBian / this.state.amountOfEth} BIAN per ETH */} 
            <br/>Constant k: {this.state.amountOfBian * this.state.amountOfEth}
          </p>
          <br/>
          Input BIAN: <input value={this.state.bianInputValue} onChange={e => this.bianChange(e.target.value)}/><br/><br/>
          Receive ETH: {this.state.ethReceiveValue}
          <br/><br/><b>Price</b>:
          {this.state.ethReceiveValue == 0 || this.state.ethReceiveValue == undefined ? <></> : <> {this.state.bianInputValue / this.state.ethReceiveValue} BIAN per ETH </>}
          <br/>{this.state.ethReceiveValue == 0 || this.state.ethReceiveValue == undefined ? <></> : <> or {this.state.ethReceiveValue/ this.state.bianInputValue} ETH per BIAN </>}
          <br/><br/><button onClick={this.initiateTransactionBIANToETH}>Confirm Transaction</button>
          </center>
          
      </>
    )
  }
}


export default App;
