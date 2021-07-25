import React from "react";
import Search from "../components/Search";
import Filter from "../components/Filter";

function ControlBar() {
	return (
		<div className="control-bar">
			<div className="container">
				<Search />
				<Filter />
			</div>
		</div>
	);
}

export default ControlBar;
