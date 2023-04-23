import React from 'react';

import '../css/BecomeHost.css';

class BecomeHost extends React.Component {
    
    constructor(props){
        super(props);
        this.contract = props.contract;
        this.state = {
            tagValue: "",
            minFee: 0,
        }
    }

    async becomeHost(){
        try{
            await this.contract.becomeHost(this.state.tagValue, this.state.minFee);
            alert("Success!");
        }catch(e){
            alert("Tag already exists!");
        }
    }

    render(){
        return (
            <div className='become-host-cont'>
                <div className='become-host-row'><label>Tag Name </label><input value={this.state.tagValue}  onChange={ (e) => this.setState({tagValue: e.target.value}) } placeholder='Key to join your party'/></div>
                <div className='become-host-row'><label>Mininum Fee </label><input value={this.state.minFee}  onChange={ (e) => this.setState({minFee: e.target.value}) } placeholder='Min. membership cost' type="number"/></div>
                <button onClick={ this.becomeHost.bind(this) }>Start Your Party!</button>
            </div>
        );
    }
}

export default BecomeHost;