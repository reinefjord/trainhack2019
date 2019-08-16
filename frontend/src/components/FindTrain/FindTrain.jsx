import React from "react";
import "./FindTrain.css";

export default class FindTrain extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(e.target.trainId.value);
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <input
            name="trainId"
            className="InputField"
            placeholder="Find your trip with the train id!"
          />
        </form>
        {this.props.loading ? <div>Fetching data...</div> : ""}
      </>
    );
  }
}
