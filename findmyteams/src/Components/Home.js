import React from 'react';
import { Container, Button, Link, darkColors, lightColors } from 'react-floating-action-button';
import Header from './Header';
import addform from './Form'
import playerFrom from './playerForm'
import {auth} from "../fbase";
import firebase from "firebase";
import PlayerCard from "./playerCard";

class Home extends React.Component {
    constructor(props) {
        super(props);
        const userr = JSON.parse(localStorage.getItem('user'));
        this.state = {
            auth: false,
            user: userr ||  {},
            player: true,
            players: [],
            teams: [],
            posts: {},
            loaded: false
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
            });
        firebase.database().ref('/Posts/').once('value').then(response => {
            this.setState({players: response.val().Players})
            this.setState({teams: response.val().Teams})
            this.setState({posts: response.val()})
            // console.log(response.val().Players)
        });
        this.setState({loaded: true})
        // console.log(this.state.players);
    }

    onPlayerClicked = () => {
        console.log(this.state.players);
        console.log("clicked player");
        if(this.state.player === false) {
            this.setState({player: true})
        }
        console.log(this.state.posts)
    };

    onTeamClicked = () => {
        console.log(this.state.teams);
        if(this.state.player === true) {
            this.setState({player: false})
        }
    };

    loadPlayers = () => {
        console.log("about to load players")
        let arr= this.state.players;
        console.log("pre-arr is ");
        console.log(arr);
        let items =[];
        if(this.state.loaded === false){
            console.log("false")
        }else {
            return Object.keys(arr).map(function(keyName, keyIndex) {
                return (
                    <div>
                        <PlayerCard obj={arr[keyName]}/>
                    </div>
                );
            })
        }
        return(
            <div>
                {items}
            </div>
        );
    };

    loadTeams = () => {
        console.log("about to load teams")
        let arr= this.state.teams;
        console.log("pre-arr is ");
        console.log(arr);
        let items =[];
        if(this.state.loaded === false){
            console.log("false")
        }else {
            return Object.keys(arr).map(function(keyName, keyIndex) {
                return (
                    <div>
                        <PlayerCard obj={arr[keyName]}/>
                    </div>
                );
            })
        }
        return(
            <div>
                {items}
            </div>
        );
    };

    retView = () => {
        console.log("retView");
        if(this.state.player === true){
            return (
                <div className="ui equal width grid">
                    {this.loadPlayers()}
                </div>
            );
        }else{
            return (
                <div className="ui stackable equal width grid">
                    {this.loadTeams()}
                </div>
            );
        }
    };

    render () {
        return (
            <div>
                <Header/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
                    <div className="ui compact menu">
                        <button
                            onClick={this.onPlayerClicked}
                            className="link item">
                            Find a Player
                        </button>
                        <button
                            onClick={this.onTeamClicked}
                            className="link item">
                            Find a Team
                        </button>
                    </div>
                </div>

                {this.retView()}

                <Container>
                    <Link href={`/form`}
                          tooltip="Find a Player"
                          styles={{backgroundColor: lightColors.teal}}
                          icon="large inverted user icon"/>
                    <Link href={`/plform`}
                          tooltip="Find a Team"
                          styles={{backgroundColor: lightColors.teal}}
                          icon="large inverted users icon"/>
                    <Button
                        tooltip="Find players and teams!"
                        styles={{backgroundColor: darkColors.teal}}
                        icon="big inverted plus icon"
                        rotate={false}
                        onClick={() => alert('FAB Rocks!')}/>
                </Container>
            </div>
        );
    }
};

export default Home;