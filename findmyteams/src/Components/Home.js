import React from 'react';
import { Container, Button, Link } from 'react-floating-action-button'

const Home = () =>{
    console.log("HELLO");
    return(
        <div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100px'}}>
            <div className="ui compact menu">
                <a className="item">
                    Find a Player
                </a>
                <div className="link item">
                    Find a Team
                </div>
            </div>
        </div>

            <Container>
                <Button
                    tooltip="The big plus button!"
                    icon="fas fa-plus"
                    rotate={true}
                    onClick={() => alert('FAB Rocks!')} />
            </Container>
        </div>
    );
};

export default Home;