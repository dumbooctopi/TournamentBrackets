/* eslint-disable import/extensions */
import React from 'react';
import { connect } from "react-redux";
import { Route, Link } from 'react-router-dom';

import MainContainer from './MainContainer.jsx'
import Splash from './Splash.jsx'
import '../styles.css';
import { logIn } from "../actions/actionCreator";
import Tournament from './Tournament'
const mapStateToProps = function(state) {
  // console.log("STATE", state)
  return {
    isLoggedIn: state.isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: () => dispatch(logIn())
  };
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e){
    // this.setState({isLoggedIn:true}, console.log(this.state))
    // this.props.logIn()
    // this.setState({isLoggedIn:this.props.isLoggedIn})
    // setInterval(console.log(this.props.isLoggedIn), 2000)
  }

  render(){
      return (
        <React.Fragment>
          <Route exact path="/" component={Splash} />
          <Route path="/main" component={MainContainer} />
          <Route path="/tournaments" component={Tournament} />
        </React.Fragment>
      );
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
