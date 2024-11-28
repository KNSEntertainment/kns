"use client";

import UpcomingEvents from "../components/UpcomingEvents";
import EventsFilterBar from "../components/EventsFilterBar";

const EventsPage = () => {
	// const [events, setEvents] = useState([]);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	// Fetch data from the API
	// 	const fetchEvents = async () => {
	// 		try {
	// 			const response = await fetch("/api/events");
	// 			const data = await response.json();

	// 			if (data.success) {
	// 				setEvents(data.events);
	// 			} else {
	// 				console.error("Failed to fetch events:", data.error);
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching events:", error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchEvents();
	// }, []);

	// if (loading) {
	// 	return <p>Loading events...</p>;
	// }

	return;
	<>
		<UpcomingEvents />
		<EventsFilterBar />
	</>;
};

export default EventsPage;
