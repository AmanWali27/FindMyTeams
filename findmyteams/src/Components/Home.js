import React from 'react';
import { Container, Button, Link, darkColors, lightColors } from 'react-floating-action-button';
import Header from './Header';
import addform from './Form'
import playerFrom from './playerForm'

const Home = () =>{
    console.log("HELLO");
    return(
        <div>
            <Header/>
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
                <Link href={`/form`}
                      tooltip="Find a Player"
                      styles={{backgroundColor: lightColors.teal}}
                      icon="large inverted user icon"/>
                <Link href={`/plform`}
                      tooltip="Find a Team"
                      styles={{backgroundColor: lightColors.teal}}
                      icon="large inverted users icon" />
                <Button
                    tooltip="Find players and teams!"
                    styles={{backgroundColor: darkColors.teal}}
                    icon="big inverted plus icon"
                    rotate={false}
                    onClick={() => alert('FAB Rocks!')} />
            </Container>
        </div>
    );
};

export default Home;