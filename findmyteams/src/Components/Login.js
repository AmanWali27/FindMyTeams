import React from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from 'firebase';
import { auth, googleProvider } from './../fbase';

class Login extends React.Component {
    constructor(props) {
        super(props);
        const userr = JSON.parse(localStorage.getItem('user'));
        this.state = {auth: false, user: userr ||  {}};
    }

    componentDidMount() {
        this.unregisterAuthObserver = auth.onAuthStateChanged(
            (user) => {
                if (user) {
                    const USER = {
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                    };
                    this.setState({auth: true});
                    this.setState({user: user});
                    localStorage.setItem('user', JSON.stringify(USER))
                } else {
                    this.setState({user: {}})
                    localStorage.removeItem('user');
                    this.setState({auth: false});
                }
            })
    }

    signIn = (event) => {
        console.log(event);
        event.preventDefault();
        //const prv=new auth.GoogleAuthProvider();
        const prv = googleProvider;
        auth.signInWithPopup(prv)
            .then(function (result ){
                return (
                    <Redirect to="/home"/>
                );
            })
    };


    render () {
        if (this.state.user.uid) {
            return (
                <div>
                    <Redirect to="/home"/>
                </div>
            );
        }
        return (
            <div>
                <h1>Click below to sign-in</h1>
                <button onClick={this.signIn.bind(this)}>SIGN IN</button>
            </div>
        );
    }
}

export default Login;