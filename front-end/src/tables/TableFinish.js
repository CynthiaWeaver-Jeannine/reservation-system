/** @format
 * 
 * Path: front-end\src\tables\TableFinish.js
 */

import React from "react";

//import components
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the table finish button.
 * @param table
 * the table to be finished
 * @param clickHandler
 * the function to call when the button is clicked
 * @returns {JSX.Element}
 */
const TableFinish = ({ table, clickHandler, error, ...props }) => {
	return (
		table.reservation_id && (
			<div>
				<ErrorAlert error={error} />
				<button
					{...props}
					className="btn btn-warning"
					type="button"
					onClick={(e) => clickHandler(e, table.table_id)}>
					Finish
				</button>
			</div>
		)
	);
};

export default TableFinish;
