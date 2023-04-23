import '../App.css';
import { useState, useEffect, useRef } from 'react'
import { ethers } from "ethers"
import Title from './Title.js';
import ProfileCircle from './ProfileCircle.js';
import Announcements from './Announcements.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

function Home() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})
  const titleRef = useRef();
  const scrollDownRef = useRef();
  const announcements = [{"id": "ljasdkflasdf", "title": "Test title", "tag": "test", "body": "Hey guys! Thanks for being a part of my experience. I'm so happy to be a part of Blockparty. Thank you for donating."}];

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
    // Get provider from Metamask
    //const signer = provider.getSigner()
    //loadContract(signer)
  }
  /*
  const loadContract = async (signer) => {

    // Get deployed copy of Decentratwitter contract
    const contract = new ethers.Contract(DecentratwitterAddress.address, DecentratwitterAbi.abi, signer)
    setContract(contract)
    setLoading(false)
  }*/

  useEffect(() => {
    const onScroll = function(){
      const y = -document.body.getBoundingClientRect().y + 100;
      const topVal = Math.max(window.innerHeight / 2 - 120, y);
      titleRef.current.setState({
        top: topVal + "px",
        large: topVal != y,
      });
      scrollDownRef.current.style.opacity = (y > 150) ? 0 : 1;
      scrollDownRef.current.style.cursor = (y > 150) ? "auto" : "pointer";
    }
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
  });
  return (
    <div className='content'>
      <Title ref={ titleRef } searchCallback={ function(asdf){ alert(asdf); } } />
      <ProfileCircle host={ false } />
      <div ref={ scrollDownRef } className='scroll-down'>
        Scroll Down For<br/>ANNOUNCEMENTS<br/>
        <FontAwesomeIcon className='icon' icon={ faChevronDown } />
      </div>
      <Announcements list={ announcements }/>
    </div>
  );
}

export default Home;
