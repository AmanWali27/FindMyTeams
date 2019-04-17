import React from 'react';
import {Link} from "react-router-dom";
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
    apiKey: "AIzaSyB_VMuH0KADB_BvF_LyXqmC8zTHqEOhPe4",
    authDomain: "findmyteams-19b7a.firebaseapp.com",
});

class Login extends React.Component {
    state = {
        auth: false,
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({auth: !!user})
        );
    }

    signIn = (event) => {
        console.log(event);
        event.preventDefault();
        const prv=new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(prv)
            .then(function (result ){
            })
    };


    render () {
        if (!this.state.auth) {
            return (
                <div>
                    <h1>Click below to sign-in</h1>
                    <button onClick={this.signIn.bind(this)}>SIGN IN</button>
                </div>
            );
        }
        return (
            <div>
                You are already signed in
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