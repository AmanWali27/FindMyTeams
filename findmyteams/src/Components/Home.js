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
            loaded: false,
            teamSports: [],
            playerSports: [],
            sports: [],
            filter: "Filters",
        };
        //this.showSports=this.showSports.bind(this);
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
            this.setState({
                players: response.val().Players,
                teams: response.val().Teams,
                posts: response.val(),
                teamSports: response.val().TeamSports,
                playerSports: response.val().PlayerSports
            })
        });
        this.setState({loaded: true})
        // console.log(this.state.players);
    }

    onPlayerClicked = () => {
        console.log(this.state.players);
        console.log("clicked player");
        if(this.state.player === false) {
            this.setState({player: true, sports: this.state.playerSports})
        }
        console.log(this.state.posts)
    };

    onTeamClicked = () => {
        console.log(this.state.teams);
        if(this.state.player === true) {
            this.setState({player: false, sports: this.state.teamSports})
        }
    };

    loadPlayers = () => {
        console.log("about to load players")
        let arr= this.state.players;
        console.log("pre-arr is ");
        console.log(arr);
        if(this.state.loaded === false){
            return (
                <div>
                    No posts found!
                </div>
            );
        }else {
            return Object.keys(arr).map(function(keyName, keyIndex) {
                if(this.state.filter === "Filters") {
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Player"/>
                        </div>
                    );
                }else if(this.state.filter === arr[keyName].sport){
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Player"/>
                        </div>
                    );
                }
            }, this)
        }
    };

    loadTeams = () => {
        console.log("about to load teams");
        let arr= this.state.teams;
        console.log("pre-arr is ");
        console.log(arr);
        if(this.state.loaded === false){
            return (
                <div>
                    No posts found!
                </div>
            );
        }else {
            return Object.keys(arr).map(function(keyName, keyIndex) {
                if(this.state.filter === "Filters") {
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Team"/>
                        </div>
                    );
                }else if(this.state.filter === arr[keyName].sport){
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Team"/>
                        </div>
                    );
                }
            }, this)
        }
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

    showSports = () => {
        console.log("The arr isss");
        console.log(this.state.playerSports);
        if(this.state.player === true){
            let arr= this.state.playerSports;
            if(this.state.loaded === false){
                return (
                    <div>
                        No posts found!
                    </div>
                );
            }else {
                return Object.keys(arr).map(function (keyName, keyIndex) {
                    return (
                        <div>
                            <button className="item"
                                    onClick = { () =>{this.setState({filter: arr[keyName].sport})} }
                            >
                                {arr[keyName].sport}
                            </button>
                        </div>
                    );
                }, this)
            }
        }
        else{
            let arr= this.state.teamSports;
            if(this.state.loaded === false){
                return (
                    <div>
                        No posts found!
                    </div>
                );
            }else {
                return Object.keys(arr).map(function (keyName, keyIndex) {
                    return (
                        <div>
                            <button className="item"
                                    onClick = { () =>{this.setState({filter: arr[keyName].sport})} }
                            >
                                {arr[keyName].sport}
                            </button>
                        </div>
                    );
                }, this)
            }
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
                    <div className="ui compact menu">
                        <div className="ui simple dropdown item">
                            {this.state.filter}
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                {this.showSports()}
                            </div>
                        </div>
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
