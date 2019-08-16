import React from "react";
import "./Route.css";
import { client } from "../../routes_backend/client.js";

const time = new Intl.DateTimeFormat(undefined, {
  timeStyle: "short"
});

function Stop({stop, destination, active, onClick, children}) {
  return (
    <div
      onClick={onClick}
      className={`Stop ${active ? "active" : ""}`}
      key="id"
    >
      <div className="StopName">
        <div>{stop.name}</div>
        <div className="Time">{time.format(stop.departureTime)}</div>
      </div>
      <div className="VerticalAlignMiddle">
        <div className="Blob" />
      </div>
      {destination && <AlternativeRouteInfo stop={stop} destination={destination} />}
      {children}
    </div>
  );
}

export default class Route extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stops: [...props.stops], active: null };

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
    const stops = [...this.state.stops];
    const destination = stops.pop();
    return (
      <div className="Route">
        {stops.map((stop, i) => (
          <Stop
            key={stop.id}
            stop={stop}
            destination={destination}
            onClick={e => this.onClick(i)}
            active={this.state.active === i}
          >
            {i ? <div className="VerticalBarTop" /> : null}
            <div className="VerticalBarBottom" />
          </Stop>
        ))}
        <Stop stop={destination}>
          <div className="VerticalBarTop" />
        </Stop>
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
    const {stop, destination} = this.props;
    client.getAlternativeRoutes(stop.coords, destination.coords, stop.arrivalTime || stop.departureTime)
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

    const {arrivalTime, departureTime} = this.props.destination;
    const endOriginalTime = (arrivalTime || departureTime).getTime();
    const endTimes = this.state.alternatives.map((trip) => {
      const {date, time} = trip.Destination;
      return Date.parse(`${date} ${time} GMT+0200`);
    });
    const end = Math.min(...endTimes);

    return (
      <div className="Minutes">
        <p>
          {alternatives(this.state.alternatives.length)}
        </p>
        {!this.state.alternatives.length ? null : <p>{Math.round((end - endOriginalTime) / 60000)} mins delay.</p>}
      </div>
    );
  }
}
