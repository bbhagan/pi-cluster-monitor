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
            <ClusterInfoGridLine clientLine="text text text" />

            <tr class="table-secondary">
              <th scope="row">pi-wpt-client2</th>
              <td>10.10.0.92</td>
              <td>201001.181015</td>
              <td>2500</td>
              <td>
                {" "}
                <button type="button" class="btn btn-warning">
                  &#9900; &#9900; &#9900;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
