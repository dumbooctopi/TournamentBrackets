import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../actions/actionCreator";

function mapDispatchToProps(dispatch) {
  return {
    addUser: user => dispatch(addUser(user))
  };
}

class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ user: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.state;
    this.props.addUser(user);
    this.setState({ user: "" });
  }
  render() {
    const { user } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="user">User</label>
          <input
            type="text"
            className="form-control"
            value={user}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;
