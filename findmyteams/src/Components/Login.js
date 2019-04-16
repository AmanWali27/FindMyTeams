import React from 'react';
import {Link} from "react-router-dom";

class Login extends React.Component {
    render () {
        return (
            <div>
                Welcome to the Login page!
                <Link to="/home">
                    <button>
                        Click to go to Home page
                    </button>
                </Link>
            </div>
        );
    }
}

export default Login;