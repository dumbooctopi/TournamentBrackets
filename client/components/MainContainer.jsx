import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { users: state.users };
};
const ConnectedList = ({ users }) => (
  <ul className="list-group list-group-flush">
    {users.map((el, ind) => (
      <li className="list-group-item" key={el+ind}>
        {el}
      </li>
    ))}
  </ul>
);

const MainContainer = connect(mapStateToProps)(ConnectedList);
export default MainContainer;
