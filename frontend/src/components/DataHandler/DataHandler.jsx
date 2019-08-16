import React from "react";
import { client } from "../../routes_backend/client";

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
      stops: [],
      isFetchingRoute: false
    };

    this.fetchRoute = this.fetchRoute.bind(this);
  }

  async fetchRoute(trainId) {
    console.log("Fetching route", trainId);

    this.setState({
      isFetchingRoute: true
    });

    const res = await client.getStopsAlongRoute(trainId);

    this.setState({
      ...res,
      isFetchingRoute: false
    });
  }

  render() {
    const { fetchRoute } = this;
    const { children } = this.props;
    const { train, stops, isFetching } = this.state;
    return <>{children({ train, stops, loading: isFetching, fetchRoute })}</>;
  }
}
