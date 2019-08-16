import React from "react";

export default class DataHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      train: {
        trainNumber: "1212ABC",
        departureTime: Date.now(),
        origin: "Stockholm",
        destination: "Malmö"
      },
      stops: [
        {
          id: "0",
          name: "Stockholm C",
          departureTime: Date.now()
        },
        {
          id: 1,
          name: "Alvesta",
          departureTime: Date.now() + 134531
        },
        {
          id: 2,
          name: "Malmo",
          departureTime: Date.now() + 164513
        }
      ],
      isFetchingRoute: false
    };
  }

  fetchRoute(trainId) {
    this.setState({
      isFetchingRoute: true
    });

    // this.setState({
    //   route: await fetch(...)
    // })
  }

  render() {
    const { children } = this.props;
    const { train, stops } = this.state;
    return <>{children({ train, stops })}</>;
  }
}
