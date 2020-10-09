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
				<ClusterInfoGrid />
			</div>
		);
	}
}
