import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'

import logo from '../assets/logo.png';

import '../css/Search.css';

class Search extends React.Component {

    constructor(props){
        super(props);
        this.searchCallback = props.searchCallback;
        this.logoCallback = props.logoCallback;
        this.value = "";
        this.state = {
            large: true,
            searchValue: "",
            top: (window.innerHeight / 2 - 120) + " px",
        }
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.searchCallback(this.state.searchValue);
        }
      }

    render(){
        const smallAdjust = (this.state.large) ? '' : ' small';
        return (
            <div className={ 'centered' + smallAdjust } style={ {top: this.state.top} }>
                <img src={ logo } className={ 'logo' + smallAdjust } onClick={ this.logoCallback }/>
                <div className={ 'search' + smallAdjust }>
                    <input value={ this.state.searchValue } onChange={ (e) => this.setState({searchValue: e.target.value}) } className="search-input" placeholder="Search for a host" onKeyDown={ this._handleKeyDown }/>
                    <FontAwesomeIcon icon={ faMagnifyingGlass } className='search-icon' onClick={ () => this.searchCallback(this.state.searchValue) } />
                </div>
            </div>
        );
    }
}

export default Search;