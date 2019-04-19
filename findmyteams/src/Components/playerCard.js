import React from 'react';

const PlayerCard = (props) => {
    console.log(props.user);
    return (
        <div className="ui cards">
            <div className="card">
                <div className="content">
                    <div className="header">{props.user.displayName}</div>
                    <div className="meta">Friend</div>
                    <div className="description">
                        Elliot Fu is a film-maker from New York.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;