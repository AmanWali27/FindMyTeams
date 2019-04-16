import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={Login} />
                    <Route path='/home' exact component={Home} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;