import React from 'react';
import {auth, db} from './../fbase';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation';
import {Redirect} from 'react-router-dom'
import Header from "./Header";
import firebase from "firebase";

function validate(name, sport, lookingFor, phoneNumber) {
    return {
        name: name.length === 0,
        sport: sport.length === 0,
        lookingFor: lookingFor.length === 0,
        phoneNumber: phoneNumber.length === 0
    };
}

class playerForm extends React.Component{
    constructor(props) {
        super(props);
        const userr = JSON.parse(localStorage.getItem('user'));
        this.state = {
            auth: false,
            user: userr ||  {},
            name: "",
            sport: "",
            lookingFor: "",
            info: "",
            uid: '',
            phoneNumber: '',
        };
    }

    componentWillMount() {
        const u = auth.currentUser;
        console.log("u is: ");
        console.log(u);
        auth.onAuthStateChanged((user) => {
            var curUser = auth.currentUser;
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
        const path='/Phone/'+this.state.user.uid+'/';
        console.log("path is ")
        console.log(path);
        firebase.database().ref(path).once('value').then(response => {
            // console.log("PRINTING OUT RESPONSE");
            // console.log(response.val());
            if(response.val().phoneNumber === ''){
                console.log("NOT FOUND")
            }else {
                this.setState({
                    phoneNumber: response.val().phoneNumber
                })
            }
        });
    }

    onChangeName(event) {
        console.log(event.target.value);
        this.setState({name: event.target.value})
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
                sport: this.state.sport,
                lookingFor: this.state.lookingFor,
                info: this.state.info,
                uid: u,
                rid: uniKey
            }
        ).then((data) => {
            console.log('form sent');
            //this.props.navigation.navigate('requests')
        }).catch((error) => {
            console.log(error)
        });
        const refPush2 = db.ref("Posts/PlayerSports/").push()
        const uniKey2 = refPush2.key;
        const userRef2 = db.ref("Posts/PlayerSports/" + uniKey2 + "/");
        userRef2.set(
            {
                sport: this.state.sport,
                uid: u,
                rid: uniKey2
            }
        ).then((data) => {
            console.log('form sent');
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
        console.log("PRINTING OUT USER")
        // console.log(this.state.user.);
        this.setState({
            name: this.state.user.displayName,
            teamName: "",
            sport: "",
            lookingFor: "",
            info: ""
        })
    };

    showNameError = () => {
        if(this.state.name===""){
            return (
                <div className="ui pointing red basic label">
                    Please enter a value
                </div>
            );
        }
    }

    showSportError = () => {
        if(this.state.sport===""){
            return (
                <div className="ui pointing red basic label">
                    Please enter a value
                </div>
            );
        }
    }

    showLookingError = () => {
        if(this.state.lookingFor===""){
            return (
                <div className="ui pointing red basic label">
                    Please enter a value
                </div>
            );
        }
    }

    render() {
        const errors = validate(this.state.name, this.state.sport, this.state.lookingFor, this.state.phoneNumber);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return (
            <div className="form">
                <Header/>
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
                                {this.showNameError()}
                            </div>
                            <div className="required field">
                                <label>Sport: </label>
                                <input
                                    type="text"
                                    placeholder="eg: Soccer"
                                    value={this.state.sport}
                                    onChange={this.onChangeSport.bind(this)}
                                />
                                {this.showSportError()}
                            </div>
                            <div className="required field">
                                <label>Preferred role: </label>
                                <input
                                    type="text"
                                    placeholder="eg: Can play as a centre-back"
                                    value={this.state.lookingFor}
                                    onChange={this.onChangeLooking.bind(this)}
                                />
                                {this.showLookingError()}
                            </div>
                            <div>
                                <label>Additional info: </label>
                                <textarea
                                    placeholder="eg: Free on Friday and Saturday evenings"
                                    value={this.state.info}
                                    onChange={this.onChangeInfo.bind(this)}
                                />
                            </div>
                            <div className="buttons">
                                <button
                                    type="submit"
                                    className="ui green button"
                                    disabled={isDisabled}>
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="ui button"
                                    onClick={this.handleReset}>
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

export default playerForm;