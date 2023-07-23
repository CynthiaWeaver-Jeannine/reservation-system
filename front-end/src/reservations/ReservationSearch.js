/** @format 
 * 
 * Path: front-end\src\reservations\ReservationSearch.js
*/

import React, { useState } from "react";

//import utility functions
import { searchReservations } from "../utils/api";

//import components
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";

/**
 * Defines the reservation search page.
 * @returns {JSX.Element}
 */

const ReservationSearch = () => {
	const [inputData, setInputData] = useState("");
	const [error, setError] = useState(null);
	const [reservations, setReservations] = useState([]);

	const submitHandler = async (event) => {
		event.preventDefault();
		setError(null);

		const abortController = new AbortController();
		try {
			const response = await searchReservations(
				inputData,
				abortController.signal,
			);

			setReservations(response);
			setInputData("");
		} catch (error) {
			if (error.name !== "AbortError") {
				setError(error);
			}
		}
		return () => abortController.abort();
	};

	const changeHandler = (event) => {
		const inputValue = event.target.value;
	
		// Remove any non-digit characters from the input value
		const numericValue = inputValue.replace(/\D/g, "");
	
		// Update the input state with the sanitized numeric value
		setInputData(numericValue);
	};

	return (
		<main>
			<div className="col form-group">
				<div className="row d-md-flex my-3">
					<h2>Find Reservation</h2>

					<ErrorAlert error={error} />
				</div>

				<form onSubmit={submitHandler}>
					<div className="row input-group mb-3">
						<input
							type="tel"
							className="form-control"
							name="mobile_number"
							placeholder="Enter a customer's phone number"
							aria-label="mobile_number"
							aria-describedby="basic-addon2"
							required={true}
							value={inputData}
							onChange={changeHandler}
						/>
						<button
							className="btn btn-primary"
							id="basic-addon2"
							type="submit">
							Find
						</button>
					</div>
				</form>
			</div>

			<div className="container-fluid col">
				<div className="row d-md-flex mb-3">
					<h4>Search Result</h4>
				</div>
				{reservations.length > 0 ? (
					<div className="row d-md-flex mb-3">
						<ReservationsList reservations={reservations} />
					</div>
				) : (
					<div
						className="row d-md-flex mb-3 alert alert-dark text-center"
						role="alert">
						No reservations found
					</div>
				)}
			</div>
		</main>
	);
};

export default ReservationSearch;