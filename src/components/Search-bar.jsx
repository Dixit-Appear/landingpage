import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
  }

  handleUpdate = (event) => {
    //Change the state of term
    this.setState({
      term: event.target.value
    });
    event.preventDefault();
    this.props.searchFunction(event.target.value);
  };

  render() {
    return (
      <input
      value={this.state.term}
      type="text"
      className="form-search form-control"
      onChange={this.handleUpdate}
      />
    );
  }
}