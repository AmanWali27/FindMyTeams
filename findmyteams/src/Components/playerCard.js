import React from 'react';
import Modal from 'react-awesome-modal';
import { auth, db } from './../fbase';

class PlayerCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    openModal() {
        if(this.state.visible === false) {
            this.setState({
                visible: true
            });
        }
    }

    closeModal() {
        if(this.state.visible === true) {
            this.setState({
                visible: false
            });
        }
    }

    additionalInfo = () => {
        console.log(this.props.obj.info);
        if(this.props.obj.info===""){
            return (
                <div className="description">
                    <i className="info circle icon"></i>
                    Contact for additional info
                </div>
            );
        }else{
            return (
                <div className="description">
                    <i className="info circle icon"></i>
                    Additional info: {this.props.obj.info}
                </div>
            );
        }
    };

    lookingFor = () => {
        if(this.props.meta==="Team"){
            return (
                <div className="description">
                    Looking for: {this.props.obj.lookingFor}
                </div>
            );
        }else{
            return (
                <div className="description">
                    Preferred role: {this.props.obj.lookingFor}
                </div>
            );
        }
    };

    showTeamName = () => {
        if(this.props.meta==="Team" && this.props.obj.teamName!==""){
            return (
                <div className="ui center aligned meta">
                    Team name: {this.props.obj.teamName}
                </div>
            );
        }
    };

    showPhoneNumber = () => {
        return (
            <div className="description">
                <i className="phone icon"></i>
                Phone number: 1234567890
            </div>
        );
    };

    tester = () => {
        console.log("IT CLICKED!!!!!");
    }

    deleteItem = () => {
        // console.log(this.props.obj);
        const u=auth.currentUser.uid;
        const r=this.props.obj.rid;
        const m=this.props.meta;
        const s=this.props.obj.sid;
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

    deleteOrClose = () =>{
        if(this.props.edit === true){
            return (
                <button className="ui align bottom" onClick={this.deleteItem}>
                    Delete this
                </button>
            );
        }
        else{
            return (
                <a className="ui align bottom" href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
            );
        }
    };

    render () {
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
                        <h1>{this.props.obj.name}</h1>
                        <div className="ui large message">
                            {this.additionalInfo()}
                        </div>
                        <div className="ui large message">
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
                         data-tooltip="Add users to your feed"
                         data-position="top center"
                         onClick={() => this.openModal()}
                    >
                        <div className="content">
                            <div className="ui center aligned header">
                                {this.props.obj.name}
                            </div>
                            <div className="ui center aligned meta">
                                {this.props.obj.sport}
                            </div>
                            {this.showTeamName()}
                            {this.lookingFor()}
                            {/*{this.additionalInfo()}*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
export default PlayerCard;