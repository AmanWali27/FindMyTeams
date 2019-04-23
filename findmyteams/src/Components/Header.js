import React from 'react';
import {Link} from "react-router-dom";
import Phone from './Phone'

const Header = () =>{
    return(
        <div className="ui teal inverted menu">
            <Link className="Header" to={`/home`}>
                <a style={{fontSize:'17px'}} className="item">
                    Home
                </a>
            </Link>
            <div className="right menu">
                <div className="ui teal inverted menu">
                    <div className="ui teal simple dropdown item">
                        <i class="large inverted cog icon"></i>
                        <div className="menu">
                            <Link className="item" to={`/phone`}>
                                Edit Phone Number
                            </Link>
                            <div style={{fontSize:'17px'}} className="item">Sign Out</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
