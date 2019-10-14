import React from "react";
import { connect } from "react-redux";
import Form from './Form.jsx'
import { Link } from 'react-router-dom';
import { addUser } from "../actions/actionCreator";

const mapStateToProps = state => {
  return { users: state.users };
};

function mapDispatchToProps(dispatch) {
  return {
    addUser: user => dispatch(addUser(user))
  };
}


class ConnectedList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      players:[]
    }
    this.choosePlayer = this.choosePlayer.bind(this)
  }

  componentDidMount(){
    fetch('http://localhost:8080/users/getAll').then(res=>res.json())
    .then(data=> data.forEach(user=>this.props.addUser(user)))
  }

  choosePlayer(e){
    if(!this.state.players.includes(e.target.innerHTML)) this.setState({players:[...this.state.players, e.target.innerHTML]})
    console.log(this.state)
  }

  render(){
    return (
      <div>
      Add Players
        <ul className="list-group" >
          {this.props.users.map((el, ind) => (
            <li onClick={(e)=>this.choosePlayer(e)} className="list-group-item" key={el+ind}>
              {el.username}
            </li>
          ))}
        </ul>
        <button>Create Tournament</button>
      </div>
    ); 
  }
}

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default MainContainer;
