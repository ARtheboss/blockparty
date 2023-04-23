import './App.css';
import { useState, useEffect, useRef } from 'react'
import { ethers } from "ethers"
import Search from './components/Search.js';
import ProfileCircle from './components/ProfileCircle.js';
import SearchResult from './components/SearchResult.js';
import Announcements from './components/Announcements.js';
import BecomeHost from './components/BecomeHost.js';
import Abi from './assets/Blockparty.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [host, setHost] = useState(null)
  const [contract, setContract] = useState({})
  const [searchActive, setSearchActive] = useState(false);
  const [becomeHostActive, setBecomeHostActive] = useState(false);
  const [hostInfo, setHostInfo] = useState(false);
  const searchRef = useRef();
  const scrollDownRef = useRef();
  const announcements = [{"id": "ljasdkflasdf", "title": "Test title", "tag": "test", "body": "Hey guys! Thanks for being a part of my experience. I'm so happy to be a part of Blockparty. Thank you for donating."},
  {"id": "ljasdkflasadfsdf", "title": "New Content Coming Soon", "tag": "famous_person", "body": "I'm about to release a new YouTube video. Stay tuned. If I feel like it I may link it here early!"}];

  const web3Handler = async () => {
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    // Setup event listeners for metamask
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    })
    window.ethereum.on('accountsChanged', async () => {
      setLoading(true)
      web3Handler()
    })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Get provider from Metamask
    const signer = provider.getSigner()
    let myContract = await loadContract(signer)
    let host = await myContract.findMe();
    if(host.fee.toNumber() != 0){
      setHost(host);
    }
  }

  const loadContract = async (signer) => {
    // Get deployed copy of Decentratwitter contract
    const contract = new ethers.Contract("0x5fc8d32690cc91d4c39d9d3abcbd16989f875707", Abi.abi, signer);
    setContract(contract);
    setLoading(false);
    return contract;
  }
  
  window.addEventListener('load', web3Handler);

  const onScroll = function(e, searchActive = false){
    const y = -document.body.getBoundingClientRect().y + 100;
    const topVal = (searchActive || becomeHostActive) ? y : Math.max(window.innerHeight / 2 - 120, y);
    searchRef.current.setState({
      top: topVal + "px",
      large: topVal != y,
    });
    if(!searchActive && !becomeHostActive){
      try{
        scrollDownRef.current.style.opacity = (y > 150) ? 0 : 1;
        scrollDownRef.current.style.cursor = (y > 150) ? "auto" : "pointer";
      }catch(e){
        onScroll(true, true);
      }
    }
  }

  useEffect(() => {
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
  });
  var body;
  if(searchActive){
    body = (<SearchResult host={hostInfo}/>);
  }else if(becomeHostActive){
    body = (<BecomeHost contract={ contract }/>);
  }else{
    body = (<div><div ref={ scrollDownRef } className='scroll-down'>
        Scroll Down For<br/>ANNOUNCEMENTS<br/>
        <FontAwesomeIcon className='icon' icon={ faChevronDown } />
      </div>
      <Announcements list={ announcements }/></div>);
  }
  let profile = (account != null) ? (<ProfileCircle key={ host } host={ host } activeBecomeHost={ function(){ 
    setSearchActive(false);
    setBecomeHostActive(true); 
    onScroll(true, true);
  } }/>) : (<button onClick={ web3Handler }>Connect MetaMask</button>);
  return (
    <div className='content'>
      <Search ref={ searchRef } key={loading} contract={contract} logoCallback={ async function(){ await setSearchActive(false); onScroll(false); }} searchCallback={ async function(value){
        let hostInfo = await contract.findHost(value);
        if(hostInfo.fee.toNumber() == 0) hostInfo = null;
        setHostInfo(hostInfo);
        await setSearchActive(true);
        onScroll(true, true);
       } } />
      { profile }
      { body }
    </div>
  );
}

export default App;
