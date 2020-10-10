import React from "react";
import getClusterDetails from "../services/getClusterDetails";
import ClusterInfoGridLine from "./ClusterInfoGridLine";

export default class ClusterInfoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clusterDetails: [],
    };
  }

  async componentDidMount() {
    const clusterDetails = await getClusterDetails();
    this.setState({ clusterDetails: clusterDetails.data.data });
  }

  render() {
    return (
      <div class="bs-component">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">WPT Client ID</th>
              <th scope="col">IP Address</th>
              <th scope="col">Version</th>
              <th scope="col">Uptime (min)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.clusterDetails.map((client) => (
              <ClusterInfoGridLine clientLine={client} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

/*
 */
