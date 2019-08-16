import React from "react";

export default class FindTrain extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    console.log(e.target.value);
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
            placeholder="Find your trip with the train id!"
            onChange={this.onChange}
          />
        </form>
        {this.props.loading ? <div>Fetching data...</div> : ""}
      </>
    );
  }
}
