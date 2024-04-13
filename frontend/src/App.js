import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  async function connectWallet() {
    if (!connected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);
    } else {
      window.ethereum.selectedAddress = null;
      setConnected(false);
      setWalletAddress("");
    }
  }

  function displayAddress(addr) {
    return addr == ""
      ? ""
      : addr.substring(0, 6) + "..." + addr.substr(addr.length - 4, 4);
  }

  const walletAddressShort = displayAddress(walletAddress);

  return (
    <div class="topnav">
      <button className="elem" type="image" onClick={connectWallet}>
        {connected ? (
          <img src="icons8-green-circle-48.png"></img>
        ) : (
          <img src="icons8-red-circle-48.png"></img>
        )}
      </button>
      <p id="addr" className="elem">
        {walletAddressShort}
      </p>
    </div>
  );
}

export default App;
