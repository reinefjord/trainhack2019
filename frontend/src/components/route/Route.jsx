import React from "react";
import "./Route.css";
import { client } from "../../routes_backend/client.js";

const time = new Intl.DateTimeFormat(undefined, {
  timeStyle: "short"
});

function Stop(stop) {
  return (
    <div
      onClick={stop.onClick}
      className={`Stop ${stop.active ? "active" : ""}`}
      key="id"
    >
      <div className="StopName">
        <div>{stop.name}</div>
        <div className="Time">{time.format(stop.departureTime)}</div>
      </div>
      <div className="VerticalAlignMiddle">
        <div className="Blob" />
      </div>
      <AlternativeRouteInfo {...stop} />
      {stop.children}
    </div>
  );
}

export default class Route extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stops: [...props.stops], acitve: null };

    this.onClick = this.onClick.bind(this);
  }
  onClick(number) {
    if (number === this.state.active) {
      this.setState({ active: null });
    } else {
      this.setState({ active: number });
    }
  }

  render() {
    return (
      <div className="Route">
        {this.state.stops.map((stop, i) => (
          <Stop
            key={stop.id}
            {...stop}
            onClick={e => this.onClick(i)}
            active={this.state.active === i}
          >
            {i ? <div className="VerticalBarTop" /> : null}
            {i === this.state.stops.length - 1 ? null : (
              <div className="VerticalBarBottom" />
            )}
          </Stop>
        ))}
      </div>
    );
  }
}

function alternatives(n) {
  return `${n || "no"} alternative${n === 1 ? "" : "s"}`;
}

class AlternativeRouteInfo extends React.Component {
  state = {
    alternatives: null,
    error: null
  };

  componentDidMount() {
    client
      .getAlternativeRoutes(this.props)
      .then(
        alternatives => this.setState({ alternatives }),
        error => this.setState({ error })
      );
  }

  render() {
    if (this.state.error) {
      return <p className="Minutes">{String(this.state.error)}</p>;
    }

    if (!this.state.alternatives) {
      return <p className="Minutes">Loading...</p>;
    }

    return (
      <p className="Minutes">{alternatives(this.state.alternatives.length)}</p>
    );
  }
}
