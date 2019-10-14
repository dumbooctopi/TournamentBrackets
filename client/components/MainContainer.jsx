import React from "react";
import { connect } from "react-redux";
import Form from './Form.jsx'
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return { users: state.users };
};

const handleClick = () => {
  console.log("CLICK")
}

const ConnectedList = ({ users }) => (
  <div>
    <ul className="list-group" >
      {users.map((el, ind) => (
        <li className="list-group-item" key={el+ind}>
          {el}
        </li>
      ))}
    </ul>
    <Form />
    <button>Create Tournament</button>
    <Link>
      <button onClick={handleClick}>Create Admin</button>
    </Link>
  </div>

);

const MainContainer = connect(mapStateToProps)(ConnectedList);
export default MainContainer;
