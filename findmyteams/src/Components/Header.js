import React from 'react';

const Header = () =>{
    return(
        <div className="ui inverted menu">
            <a className="item">
                Home
            </a>
            <div className="right menu">
                <div className="ui inverted menu">
                    <div className="ui black simple dropdown">
                        Settings
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