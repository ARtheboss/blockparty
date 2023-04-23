import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

import '../css/ProfileCircle.css';

class ProfileCircle extends React.Component {

    constructor(props){
        super(props);
        this.host = props.host;
        this.activeBecomeHost = props.activeBecomeHost;
        this.state = {
            showDropdown: false
        }
    }

    render(){
        let dropdown = (this.host) ? (<div className='dropdown-menu'>
            <div className='dropdown-item'>Host Dashboard</div>    
            <div className='dropdown-item'>Make Announcement</div>    
        </div>) : (<div className='dropdown-menu'>
            <div className='dropdown-item' onClick={ this.activeBecomeHost }>Become a Host</div>
        </div>);
        return (
            <div className='profile-circle'>
                <FontAwesomeIcon icon={ faUser } className='profile-icon'/>
                { dropdown }
                
            </div>
        );
    }
}

export default ProfileCircle;