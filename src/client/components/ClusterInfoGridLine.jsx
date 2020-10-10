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
        <th scope="row">{this.props.clientLine.id}</th>
        <td>{this.props.clientLine.ip}</td>
        <td>{this.props.clientLine.version}</td>
        <td>{this.props.clientLine.upMinutes}</td>
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
