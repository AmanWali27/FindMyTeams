import React from 'react';

// const PlayerCard = (props) => {
//     console.log("in playercard");
//     console.log(props);
//     return (
//         <div className="ui cards">
//             <div className="card">
//                 <div className="content">
//                     <div className="header">Person</div>
//                     <div className="meta">Player</div>
//                     <div className="description">
//                         Details.
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


class PlayerCard extends React.Component{
    render () {
        return (
            <div className="ui cards">
                <div className="card">
                    <div className="content">
                        <div className="header">{this.props.obj.name}</div>
                        <div className="meta">Player</div>
                        <div className="description">
                            Details.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
export default PlayerCard;