/** @format */

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

const ReservationEdit = () => {
	const history = useHistory();
	const { reservation_id } = useParams();

	const [reservation, setReservation] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();

		async function loadReservation() {
			try {
				const loadedReservation = await readReservation(
					reservation_id,
					abortController.signal,
				);
				setReservation(loadedReservation);
				setLoading(false);
			} catch (error) {
				if (error.name !== "AbortError") {
					setError(error);
					setLoading(false);
				}
			}
		}
		loadReservation();
		return () => abortController.abort();
	}, [reservation_id]);

	const changeHandler = (event) => {
		const { name, value } = event.target;
		setReservation({
			...reservation,
			[name]: value,
		});
	};

	const validateReservation = () => {
		// Add any validation logic here, e.g., check if "people" is a valid number
		// Return true if the reservation is valid, false otherwise
		return true;
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		setError(null);

		if (!validateReservation()) {
			setError({ message: "Invalid reservation. Please check your input." });
			return;
		}

		const abortController = new AbortController();
		reservation.people = Number(reservation.people);

		try {
			const response = await updateReservation(
				reservation,
				abortController.signal,
			);
			history.push(
				`/dashboard?date=${formatAsDate(response.reservation_date)}`,
			);
		} catch (error) {
			if (error.name !== "AbortError") {
				setError(error);
			}
		}
		return () => abortController.abort();
	};

	const cancelHandler = () => {
		history.goBack();
	};

	if (loading) {
		return "Loading...";
	}

	if (reservation) {
		return (
			<div>
				<h2>Edit reservation {reservation.reservation_id}</h2>
				<ErrorAlert error={error} />
				<ReservationForm
					reservation={reservation}
					changeHandler={changeHandler}
					submitHandler={submitHandler}
					cancelHandler={cancelHandler}
				/>
			</div>
		);
	}

	return "Reservation not found.";
};

export default ReservationEdit;
