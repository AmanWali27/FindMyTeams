import React from 'react';
import {Container, Button, Link, darkColors, lightColors} from 'react-floating-action-button';
import Header from './Header';
import addform from './Form'
import playerFrom from './playerForm'
import {auth, db} from "../fbase";
import firebase from "firebase";
import PlayerCard from "./playerCard";


class Home extends React.Component {
    constructor(props) {
        super(props);
        const userr = JSON.parse(localStorage.getItem('user'));
        this.state = {
            auth: false,
            user: userr || {},
            player: true,
            players: [],
            teams: [],
            posts: {},
            loaded: false,
            teamSports: [],
            playerSports: [],
            sports: [],
            filter: "Filters",
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
        const userRef = db.ref("/");
        let temperature = userRef.child('Posts');
        temperature.on("value", (snapshot) => {
            const myData = snapshot.val();
            console.log("My data is");
            console.log(myData);
            this.setState({
                posts: myData,
                teamSports: myData.TeamSports,
                playerSports: myData.PlayerSports,
                teams: myData.Teams,
                players: myData.Players
            })
        });
        // console.log(this.state.players);
    }

    onPlayerClicked = () => {
        console.log(this.state.players);
        console.log("clicked player");
        if (this.state.player === false || this.state.myPost === true) {
            this.setState({player: true, sports: this.state.playerSports, myPost: false, filter: "Filters"})
        }
        console.log(this.state.posts)
    };

    onTeamClicked = () => {
        console.log(this.state.teams);
        if (this.state.player === true || this.state.myPost === true) {
            this.setState({player: false, sports: this.state.teamSports, myPost: false, filter: "Filters"})
        }
    };

    onMyPostsClicked = () => {
        console.log("hi im in my posts clicked")
        if (this.state.myPost === false) {
            this.setState({myPost: true, filter: "Filters"})
        }
    };

    onClearClicked = () => {
        this.setState({filter: "Filters"})
    }

    loadPlayers = () => {
        console.log("about to load players")
        let arr = this.state.players;
        console.log("pre-arr is ");
        console.log(arr);
        if (this.state.loaded === false) {
            return (
                <div>
                    No posts found!
                </div>
            );
        } else {
            return Object.keys(arr).map(function (keyName, keyIndex) {
                if (this.state.filter === "Filters") {
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Player" edit={false}/>
                        </div>
                    );
                } else if (this.state.filter === arr[keyName].sport) {
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Player" edit={false}/>
                        </div>
                    );
                }
            }, this)
        }
    };

    loadTeams = () => {
        console.log("about to load teams");
        let arr = this.state.teams;
        console.log("pre-arr is ");
        console.log(arr);
        if (this.state.loaded === false) {
            return (
                <div>
                    No posts found!
                </div>
            );
        } else {
            return Object.keys(arr).map(function (keyName, keyIndex) {
                if (this.state.filter === "Filters") {
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Team" edit={false}/>
                        </div>
                    );
                } else if (this.state.filter === arr[keyName].sport) {
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Team" edit={false}/>
                        </div>
                    );
                }
            }, this)
        }
    };

    loadMyPlayers = () => {
        console.log("in load posts")
        let arr = this.state.players;
        console.log("pre-arr is ");
        console.log(arr);
        let items = [];
        if (this.state.loaded === false) {
            return (
                <div>
                    No posts found!
                </div>
            );
        } else {
            return Object.keys(arr).map((keyName, keyIndex) => {
                if (this.state.user.uid === arr[keyName].uid &&
                    this.state.filter === "Filters") {
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Player" edit={true}/>
                        </div>
                    );
                } else if (this.state.user.uid === arr[keyName].uid &&
                    this.state.filter === arr[keyName].sport) {
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Player" edit={true}/>
                        </div>
                    );
                }
            })
        }
    }

    loadMyTeams = () => {
        console.log("in load posts")
        let arr = this.state.teams;
        console.log("pre-arr is ");
        console.log(arr);
        let items = [];
        if (this.state.loaded === false) {
            return (
                <div>
                    No posts found!
                </div>
            );
        } else {
            return Object.keys(arr).map((keyName, keyIndex) => {
                if (this.state.user.uid === arr[keyName].uid &&
                    this.state.filter === "Filters") {
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Team" edit={true}/>
                        </div>
                    );
                } else if (this.state.user.uid === arr[keyName].uid &&
                    this.state.filter === arr[keyName].sport) {
                    return (
                        <div>
                            <PlayerCard obj={arr[keyName]} meta="Team" edit={true}/>
                        </div>
                    );
                }
            })
        }
    }

    retView = () => {
        console.log("retView");
        if (this.state.myPost === true) {
            return (
                <div className="ui equal width centered grid">
                    {this.loadMyPlayers()}
                    {this.loadMyTeams()}
                </div>
            );
        } else if (this.state.player === true) {
            return (
                <div className="ui equal width centered grid">
                    {this.loadPlayers()}
                </div>
            );
        } else {
            return (
                <div className="ui stackable equal width centered grid">
                    {this.loadTeams()}
                </div>
            );
        }
    };

    showSportsTest = () => {
        let arr1 = this.state.playerSports;
        console.log("My posts arrays are ");
        console.log(arr1);
        const ar1 = Object.keys(arr1).map(function (keyName, keyIndex) {
            return arr1[keyName].sport
        }, this);
        let arr2 = this.state.teamSports;
        console.log(arr2);
        const ar2 = Object.keys(arr2).map(function (keyName, keyIndex) {
            return arr2[keyName].sport
        }, this);
        console.log("Combined array is");
        const newArr = ar1.concat(ar2);
        console.log(newArr);
        const uniqueNames = Array.from(new Set(newArr));
        console.log(uniqueNames);
        return uniqueNames.map((item, key) => {
            console.log("sports are");
            console.log(item);
            return (
                <div>
                    <button className="item"
                            onClick={() => {
                                this.setState({filter: item})
                            }}
                    >
                        {item}
                    </button>
                </div>
            );
        })
    };

    showSports = () => {
        if (this.state.myPost === true) {
            if (this.state.loaded === false) {
                return (
                    <div>
                        No posts found!
                    </div>
                );
            }
            return (
                <div>
                    {this.showSportsTest()}
                </div>
            );
        }

        if (this.state.player === true) {
            let arr = this.state.playerSports;
            if (this.state.loaded === false) {
                return (
                    <div>
                        No posts found!
                    </div>
                );
            } else {
                const arrr = Object.keys(arr).map(function (keyName, keyIndex) {
                    return arr[keyName].sport
                }, this);
                console.log(arrr);
                const uniqueNames = Array.from(new Set(arrr));
                console.log(uniqueNames);
                return uniqueNames.map((item, key) => {
                    console.log("sports are");
                    console.log(item);
                    return (
                        <div>
                            <button className="item"
                                    onClick={() => {
                                        this.setState({filter: item})
                                    }}
                            >
                                {item}
                            </button>
                        </div>
                    );
                })
            }
        } else {
            let arr = this.state.teamSports;
            if (this.state.loaded === false) {
                return (
                    <div>
                        No posts found!
                    </div>
                );
            } else {
                const arrr = Object.keys(arr).map(function (keyName, keyIndex) {
                    return arr[keyName].sport
                }, this);
                console.log(arrr);
                const uniqueNames = Array.from(new Set(arrr));
                console.log(uniqueNames);
                return uniqueNames.map((item, key) => {
                    console.log("sports are");
                    console.log(item);
                    return (
                        <div>
                            <button className="item"
                                    onClick={() => {
                                        this.setState({filter: item})
                                    }}
                            >
                                {item}
                            </button>
                        </div>
                    );
                })
            }
        }
    };

    render() {
        return (
            <div>
                <Header/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
                    <div className="ui compact menu">
                        <button
                            onClick={this.onPlayerClicked}
                            className="link item">
                            <a className="item" style={{fontSize: '17px', padding: 0, fontStyle:"bold"}}>
                                Find a Player
                            </a>
                        </button>
                        <button
                            onClick={this.onTeamClicked}
                            className="link item">
                            <a className="item" style={{fontSize: '17px', padding: 0}}>
                                Find a Team
                            </a>
                        </button>
                        <button
                            onClick={this.onMyPostsClicked}
                            className="link item">
                            <a className="item" style={{fontSize: '17px', padding: 0}}>
                                My Posts
                            </a>
                        </button>
                    </div>
                    <div className="ui compact menu">
                        <div className="ui simple dropdown item">
                            <a className="item" style={{fontSize: '17px', padding: 0}}>
                                {this.state.filter}
                            </a>
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                <a className="item" style={{fontSize: '17px', padding: 0}}>
                                    {this.showSports()}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="ui compact menu">
                        <button
                            onClick={this.onClearClicked}
                            className="link item">
                            <i className="large grey times alternate icon"></i>
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
                        styles={{backgroundColor: darkColors.teal}}
                        icon="big inverted plus icon"
                        rotate={false}/>
                </Container>
            </div>
        );
    }
};

export default Home;
