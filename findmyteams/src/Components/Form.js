import React from 'react';
import {auth, db} from './../fbase';

class form extends React.Component{
    constructor(props) {
        super(props);
        const userr = JSON.parse(localStorage.getItem('user'));
        this.state = {auth: false, user: userr ||  {}};
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
                localStorage.setItem('user', JSON.stringify(USER))
            } else {
                this.setState({ user: {} })
                localStorage.removeItem('user');
                this.setState({auth: false});
            }
        });
    }
    render () {
        return (
            <div>
                <Form>
                    <div>
                        Name:
                    </div>
                </Form>
            </div>
        );
    }
}

export default form;