import React from "react";
import { connect } from "react-redux";
import Form from './Form.jsx'

const mapStateToProps = state => {
  return { users: state.users };
};
const ConnectedList = ({ users }) => (
  <div>
    <ul className="list-group">
      {users.map((el, ind) => (
        <li className="list-group-item" key={el+ind}>
          {el}
        </li>
      ))}
    </ul>
    <Form />
    <button>Create Tournament</button>
  </div>

);

const MainContainer = connect(mapStateToProps)(ConnectedList);
export default MainContainer;
