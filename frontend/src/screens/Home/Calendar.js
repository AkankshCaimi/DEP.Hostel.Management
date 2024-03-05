import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import "../../styles/tailwind.css";

const Cal = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [eventName, setEventName] = useState("");
	const [events, setEvents] = useState([]);

	const Date_Click_Fun = (date) => {
		setSelectedDate(date);
	};

	const Event_Data_Update = (event) => {
		setEventName(event.target.value);
	};

	const Create_Event_Fun = () => {
		if (selectedDate && eventName) {
			const newEvent = {
				id: new Date().getTime(),
				date: selectedDate,
				title: eventName,
			};
			setEvents([...events, newEvent]);
			setSelectedDate(null);
			setEventName("");
			setSelectedDate(newEvent.date);
		}
	};

	const Update_Event_Fun = (eventId, newName) => {
		const updated_Events = events.map((event) => {
			if (event.id === eventId) {
				return {
					...event,
					title: newName,
				};
			}
			return event;
		});
		setEvents(updated_Events);
	};

	const Delete_Event_Fun = (eventId) => {
		const updated_Events = events.filter((event) => event.id !== eventId);
		setEvents(updated_Events);
	};

	return (
		<div className="Calendar">
			<h1 className="head"> Calendar </h1>
			<div className="container001">
				<div className="calendar-container">
					<Calendar
						value={selectedDate}
						onClickDay={Date_Click_Fun}
						tileClassName={({ date }) =>
							selectedDate &&
								date.toDateString() === selectedDate.toDateString()
								? "selected"
								: events.some(
									(event) =>
										event.date.toDateString() ===
										date.toDateString(),
								)
									? "event-marked"
									: ""
						}
					/>{" "}
				</div>
				<div className="event-container">
					{" "}
					{selectedDate && (
						<div className="event-form">
							<p> Create Event for: </p>{" "}
							<p>
								{selectedDate.toLocaleDateString('en-GB')}
							</p>
							<input
								type="text"
								placeholder="Event Details"
								value={eventName}
								rows={3}
								onChange={Event_Data_Update}
								className="mb-2 px-2 py-1 rounded border border-gray-300 resize-none"
							/>

							<br />

							<button
								className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
								onClick={Create_Event_Fun}
							>
								Add Event
							</button>

						</div>
					)}
					{events.length > 0 && selectedDate && (
						<div className="event-list">
							<h2 > My Created Event List </h2>{" "}
							<div className="event-cards">
								{" "}
								{events.map((event) =>
									event.date.toDateString() ===
										selectedDate.toDateString() ? (
										<div
											key={event.id}
											className="event-card"
										>
											<div className="event-card-header">
												<span className="event-date">
													{" "}
													{event.date.toDateString()}{" "}
												</span>{" "}
												<div className="event-actions">
													<button
														className="update-btn"
														onClick={() =>
															Update_Event_Fun(
																event.id,
																prompt(
																	"ENTER NEW TITLE",
																),
															)
														}
													>
														Update Event{" "}
													</button>{" "}
													<button
														className="delete-btn"
														onClick={() =>
															Delete_Event_Fun(
																event.id,
															)
														}
													>
														Delete Event{" "}
													</button>{" "}
												</div>{" "}
											</div>{" "}
											<div className="event-card-body">
												<p className="event-title">
													{" "}
													{event.title}{" "}
												</p>{" "}
											</div>{" "}
										</div>
									) : null,
								)}{" "}
							</div>{" "}
						</div>
					)}{" "}
				</div>{" "}
			</div>{" "}
		</div>
	);
};

export default Cal;
