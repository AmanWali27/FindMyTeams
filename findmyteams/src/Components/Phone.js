import React from 'react';
import Paper from "@material-ui/core/Paper";
import styles from "./background";
import Header from './Header'

class Phone extends React.Component {
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
                                <input style={{fontSize:'17px'}} type="text" placeholder="Phone Number"/>
                            </div>
                        </div>
                        <button style={{fontSize:'17px'}} className="ui large teal button">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Phone;