"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const EventsPage = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch data from the API
		const fetchEvents = async () => {
			try {
				const response = await fetch("/api/events");
				const data = await response.json();

				if (data.success) {
					setEvents(data.events);
				} else {
					console.error("Failed to fetch events:", data.error);
				}
			} catch (error) {
				console.error("Error fetching events:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	if (loading) {
		return <p>Loading events...</p>;
	}

	return (
		<div className="container mx-auto text-3xl w-full h-screen bg-slate-100 ">
			<h1 className="text-center py-24">Events</h1>
			{events.length === 0 ? (
				<h2 className="text-center py-24">No Events Found</h2>
			) : (
				<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{events.map((event) => (
						<li key={event._id}>
							<h2>{event.title}</h2>
							<p>{event.description}</p>
							<p>{new Date(event.date).toLocaleDateString()}</p>
							<Image src={event.fileUrl} alt={event.title} width={200} height={200} style={{ width: "200px", height: "auto" }} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default EventsPage;
