import React from "react";
import "./public/static/scss/global.scss";
import ClusterInfoGrid from "./components/ClusterInfoGrid";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentIPs: [],
      errorMessage: "",
    };
  }

  render() {
    return (
      <div className="container">
        <ClusterInfoGrid />
      </div>
    );
  }
}
