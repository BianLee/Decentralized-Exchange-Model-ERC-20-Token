/* global BigInt */

import React from "react"
import { load } from "./getWeb3"; 
// import { getLiquidity } from "./getLiquidity"; 
import { getBianTokenBalance } from "./getBianTokenBalance";
import { getETHBalance } from "./getETHBalance"; 
import { approveBTS } from "./loadWeb3";
import { getAccount } from "./getAccount"
import { buyTokenFunction } from "./buyBian" 
import { buyETHFunction } from "./buyETH" 

import "./App.css"

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
            tempETHValue: 2, 

        }
        this.connectWallet = this.connectWallet.bind(this);
        this.ethChange = this.ethChange.bind(this);
        this.bianchange = this.bianChange.bind(this); 
        this.initiateTransactionETHToBIAN = this.initiateTransactionETHToBIAN.bind(this); 
    }


    componentDidMount = async() => {
      // const { ethFunds } = await getLiquidity();
      const ethFunds = await getETHBalance();
      console.log(ethFunds);
      const format = await getBianTokenBalance();

      // const format = await getBianTokenBalance(); 
     
     
      this.setState({
        amountOfEth: parseFloat(ethFunds),
        amountOfBian: parseFloat(format), 
      })
    }


    initiateTransactionETHToBIAN = async() => {
      // console.log(this.state.account); 
      const big = BigInt(this.state.bianReceiveValue * 10**18);
      // console.log(this.state.account);
      // console.log(this.state.contractBTS.address)
      // await approveBTS;
      await approveBTS
      await buyTokenFunction(big, this.state.ethInputValue * 10**18);

      /* 
      await this.state.contractBT.approve(this.state.contractBTS.address, big, {
        from: this.state.account,
        value: 0,
        gas: 6000000

      });
      */
/* 
      await this.state.contractBTS.buyToken(big, {
        from: this.state.account, 
        value: this.state.ethInputValue * 10**18, 
        gas: 6000000

      })
      */ 
    }

    initiateTransactionBIANToETH = async() => {
      console.log(this.state.account); 
     
      const bianInput = BigInt(parseInt(this.state.bianInputValue * 10**18));
      console.log(bianInput); 
      const ethReceive = BigInt(parseInt(this.state.ethReceiveValue * 10**18));
      console.log("pe"); 

      await approveBTS(bianInput);

     console.log("hahahahahah");

      await buyETHFunction(bianInput, ethReceive); 

      /* 
      await this.state.contractBTS.buyETHWithBian(bianInput, ethReceive, {
        from: this.state.account,
        value: 0,
        gas: 500000
      }); 
      */ 


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
        const {account} = await getAccount(); 
        const {contractBTS, contractBT, transactionCount, tokensSold, transactions, myBT} = await load(); 
        // console.log(account);
        // console.log(ethFunds); 
        // console.log(bianFunds); 
        
        this.setState({
            account: account,
            // contractBT: contractBT, 
            /* tokenContractAddress: contractBT.address, 
            tokenSaleContractAddress: contractBTS.address,
            contractBTS: contractBTS */ 
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
        <div className="rectangle">

        <h1 style={{fontSize: "65px", color: "#CE1126"}}>BianDEX for BIANToken.</h1>
        <br/>
        <p style={{fontFamily: "Kanit", marginTop: "-20px", fontSize: "18px"}}>Bian Lee's experimental tokenomics project. $BIAN to the moon!</p>
        <span style={{fontSize: "18px", lineHeight: "25px"}}>
        BianDEX is a feeless decentralized exchange (DEX) that runs on the Ethereum blockchain. 
        BianToken (<i>$BIAN</i>) is an ERC-20 token with a fixed supply of 326. This DEX is based on the Automated Market Maker (AMM) system and constant product market maker model. I've spent more than $200 USD publishing smart contracts
        to the main Ethereum network (gas fees), and locking up initial ETH for respective amount of $BIAN. To get the project up and started, I'm willing to give out
        $BIAN (worth real money and tradeable for ETH) for free and distribute it around. So if you're my friend, just ask :) 
        <br/><br/>
        {/*  If you have interest in decentralized finance, web3, and crypto, be sure to follow me @bostonlobster on Vestr.io mobile app, where I write daily posts and produce one weekly article for the newsletter. */}
        <center>
        <p style={{fontSize: "27px", color: "black"}}>{Math.round(this.state.amountOfEth * 10000) / 10000} ETH against {Math.round(this.state.amountOfBian * 100) / 100} BIAN</p>
        </center>
        <br/>Above shows current values of assets locked in liquidity pool reserve at this moment. To verify, look up the contract address of BianDEX on etherscan: <mark style={{background: "#f5c162"}}>0x4Fb63A985099FcDd0004bf7b93511E8CA8a7E7A1</mark>.
        <br/><br/><br/>To add $BIAN to Metamask, click "import tokens" then paste in following contract address: <mark style={{background: "#f5c162"}}>0x586a03aD8E72FC30af0177Ec73Cac88C7816110b</mark>.
        Token symbol should be BIAN, with token decimal of 18. Be sure you are so under the Ethereum Mainnet network.

        <br/><br/><br/>
       
        {this.state.account.length == 0 ? <><div style={{background: "#CE1126", color: "white", textAlign: "center", cursor: "pointer"}} onClick={this.connectWallet}> Connect Metamask Wallet</div></> : 
        <><div style={{background: "green", color: "white", textAlign: "center"}}>{this.state.account}</div></>}
        
        
        </span>
        <hr/><br/>
        <span style={{fontSize:"20px"}}>
        Input ETH: <input className="inputVal" value={this.state.ethInputValue} onChange={e => this.ethChange(e.target.value)}/> →  
        Receive BIAN: {this.state.bianReceiveValue}
        <br/><span style={{fontSize: "16px", color: "#023020"}}>Price:  
          {this.state.bianReceiveValue == 0 || this.state.bianReceiveValue == undefined ? <></> : <> {Math.round(this.state.ethInputValue / this.state.bianReceiveValue * 10000) / 10000} ETH per BIAN </>}
          {this.state.bianReceiveValue == 0 || this.state.bianReceiveValue == undefined ? <></> : <> or {Math.round(this.state.bianReceiveValue/ this.state.ethInputValue * 100) / 100} BIAN per ETH </>}</span>
          <br/><br/><button style={{ backgroundColor: "#14213D", border: "none", color: "white", borderRadius: "2px", padding: "10px"}} onClick={this.initiateTransactionETHToBIAN}>Confirm Transaction (Buy $BIAN)</button>
        <br/><br/>
        <hr/><br/>
        Input BIAN: <input className="inputVal" value={this.state.bianInputValue} onChange={e => this.bianChange(e.target.value)}/> → 
        Receive ETH: {this.state.ethReceiveValue}
        <br/><span style={{fontSize:"16px", color: "#023020"}}>Price: 
        {this.state.ethReceiveValue == 0 || this.state.ethReceiveValue == undefined ? <></> : <> {Math.round(this.state.bianInputValue / this.state.ethReceiveValue * 100) / 100} BIAN per ETH </>}
         {this.state.ethReceiveValue == 0 || this.state.ethReceiveValue == undefined ? <></> : <> or {Math.round(this.state.ethReceiveValue/ this.state.bianInputValue * 10000)/10000} ETH per BIAN </>}
          <br/><br/><button style={{ backgroundColor: "#14213D", border: "none", color: "white", borderRadius: "2px", padding: "10px"}} onClick={this.initiateTransactionBIANToETH}>Confirm Transaction (Buy $ETH)</button>
        </span>
        </span>
        <br/><br/><hr/><hr/><br/>
        <span style={{fontSize: "18px", lineHeight: "25px"}}>
        I am a first-year college student majoring in Computer Science and Engineering. I'm currently interning for Vestr.io (a social finance startup) as an Analyst. I have extensive 
        experience developing full-stack web applications on MERN stack, and writing Ethereum blockchain smart contracts in Solidity language. I also make music, whether it's
        writing original piano compositions (see <a target="_blank" href="/music.pdf">my portfolio</a>) or digital production on DAW (stream on <a target="_blank" href="https://open.spotify.com/artist/5QHoUe5kwjvOfjfHrbVTBY?si=evgqyFYaRF2z8sWVcE2lYw">Spotify</a>).
        Welcome to my site!
        </span>
        <br/><br/><br/><br/>
        {/* <button style={{backgroundColor: "#14213D", border: "none", color: "white", borderRadius: "2px", padding: "10px"}} onClick={this.connectWallet}>Connect Metamask Wallet</button>
        */}

        
        
        </div>
           
        </center>
          
      </>
    )
  }
}


export default App;
