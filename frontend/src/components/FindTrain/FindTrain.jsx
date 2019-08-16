import React from "react";
import "./FindTrain.css";

export default class FindTrain extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(e.target.value);
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <input
            className="InputField"
            placeholder="Find your trip with the train id!"
          />
        </form>
        {this.props.loading ? <div>Fetching data...</div> : ""}
      </>
    );
  }
}
