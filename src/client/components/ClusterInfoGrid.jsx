import React from "react";
import getClusterDetails from "../services/getClusterDetails";

export default class ClusterInfoGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clusterDetails: [],
		};
	}

	async componentDidMount() {
		const clusterDetails = await getClusterDetails();
		this.setState(clusterDetails);
	}

	render() {
		return <div>{JSON.stringify(this.state.clusterDetails)}</div>;
	}
}
