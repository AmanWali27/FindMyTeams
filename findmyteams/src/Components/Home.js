import React from 'react';
import {Link} from 'react-router-dom';

const Home = () =>{
    return(
        <div>
            This is the home screen after logging in!
            <Link to="/">
                <button>
                    Click to go to back to login
                </button>
            </Link>
        </div>
    );
};

export default Home;