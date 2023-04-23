import React from "react";

import '../css/SearchResult.css';

class SearchResult extends React.Component{

    constructor(props){
        super(props);
        this.host = props.host;
        this.payCallback = props.payCallback;
        this.state = {
            payValue: 0
        }
    }
    
    async payOnclick(){
        if(await window.confirm("Paying " + this.state.payValue + " to join the party of " + this.host.tag + ". Confirm transaction?")){
            this.payCallback();
        }
    }

    render(){
        console.log(this.host);
        if(!this.host){
            return (
                <h1>Host Not Found</h1>
            )
        }
        return (
            <div className='search-result-cont'>
                <div className='search-result-item'>
                    <h2>HOST</h2>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Person_icon_%28the_Noun_Project_2817719%29.svg/1200px-Person_icon_%28the_Noun_Project_2817719%29.svg.png'/>
                    <h3>@{this.host.tag}</h3>
                </div>
                <div className='search-result-item'>
                    <h2>MEMBERS</h2>
                    <div className='members-value'>{this.host.members.toNumber()}</div>
                </div>
                <div className='search-result-item last'>
                    <h2>JOIN THE PARTY</h2>
                    <b>Membership Tiers</b>
                    <div className='fee-row'><span className='fee-name'>Standard</span><span className='fee-value'>{this.host.fee.toNumber()} GWEI</span></div>
                    <br/>
                    <input value={this.state.payValue}  onChange={ (e) => this.setState({payValue: e.target.value}) } type="number"></input><button onClick={ this.payOnclick.bind(this) }>Pay</button>
                </div>
            </div>
        )
    }
}

export default SearchResult;