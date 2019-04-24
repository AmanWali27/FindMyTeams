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
            filter:"Filters",
            myPost: false
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
        if(this.state.player === false || this.state.myPost === true) {
            this.setState({player: true, sports: this.state.playerSports, myPost: false, filter: "Filters"})
        }
        console.log(this.state.posts)
    };

    onTeamClicked = () => {
        console.log(this.state.teams);
        if(this.state.player === true || this.state.myPost === true) {
            this.setState({player: false, sports: this.state.teamSports, myPost: false, filter: "Filters"})
        }
    };

    onMyPostsClicked = () => {
        console.log("hi im in my posts clicked")
        if(this.state.myPost === false) {
            this.setState({myPost: true, filter: "Filters"})
        }
    };

    onClearClicked = () =>{
        this.setState({filter: "Filters"})
    }

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

    loadMyPlayers = ()=> {
        console.log("in load posts")
        let arr= this.state.players;
        console.log("pre-arr is ");
        console.log(arr);
        let items =[];
        if(this.state.loaded === false){
            return (
                <div>
                    No posts found!
                </div>
            );
        }else {
            return Object.keys(arr).map((keyName, keyIndex) => {
                if(this.state.user.uid === arr[keyName].uid)
                return (
                    <div>
                        <PlayerCard obj={arr[keyName]} meta="User"/>
                    </div>
                );
            })
        }
    }

    loadMyTeams = ()=> {
        console.log("in load posts")
        let arr= this.state.teams;
        console.log("pre-arr is ");
        console.log(arr);
        let items =[];
        if(this.state.loaded === false){
            return (
                <div>
                    No posts found!
                </div>
            );
        }else {
            return Object.keys(arr).map((keyName, keyIndex) => {
                if(this.state.user.uid === arr[keyName].uid)
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="User"/>
                        </div>
                    );
            })
        }
    }

    retView = () => {
        console.log("retView");
        if(this.state.myPost === true) {
            return (
                <div className="ui equal width grid">
                    {this.loadMyPlayers()}
                    {this.loadMyTeams()}
                </div>
            );
        }else if (this.state.player === true){
            return (
                <div className="ui equal width grid">
                    {this.loadPlayers()}
                </div>
            );
        } else{
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
                        <button
                            onClick={this.onMyPostsClicked}
                            className="link item">
                            My Posts
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
                    <div className="ui compact menu">
                        <button
                            onClick={this.onClearClicked}
                            className="link item">
                            <i className="teal undo alternate icon"></i>
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
