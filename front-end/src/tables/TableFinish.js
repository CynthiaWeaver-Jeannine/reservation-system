/** @format */

import React from "react";

//import components
import ErrorAlert from "../layout/ErrorAlert";

const TableFinish = ({ table, clickHandler, error, ...props }) => {
	return (
		table.reservation_id && (
			<div>
				<ErrorAlert error={error} />
				<button
					{...props}
					className="btn btn-danger"
					type="button"
					onClick={(e) => clickHandler(e, table.table_id)}>
					Finish
				</button>
			</div>
		)
	);
};

export default TableFinish;
