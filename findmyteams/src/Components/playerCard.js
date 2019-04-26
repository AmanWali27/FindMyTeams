import React from 'react';
import Modal from 'react-awesome-modal';
import {auth, db} from './../fbase';
import firebase from "firebase";

class PlayerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            phoneNumber: '',
        }
    }

    openModal() {
        if (this.state.visible === false) {
            this.setState({
                visible: true
            });
        }
    }

    closeModal() {
        if (this.state.visible === true) {
            this.setState({
                visible: false
            });
        }
    }

    additionalInfo = () => {
        console.log(this.props.obj.info);
        if (this.props.obj.info === "") {
            return (
                <div className="description">
                    <i className="info circle icon"></i>
                    <a className="item" style={{fontSize: 14, color: "black"}}>
                        Contact for additional info
                    </a>
                </div>
            );
        } else {
            return (
                <div className="description">
                    <i className="info circle icon"></i>
                    <a className="item" style={{fontSize: 14, color: "black"}}>
                        Additional info: {this.props.obj.info}
                    </a>
                </div>
            );
        }
    };

    lookingFor = () => {
        if (this.props.meta === "Team") {
            return (
                <div className="description">
                    Looking for: {this.props.obj.lookingFor}
                </div>
            );
        } else {
            return (
                <div className="description">
                    Preferred role: {this.props.obj.lookingFor}
                </div>
            );
        }
    };

    showTeamName = () => {
        if (this.props.meta === "Team" && this.props.obj.teamName !== "") {
            return (
                <div className="ui center aligned meta">
                    <a className="item" style={{fontSize: 14}}>
                        Team name: {this.props.obj.teamName}
                    </a>
                </div>
            );
        }
    };

    showPhoneNumber = () => {
        return (
            <div className="description">
                <i className="phone icon"></i>
                <a className="item" style={{fontSize:14, color:"black"}}>
                    Phone number: {this.state.phoneNumber}
                </a>
            </div>
        );
    };

    componentDidMount() {
        const path = '/Phone/' + this.props.obj.uid + '/';
        firebase.database().ref(path).once('value').then(response => {
            this.setState({
                phoneNumber: response.val().phoneNumber
            })
        });
    }

    deleteItem = () => {
        // console.log(this.props.obj);
        const u = auth.currentUser.uid;
        const r = this.props.obj.rid;
        const m = this.props.meta;
        const s = this.props.obj.sid;
        console.log("r is");
        console.log(r);
        console.log("m is ");
        console.log(m);
        console.log(this.props.obj)
        const userRef = db.ref("Posts/" + m + "s/" + r + "/");
        console.log(userRef);
        userRef.remove();
        const userRef2 = db.ref("Posts/" + m + "Sports/" + s + "/");
        console.log(userRef2);
        userRef2.remove();
    };

    deleteOrClose = () => {
        if (this.props.edit === true) {
            return (
                <button className="ui align bottom" onClick={this.deleteItem}>
                    <a className="item" style={{fontSize: 12}}>
                        Delete this
                    </a>
                </button>
            );
        } else {
            return (
                <a className="ui align bottom" href="javascript:void(0);" onClick={() => this.closeModal()}>
                    <a className="item" style={{fontSize: 12}}>
                        Close
                    </a>
                </a>
            );
        }
    };

    render() {
        return (
            <div className="ui cards" style={{paddingTop: 30}}>
                <Modal
                    visible={this.state.visible}
                    width="50%"
                    height="40%"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div className="ui center aligned header">
                        <h1 style={{fontSize: '25px', color:"black", paddingTop:40}}>
                            <a className="item" style={{fontSize: '20px', color:"black"}}>
                                {this.props.obj.name}
                            </a>
                        </h1>
                        <div style={{fontSize: '17px', marginTop: 20, marginLeft: 40, marginRight: 40}}
                             className="ui large message">
                            {this.additionalInfo()}
                        </div>
                        <div style={{fontSize: '17px', marginLeft: 40, marginRight: 40}} className="ui large message">
                            {this.showPhoneNumber()}
                        </div>
                        {this.deleteOrClose()}
                        {/*<button className="ui align bottom" onClick={this.deleteItem}>*/}
                        {/*Delete this*/}
                        {/*</button>*/}
                        {/*<a className="ui align bottom" href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>*/}
                    </div>
                </Modal>
                <div className="ui teal raised card">
                    <div className="ui basic button"
                         data-inverted=""
                         data-tooltip="Click this card for contact info!"
                         data-position="top center"
                         onClick={() => this.openModal()}
                    >
                        <div className="content">
                            <div className="ui center aligned header">
                                <a className="item" style={{fontSize: 17, color: "black"}}>
                                    {this.props.obj.name}
                                </a>
                            </div>
                            <div className="ui center aligned meta">
                                <a className="item" style={{fontSize: 14, marginBottom: 0, paddingBottom: 0}}>
                                    {this.props.obj.sport}
                                </a>
                            </div>
                            <a className="item" style={{fontSize: 14, marginTop: 0, paddingTop: 0}}>
                                {this.showTeamName()}
                            </a>
                            <a className="item" style={{fontSize: 14, marginTop: 0, paddingTop: 0}}>
                                {this.lookingFor()}
                            </a>
                            {/*{this.additionalInfo()}*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
export default PlayerCard;