import React from "react";
import PropTypes from "prop-types";

export default class ClusterInfoGridLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clusterDetails: [],
    };
  }
  render() {
    return (
      <tr class="table-active">
        <th scope="row">pi-wpt-client1</th>
        <td>10.10.0.91</td>
        <td>201001.181015</td>
        <td>2500</td>
        <td>
          {" "}
          <button type="button" class="btn btn-warning">
            &#9900; &#9900; &#9900;
          </button>
        </td>
      </tr>
    );
  }
}

ClusterInfoGridLine.propTypes = {
  clientLine: PropTypes.object.isRequired,
  isEvenRow: PropTypes.bool,
};
