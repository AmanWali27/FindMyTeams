import React from 'react';
import Paper from "@material-ui/core/Paper";
import styles from "./background";
import Header from './Header'
import {auth, db} from "../fbase";

class Phone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: ""
        };
    }

    onChangeNumber(event) {
        this.setState({phoneNumber: event.target.value})
    }

    handleSubmit= (e) => {
        e.preventDefault();
        console.log("About to submit");
        const u=auth.currentUser.uid;
        const userRef = db.ref("Users/" + u + "/");
        userRef.update(
            {
                phoneNumber: this.state.phoneNumber
            }
        ).then((data) => {
            console.log('form sent');
            //this.props.navigation.navigate('requests')
        }).catch((error) => {
            console.log(error)
        });
    };

    render () {
        return (
            <div>
                <Header/>
                <div className="center-screen">

                    <div className="ui form">
                        <div className="one field">
                            <div className="field">
                                <label style={{fontSize:'25px'}}>Please Enter Your Phone Number</label>
                                <br/>
                                <input
                                    style={{fontSize:'17px'}}
                                    type="text"
                                    placeholder="Phone Number"
                                    value={this.state.phoneNumber}
                                    onChange={this.onChangeNumber.bind(this)}
                                />
                            </div>
                        </div>
                        <button onClick={this.handleSubmit} style={{fontSize:'17px'}} className="ui large teal button">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Phone;