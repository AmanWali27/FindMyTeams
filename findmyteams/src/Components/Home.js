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
        // arr = Array.from(arr);
        // console.log("arr is ");
        // console.log(arr);
        let items =[];
        if(this.state.loaded === false){
            console.log("false")
        }else {
            // return (
            //     <PlayerCard/>
            // )
            return Object.keys(arr).map(function(keyName, keyIndex) {
                // console.log("Iterating");
                // console.log(arr[keyName]);
                // {PlayerCard(arr[keyName])}
                return (
                        <PlayerCard obj={arr[keyName]}/>
                );
                // use keyName to get current key's name
                // and a[keyName] to get its value
            })
                //     console.log("pre-Iterating")
                //     items = arr.map((item) => {
                //         console.log("Iterating")
                //         console.log({item});
                //     return(
                //             <li>
                //                 {item}
                //             </li>
                //     );
                // });
        }
        return(
            <div>
                {items}
            </div>
        );

        // this.setState({player: true})
    };

    loadTeams = () => {};

    retView = () => {
        console.log("retView");
        if(this.state.player === true){
            return (
                <div>
                    {this.loadPlayers()}
                </div>
            );
        }else{
            return (
                <div>
                    Finding teams
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