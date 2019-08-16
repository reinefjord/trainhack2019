import React from 'react';
import './Route.css';
import { client } from '../../routes_backend/client.js';

const time = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'short',
});

function Stop(stop) {
  return (
    <div className="Stop" key="id">
      <div className="StopName">
        <div>{stop.name}</div>
        <div>{time.format(stop.departureTime)}</div>
      </div>
      <div className="Blob"></div>
      <AlternativeRouteInfo {...stop} />
    </div>
  );
}

export default function({stops: [origin, ...stops]}) {
  return (
    <div className="Route">
      <Stop {...origin}></Stop>
      {stops.map((stop) => <Stop key={stop.id} {...stop}/>)}
    </div>
  );
}

function alternatives(n) {
  return `${n || 'no'} alternative${n === 1 ? '' : 's'}`;
}

class AlternativeRouteInfo extends React.Component {
  state = {
    alternatives: null,
    error: null,
  };

  componentDidMount() {
    client.getAlternativeRoutes(this.props)
      .then(
        (alternatives) => this.setState({ alternatives }),
        (error) => this.setState({ error }));
  }

  render() {
    if (this.state.error) {
      return <p>{String(this.state.error)}</p>
    }

    if (!this.state.alternatives) {
      return <p>Loading...</p>;
    }

    return <p>{alternatives(this.state.alternatives.length)}</p>;
  }
}