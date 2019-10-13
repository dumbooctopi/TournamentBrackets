/* eslint-disable import/extensions */
import React from 'react';
import { connect } from "react-redux";

import MainContainer from './MainContainer.jsx'
import Form from './Form.jsx'
import '../styles.css';
import { logIn } from "../actions/actionCreator";

const mapStateToProps = function(state) {
  console.log("STATE", state)
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
    this.props.logIn()
    // this.setState({isLoggedIn:this.props.isLoggedIn})
    setInterval(console.log(this.props.isLoggedIn), 2000)
  }

  render(){
    if(this.props.isLoggedIn){
      return <div>hihihi</div>
    } else {
      return (
        <div>
          {/* <Header /> */}
          <MainContainer />
          <Form />
          <button onClick={this.handleClick}>Sign Up</button>
  
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
