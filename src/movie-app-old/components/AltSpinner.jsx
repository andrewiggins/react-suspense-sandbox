import * as React from "react";
import "./AltSpinner.css";

export default function AltSpinner(props) {
	return (
		<div className="spinner">
			<div className="bounce1" />
			<div className="bounce2" />
			<div className="bounce3" />
		</div>
	);
}
