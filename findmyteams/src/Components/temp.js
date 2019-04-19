import React from 'react';
import PlayerCard from './playerCard';
import {auth} from "../fbase";
import firebase from "firebase";

class temp extends React.Component{

    constructor(props) {
        super(props);
        const userr = JSON.parse(localStorage.getItem('user'));
        this.state = {
            auth: false,
            user: userr ||  {},
        };
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

    render (){
        if(this.state.user.uid) {
            return(
                <div>
                    <h1 className="ui header">Welcome to cards page</h1>
                    <PlayerCard user={this.state.user}/>
                </div>
            );
        }
        return (
            <div>
                <h1 className="ui header">Welcome to cards page</h1>
                Not logged in!
            </div>
        );
    }
}

export default temp;