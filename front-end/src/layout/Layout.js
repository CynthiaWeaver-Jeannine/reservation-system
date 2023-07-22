/** @format */

import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";


import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
	return (
		<div className="container-fluid">
			<div
				className="row h-100"
				id="navbar">
				<div className="col-md-2 side-bar">
					<Menu />
				</div>
				<div className="col">
					<Routes />
				</div>
			</div>
			<div className="row h-10">
            <div className="container">
			<div className="col justify-content-between py-3 my-4 border-top">
				<p className="row mb-0 text-muted">
					<a href="#top">Back to top</a>
				</p>
			</div>
		</div>
			</div>
		</div>
	);
}

export default Layout;