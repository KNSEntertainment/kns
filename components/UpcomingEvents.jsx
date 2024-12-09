"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Eye, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BuyTicketButton } from "./BuyTicketButton";

export default function UpcomingEvents() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	// const [filter, setFilter] = useState("upcoming");
	// const [searchTerm, setSearchTerm] = useState("");
	// const [countryFilter, setcountryFilter] = useState("");
	// const [dateFilter, setDateFilter] = useState("");
	// const [filteredEvents, setFilteredEvents] = useState([]);
	// const [countries, setCountries] = useState([]);
	// const [dates, setDates] = useState([]);

	// const formatDateWithDay = (dateString) => {
	// 	const date = new Date(dateString);
	// 	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	// 	const day = days[date.getDay()];
	// 	return `${dateString} (${day})`;
	// };

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch("/api/events");
				const data = await response.json();

				if (data.success) {
					setEvents(data.events);
					// const uniqueCountries = [...new Set(data.events.map((event) => event.eventcountry))];
					// const uniqueDates = [...new Set(data.events.map((event) => event.eventdate))];
					// setCountries(uniqueCountries);
					// setDates(uniqueDates);
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

	// useEffect(() => {
	// 	const currentDate = new Date();

	// 	let filtered = events;

	// 	// Apply time filter
	// 	if (filter === "upcoming") {
	// 		filtered = filtered.filter((event) => new Date(event.eventdate) > currentDate);
	// 	} else if (filter === "past") {
	// 		filtered = filtered.filter((event) => new Date(event.eventdate) <= currentDate);
	// 	}

	// 	// Apply search filter
	// 	if (searchTerm) {
	// 		filtered = filtered.filter((event) => event.eventname.toLowerCase().includes(searchTerm.toLowerCase()));
	// 	}

	// 	// Apply country filter
	// 	if (countryFilter && countryFilter !== "all_countries") {
	// 		filtered = filtered.filter((event) => event.eventcountry === countryFilter);
	// 	}

	// 	// Apply date filter
	// 	if (dateFilter && dateFilter !== "all_dates") {
	// 		filtered = filtered.filter((event) => event.eventdate === dateFilter);
	// 	}

	// 	setFilteredEvents(filtered);
	// }, [filter, events, searchTerm, countryFilter, dateFilter]);

	if (loading) {
		return <p>Loading events...</p>;
	}

	return (
		<section id="events" className="py-8 sm:py-16 bg-gray-100">
			<div className="container mx-auto px-2 sm:px-4">
				<h2 className="text-3xl font-bold text-center mb-6 sm:mb-12">
					Upcoming <span className="text-red-500">Events</span>
				</h2>

				{events.length > 0 ? (
					<motion.div key="events-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-8">
						{events.map((event, index) => (
							<motion.div key={event._id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
								<Card className=" overflow-hidden h-full group">
									<div className="overflow-hidden">
										<Image width={400} height={300} src={event?.eventposterUrl || "/placeholder.jpg"} alt={event?.eventname || "alt"} className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
									</div>

									<Link href={`/events/${event?._id}`}>
										<CardHeader>
											<span className=" border-black border-2 rounded-full w-fit px-2 py-1 mb-1 text-black text-xs sm:text-md font-semibold">{event?.eventcountry}</span>
											<CardTitle className="line-clamp-1">{event?.eventname}</CardTitle>
										</CardHeader>
									</Link>
									<CardContent className="">
										<div className="flex justify-between">
											<div className="flex items-center mb-2">
												<Calendar className="h-4 w-4 mr-2 text-primary" />
												<span className="text-sm text-gray-600">{event?.eventdate}</span>
											</div>
											<div className="flex items-center mb-2">
												<Clock className="h-4 w-4 mr-2 text-primary" />
												<span className="text-sm text-gray-600 line-clamp-1">{event?.eventtime} </span>
											</div>
										</div>
										<div className="flex justify-between">
											<div className="flex items-center">
												<MapPin className="h-4 w-4 mr-2 text-primary" />
												<span className="text-sm text-gray-600 line-clamp-1">{event?.eventvenue}</span>
											</div>
											{/* <div className="flex items-center">
													<Globe className="h-4 w-4 mr-2 text-primary" />
													<span className="text-sm text-gray-600 line-clamp-1">Country</span>
												</div> */}
											<div className="text-2xl font-bold">{event.eventprice !== "0" && "€" + event.eventprice}</div>
										</div>
									</CardContent>
									<CardFooter className="flex justify-between">
										<Link href={`/events/${event?._id}`}>
											<Button variant="secondary" className="hover:bg-slate-200">
												<Eye className="hidden md:block h-4 w-4" />
												View Details
											</Button>
										</Link>
										{/* <Button variant="outline" onClick={handleAddToCart} disabled={loading}> */}
										{new Date(event?.eventdate) > new Date() && <BuyTicketButton btnText="Add to Cart" eventId={event?.eventname} price={event?.eventprice} />}
									</CardFooter>
								</Card>
							</motion.div>
						))}
					</motion.div>
				) : (
					<motion.p key="no-events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-gray-600">
						No events available for this filter combination.
					</motion.p>
				)}
			</div>
			<Link href="/events">
				<Button variant="outline" className="flex justify-center mx-auto mt-6 sm:mt-12">
					View All Events
				</Button>
			</Link>
		</section>
	);
}
