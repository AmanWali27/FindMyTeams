import React from 'react';
import {auth, db} from './../fbase';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation';

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
            info: ""
        };
    }

    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            var curUser = auth.currentUser;
            const u = auth.currentUser;
            console.log(u);
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

    render() {
        return (
            <div className="form">
                <Form
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form className="ui huge form" onSubmit={handleSubmit}>
                            <h1 className="ui center aligned dividing header">
                                Fill out this form to find someone to play your sport with!
                            </h1>
                            <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 20}}>
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
                                        <button type="submit" disabled={submitting || pristine}>
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={form.reset}
                                            disabled={submitting || pristine}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </div>
        );
    }
}

export default addForm;