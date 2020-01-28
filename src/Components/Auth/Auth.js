import React from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import UserData from '../../Data/UserData';

class Auth extends React.Component {

    loginClickEvent = (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(() => {
            UserData.CheckUser()
            .then((result) => {
                if (result === 0) {
                    UserData.CreateUser()
                }
            })
            .catch()
        })
        .catch(err => console.error(err, 'log in failed'));
      }

    render() {
        return (
            <div>
                <h2>Please Log In</h2>
                <div className="auth-buttons">
                    <button onClick={this.loginClickEvent}>Login with Google</button>
                </div>
            </div>
        );
    }
}

export default Auth;