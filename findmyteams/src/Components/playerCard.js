import React from 'react';

class PlayerCard extends React.Component{

    additionalInfo = () => {
        console.log(this.props.obj.info);
        if(this.props.obj.info===""){
        }else{
            return (
                <div className="description">
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

    render () {
        return (
            <div className="ui cards" style={{paddingTop: 5}}>
                <div className="ui teal raised card">
                    <div className="content">
                        <div className="ui center aligned header">
                            {this.props.obj.name}
                        </div>
                        <div className="ui center aligned meta">
                            {this.props.obj.sport}
                        </div>
                        {this.showTeamName()}
                        {this.lookingFor()}
                        {this.additionalInfo()}
                    </div>
                </div>
            </div>
        );
    }
};
export default PlayerCard;