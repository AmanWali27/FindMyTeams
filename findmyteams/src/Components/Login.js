import React from 'react';
import {Link, Redirect} from "react-router-dom";
import firebase from 'firebase';
import { auth, googleProvider, db } from './../fbase';
import "./Login.css";
import styles from './background';
import "./Styles.css";
import Paper from '@material-ui/core/Paper';

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
                    const u=user.uid;
                    const userRef = firebase.database().ref("Users/" + u + "/");

                    userRef.set({
                        email: user.email,
                        name: user.displayName,
                        uid: u
                    }).then((data) => {
                        console.log('Logged in');
                    }).catch((error) => {
                        console.log(error)
                    });
                    firebase.database().ref('/Phone/'+u+'/').once('value').then(response => {
                        // console.log("PRINTING OUT RESPONSE");
                        // console.log(response.val());
                        if(response.val() === null){
                            const userRef = db.ref("Phone/" + u + "/");
                            userRef.set(
                                {
                                    phoneNumber: ''
                                }
                            ).then((data) => {
                                console.log('form sent');
                                //this.props.navigation.navigate('requests')
                            }).catch((error) => {
                                console.log(error)
                            });
                        }
                        // this.setState({
                        //     phoneNumber: response.val().phoneNumber
                        // })
                    });
                } else {
                    this.setState({user: {}, auth: false})
                    localStorage.removeItem('user');
                    //this.setState({auth: false});
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
            <Paper style={styles.paperContainer}>
                <div className="center-screen">
                    <div className="ui raised very padded text container segment">
                        <img className="ui fluid top aligned Massive image" src={require('./../images/fancycrave-284243-unsplash.jpg')} alt="SPORTS" />
                        <div style={{paddingTop:5}}>
                        </div>
                        <div>
                            <h2 style={{marginTop:30, marginBottom: 30, fontSize:30}} className="ui horizontal divider teal header">
                                FindMyTeams
                            </h2>
                            <div className="ui floating message">
                                <p>A social website for everyone that loves sports! Find someone to play
                                    with so you can always play the game you love.
                                </p>
                            </div>
                            <button
                                className="ui google plus button"
                                onClick={this.signIn.bind(this)}>
                                <i className="google icon"></i>
                                Google sign-in
                            </button>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default Login;