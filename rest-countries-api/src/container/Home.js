import React from "react";

import Cards from "./Cards";
import ControlBar from "./ControlBar";

import { DownIndicatorSVG } from "../assets/index";

function Home() {
	return (
		<>
			<ControlBar />
			<div className="cards">
				<Cards />
			</div>

			<div
				className="button button-to-top"
				onClick={() => window.scrollTo(0, 0)}
			>
				<DownIndicatorSVG />
			</div>
		</>
	);
}

export default Home;
