import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {auth} from './../fbase';

class Header extends React.Component {

    onSignOut = () =>{
        auth.signOut().then((response)=> {
            return (
                <div></div>
            );
        })
    };

    render () {
        return (
            <div className="ui teal inverted menu">
                <Link className="Header" to={`/home`}>
                    <a className="item">
                        Home
                    </a>
                </Link>
                <div className="right menu">
                    <div className="ui teal inverted menu">
                        <div className="ui teal simple dropdown item">
                            <i class="inverted cog icon"></i>
                            <div className="menu">
                                <div className="item" onClick={this.onSignOut}>Sign Out</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;