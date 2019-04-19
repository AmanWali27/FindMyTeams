import React from 'react';
import {auth, db} from './../fbase';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation';
import {Redirect} from 'react-router-dom'

class addForm extends React.Component{
    constructor(props) {
        super(props);
        const userr = JSON.parse(localStorage.getItem('user'));
        this.state = {
            auth: false,
            user: userr ||  {},
            name: "",
            teamName: "",
            sport: "",
            lookingFor: "",
            info: "",
            uid: '',
        };
    }

    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            var curUser = auth.currentUser;
            const u = auth.currentUser;
            console.log(u);
            console.log(u.uid);
            this.setState({uid: u.uid});
            const cuser=JSON.stringify(user);
            if (user) {
                const USER = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                };
                this.setState({auth:true});
                this.setState({ user: user });
                this.setState({name: USER.displayName});
                localStorage.setItem('user', JSON.stringify(USER))
            } else {
                this.setState({ user: {} });
                localStorage.removeItem('user');
                this.setState({auth: false});
            }
        });
    }

    onChangeName(event) {
        console.log(event.target.value);
        this.setState({name: event.target.value})
    }

    onChangeTeam (event) {
        console.log(event.target.value);
        this.setState({teamName: event.target.value});
    }

    onChangeSport(event) {
        console.log(event.target.value);
        this.setState({sport: event.target.value})
    }

    onChangeLooking(event) {
        console.log(event.target.value);
        this.setState({lookingFor: event.target.value})
    }

    onChangeInfo(event) {
        console.log(event.target.value);
        this.setState({info: event.target.value})
    }

    handleSubmit= (e) => {
        e.preventDefault();
        console.log("About to submit");
        const u=auth.currentUser.uid;
        // db.ref('Users').set({
        //     FOOD: ""
        // });
        const refPush = db.ref("Posts/Players/").push()
        const uniKey = refPush.key;
        const userRef = db.ref("Posts/Players/" + uniKey + "/");
        userRef.set(
            {
                name: this.state.name,
                teamName: this.state.teamName,
                sport: this.state.sport,
                lookingFor: this.state.lookingFor,
                info: this.state.info,
                uid: u,
                rid: uniKey
            }
        ).then((data) => {
            console.log('Synchronization succeeded');
            //this.props.navigation.navigate('requests')
        }).catch((error) => {
            console.log(error)
        });
        this.setState({
            name: this.state.user.displayName,
            teamName: "",
            sport: "",
            lookingFor: "",
            info: ""
        })
    };

    handleReset=(e)=>{
        e.preventDefault();
        this.setState({
            name: this.state.user.displayName,
            teamName: "",
            sport: "",
            lookingFor: "",
            info: ""
        })
    };

    render() {
        return (
            <div className="form">
                <form className="ui huge form" onSubmit={this.handleSubmit}>
                    <h1 className="ui center aligned dividing header">
                        Fill out this form to find someone to play your sport with!
                    </h1>
                    <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 0}}>
                        <div>
                            <div className="required field">
                                <label>Your name: </label>
                                <input
                                    type="text"
                                    placeholder="eg: John"
                                    value={this.state.name}
                                    onChange={this.onChangeName.bind(this)}
                                />
                            </div>
                            <div className="field">
                                <label>Team name: </label>
                                <input
                                    type="text"
                                    placeholder="eg: Rockets"
                                    value={this.state.teamName}
                                    onChange={this.onChangeTeam.bind(this)}
                                />
                            </div>
                            <div className="required field">
                                <label>Sport:</label>
                                <input
                                    type="text"
                                    placeholder="eg: Basketball"
                                    value={this.state.sport}
                                    onChange={this.onChangeSport.bind(this)}
                                />
                            </div>
                            <div className="required field">
                                <label>Looking for:</label>
                                <input
                                    type="text"
                                    placeholder="eg: Point guard/2 players"
                                    value={this.state.lookingFor}
                                    onChange={this.onChangeLooking.bind(this)}
                                />
                            </div>
                            <div>
                                <label>Additional info:</label>
                                <textarea
                                    placeholder="eg: We play at the Co-rec on Tuesdays at 9pm"
                                    value={this.state.info}
                                    onChange={this.onChangeInfo.bind(this)}
                                />
                            </div>
                            <div className="buttons">
                                <button type="submit">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={this.handleReset}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default addForm;