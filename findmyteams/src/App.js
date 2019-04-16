import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import firebase from 'firebase';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={Login} />
                    <PrivateRoute path='/home' exact component={Home} />
                </div>
            </BrowserRouter>
        </div>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        firebase.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
);

export default App;