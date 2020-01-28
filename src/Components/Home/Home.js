import React, { Component } from 'react';
import values from '../APIRequests/values';
import './Home.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import ProductCard from '../ProductCard/ProductCard';

class Home extends Component {

  state = {
    displayValues : []
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }  

  
  logMeIn = (e) => {
    // e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then();
  }

  getValues = () => {
    // make API call
    values.getValues()
      .then((resp) => {
        let myNewValues = [...resp];
        this.setState({displayValues : myNewValues});
      })
      .catch((error) => console.log(error))
  }

  showAllValues = () => {
    const myValues = [...this.state.displayValues];
    return myValues.map((item) => {
      return <ProductCard product={item}/>
    })
  }

  render () {
    return (
      <div className="Home">
          <button onClick={this.logMeOut}>Log Out</button>
          <button onClick={this.logMeIn}>Log In</button>
          <button onClick={this.getValues}>Load Data</button>
         {this.props.authed ? <h2>{firebase.auth().currentUser.displayName.split(' ')[1]}</h2>: <h2>no auth dog</h2>}
          <div className="productContainer">{this.showAllValues()}</div>
      </div>
    );
  }
}

export default Home;