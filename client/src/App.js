import React from "react"
import { load } from "./getWeb3"; 

class App extends React.Component {

    constructor() {
        super();
        this.state = {

        }
        this.connectWallet = this.connectWallet.bind(this);
    }

    
    connectWallet() {
        load().then(
            
        )
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
          <h1>BianCoin</h1>
          <button onClick={this.connectWallet}>Connect Coin</button> 
        </center>
      </>
    )
  }
}


export default App;
