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
    console.log(e.target.value)
    if(e.target.style.backgroundColor !== 'lightblue') e.target.style.backgroundColor = 'lightblue'
    else e.target.style.backgroundColor = ''

    if(!this.state.players.includes(e.target.value)) this.setState({players:[...this.state.players, e.target.value]})
    else {
      const newState = [...this.state.players].filter(ele=>ele!==e.target.value)
      this.setState({players: newState})
    }
    console.log(this.state)
  }

  render(){
    return (
      <div>
      Add Players
        <ul className="list-group" >
          {this.props.users.map((el, ind) => (
            <li onClick={(e)=>this.choosePlayer(e)} value={el.id} className="list-group-item" key={el+ind}>
              {el.username}
            </li>
          ))}
        </ul>
        <button onClick={()=>console.log(this.state)}>Create Tournament</button>
      </div>
    ); 
  }
}

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default MainContainer;
