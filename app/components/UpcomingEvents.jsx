import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function UpcomingEvents() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState("all");
	const [filteredEvents, setFilteredEvents] = useState(events);

	useEffect(() => {
		const currentDate = new Date();

		if (filter === "upcoming") {
			setFilteredEvents(events.filter((event) => new Date(event.eventdate) > currentDate));
		} else if (filter === "past") {
			setFilteredEvents(events.filter((event) => new Date(event.eventdate) <= currentDate));
		} else {
			setFilteredEvents(events);
		}
	}, [filter, events]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch("/api/events");
				const data = await response.json();

				if (data.success) {
					setEvents(data.events);
				} else {
					console.error("Failed to fetch events:");
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
		<section id="events" className="py-16 bg-gray-100">
			<div className="container mx-auto px-4">
				<div className="flex gap-4 w-full items-center justify-center mb-12">
					<Button onClick={() => setFilter("all")} variant={filter === "all" ? "default" : "outline"} aria-pressed={filter === "all"}>
						All Events
					</Button>
					<Button onClick={() => setFilter("upcoming")} variant={filter === "upcoming" ? "default" : "outline"} aria-pressed={filter === "upcoming"}>
						Upcoming Events
					</Button>
					<Button onClick={() => setFilter("past")} variant={filter === "past" ? "default" : "outline"} aria-pressed={filter === "past"}>
						Past Events
					</Button>
				</div>
				<AnimatePresence mode="wait">
					{filteredEvents.length > 0 ? (
						<motion.div key="events-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
							{filteredEvents.map((event, index) => (
								<motion.div key={event.eventname} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
									<Card className="overflow-hidden group">
										<div className="overflow-hidden">
											<Image width={400} height={300} src={event?.eventposterUrl} alt={event?.eventname} className="w-full h-96 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
										</div>
										<Link href={`/events/${event?._id}`}>
											<CardHeader>
												<CardTitle>{event?.eventname}</CardTitle>
											</CardHeader>
										</Link>
										<CardContent>
											<div className="flex items-center mb-2">
												<Calendar className="h-4 w-4 mr-2 text-primary" />
												<span className="text-sm text-gray-600">{event?.eventdate}</span>
											</div>
											<div className="flex items-center">
												<MapPin className="h-4 w-4 mr-2 text-primary" />
												<span className="text-sm text-gray-600">{event?.eventaddress}</span>
											</div>
										</CardContent>
										<CardFooter>
											<Link href={`/events/${event?._id}`}>
												<Button className="bg-red-600">View Details</Button>
											</Link>
										</CardFooter>
									</Card>
								</motion.div>
							))}
						</motion.div>
					) : (
						<motion.p key="no-events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-gray-600">
							No events available for this time range.
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
}

// import { motion } from "framer-motion";
// import { Calendar, MapPin } from "lucide-react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";

// export default function UpcomingEvents() {
// 	const [events, setEvents] = useState([]);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		const fetchEvents = async () => {
// 			try {
// 				const response = await fetch("/api/events");
// 				const data = await response.json();

// 				if (data.success) {
// 					setEvents(data.events);
// 					console.log("Events fetched successfully:", data.events);
// 				} else {
// 					console.error("Failed to fetch events:", data.error);
// 				}
// 			} catch (error) {
// 				console.error("Error fetching events:", error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchEvents();
// 	}, []);

// 	if (loading) {
// 		return <p>Loading events...</p>;
// 	}
// 	return (
// 		<section id="events" className="py-16 bg-gray-100">
// 			<div className="container mx-auto px-4">
// 				<h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
// 				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
// 					{events &&
// 						events.map((event, index) => (
// 							<motion.div key={index} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
// 								<Card className="overflow-hidden group">
// 									<div className="overflow-hidden">
// 										<Image width={400} height={300} src={event?.eventposterUrl} alt={event?.eventposterUrl} className="w-full h-96 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 " />
// 									</div>{" "}
// 									<Link href="/event/[id]" as={`/event/${event?._id}`}>
// 										<CardHeader>
// 											<CardTitle>{event?.eventname}</CardTitle>
// 										</CardHeader>
// 									</Link>
// 									<CardContent>
// 										<div className="flex items-center mb-2">
// 											<Calendar className="h-4 w-4 mr-2 text-primary" />
// 											<span className="text-sm text-gray-600">{event?.eventdate}</span>
// 										</div>
// 										<div className="flex items-center">
// 											<MapPin className="h-4 w-4 mr-2 text-primary" />
// 											<span className="text-sm text-gray-600">{event?.eventaddress}</span>
// 										</div>
// 									</CardContent>
// 									<CardFooter>
// 										<Link href="/event/[id]" as={`/event/${event?._id}`}>
// 											<Button className="bg-red-600">View Details</Button>
// 										</Link>
// 									</CardFooter>
// 								</Card>
// 							</motion.div>
// 						))}
// 				</div>
// 			</div>
// 		</section>
// 	);
// }
