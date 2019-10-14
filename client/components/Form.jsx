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
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="user">Tournament Name  </label>
            <input
              type="text"
              className="form-control"
              value={this.props.state.tournamentName}
              onChange={this.props.handleChange}
            />
          </div>
          {/* <button type="submit" className="btn btn-success btn-lg">
            SAVE
          </button> */}
        </form>
      </div>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;
