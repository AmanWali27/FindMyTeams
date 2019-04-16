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

    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false
        }
    };

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({auth: !!user})
        );
    }


    render () {
        if (!this.state.auth) {
            return (
                <div>
                    <h1>Click below to sign-in</h1>
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
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