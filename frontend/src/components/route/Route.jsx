import React from 'react';
import './Route.css';

const time = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'short',
});

function Stop({name, departureTime}) {
  return (
    <div className="Stop" key="id">
      <div className="StopName">
        <div>{name}</div>
        <div>{time.format(departureTime)}</div>
      </div>
      <div className="Blob"></div>
      <div className="AlternativeInfo">
        {
          // We'll put something interesting here at some point.
        }
      </div>
    </div>
  );
}

export default class Route extends React.Component {
  render() {
    const {stops: [origin, ...stops]} = this.props;
    return (
      <div className="Route">
        <Stop {...origin}></Stop>
        {stops.map((stop) => <Stop key={stop.id} {...stop}/>)}
      </div>
    );
  }
}

const exampleStops = [
  {
    id: 0,
    name: 'Stockholm C',
    departureTime: Date.now(),
  },
  {
    id: 1,
    name: 'Alvesta',
    departureTime: Date.now() + 134531,
  },
  {
    id: 2,
    name: 'Malmo',
    departureTime: Date.now() + 164513,
  },
];

export function DemoRoute() {
  return <Route stops={exampleStops}></Route>;
}