import React from 'react';
import {Link} from "react-router-dom";

const Header = () =>{
    return(
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
                            <div className="item">Sign Out</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;