import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({user, component: Component, rest}) => (
    <Route {...rest} component={(props) => (
        user.uid ? (
            <div>
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

export default PrivateRoute;