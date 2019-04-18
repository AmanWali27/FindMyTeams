import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import PrivateRoute from './Components/PrivateRoute';
import { auth } from './fbase'
import form from './Components/Form';

class App extends React.Component{
    constructor(props) {
        super(props);
        const userr = JSON.parse(localStorage.getItem('user'));
        this.state = {auth: false, user: userr ||  {}};
    }

    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            var curUser = auth.currentUser;
            // console.log(curUser);
            // console.log(JSON.stringify(curUser));
            // console.log(user);
            const cuser=JSON.stringify(user);
            // console.log(cuser.uid);
            // console.log(user.displayName);
            if (user) {
                const USER = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                };
                this.setState({auth:true});
                this.setState({ user: user });
                localStorage.setItem('user', JSON.stringify(USER))
            } else {
                this.setState({ user: {} })
                localStorage.removeItem('user');
                this.setState({auth: false});
            }
        });
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route
                                path='/'
                                exact
                                component={Login}
                            />
                            <PrivateRoute
                                path='/home'
                                exact={true}
                                component={Home}
                                user= {this.state.user}
                            />
                            <Route
                                path='/form'
                                exact
                                component={form}
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    };
}

export default App;