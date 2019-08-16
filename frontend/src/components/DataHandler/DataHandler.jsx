import React from "react";
import { client } from "../../routes_backend/client";

export default class DataHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stops: [],
      isFetchingRoute: false
    };

    this.fetchRoute = this.fetchRoute.bind(this);
  }

  async fetchRoute(trainId) {
    console.log("Fetching route", trainId);

    this.setState({
      isFetchingRoute: true,
      stops: []
    });

    const { stops } = await client.getStopsAlongRoute(trainId);
    this.setState({
      stops,
      isFetchingRoute: false
    });
  }

  render() {
    const { fetchRoute } = this;
    const { children } = this.props;
    const { stops, isFetching } = this.state;
    return <>{children({ stops, loading: isFetching, fetchRoute })}</>;
  }
}
