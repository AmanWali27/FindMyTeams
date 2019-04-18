import firebase from 'firebase/app';
import 'firebase/auth';
import Rebase from 're-base';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyB_VMuH0KADB_BvF_LyXqmC8zTHqEOhPe4",
    authDomain: "findmyteams-19b7a.firebaseapp.com",
    databaseURL: "https://findmyteams-19b7a.firebaseio.com/"
};

const app = firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const db = firebase.database(app);
const fbase = Rebase.createClass(db);
export default fbase;