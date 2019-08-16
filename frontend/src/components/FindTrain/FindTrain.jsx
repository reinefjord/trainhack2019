import React from "react";

export default class FindTrain extends React.Component {
  constructor() {
    super();

    this.state = {
      sendingRequest: false,
      error: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    console.log(e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      sendingRequest: true
    });
  }

  render() {
    const { sendingRequest } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input placeholder="Train id" onChange={this.onChange} />
        {sendingRequest ? "Fetching data..." : ""}
      </form>
    );
  }
}
