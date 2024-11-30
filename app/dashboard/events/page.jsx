"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import EventForm from "@/app/components/EventForm";

export default function EventsPage() {
	const [openCreateEventModal, setOpenCreateEventModal] = useState(false);
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchEventData = async () => {
			await fetchEvents();
		};
		fetchEventData();
	}, []);

	const fetchEvents = async () => {
		try {
			const res = await fetch("/api/events");
			const data = await res.json();
			setEvents(data.events);
		} catch (error) {
			console.error("Error fetching events:", error);
		}
	};

	const handleView = (id) => {
		console.log("View item:", id);
	};

	const handleEdit = (id) => {
		console.log("Edit item:", id);
	};

	const handleDelete = (id) => {
		console.log("Delete item:", id);
	};

	const handleCloseEventModal = () => {
		setOpenCreateEventModal(false);
	};

	const handleCreateEvent = () => {
		setOpenCreateEventModal(true);
	};

	return (
		<>
			<div className="text-right">
				<button onClick={handleCreateEvent} className="bg-red-800 text-white font-bold px-4 py-2 my-4">
					Create Event
				</button>
			</div>
			<div className="bg-white rounded-lg shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Event Name</TableHead>
							<TableHead>Event Venue</TableHead>
							<TableHead>Event Date</TableHead>
							<TableHead>Poster</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{events.length > 0 ? (
							events.map((event) => (
								<TableRow key={event.eventname}>
									<TableCell className="font-semibold">{event.eventname}</TableCell>
									<TableCell>{event.eventcountry}</TableCell>
									<TableCell>{event.eventdate}</TableCell>
									<TableCell>
										<Image src={event.eventposterUrl} width={200} height={200} alt={event.eventname} className="w-24 h-32 object-cover" />
									</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button variant="ghost" size="icon" onClick={() => handleView(event.id)}>
												<Eye className="w-6 h-6 text-green-700" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleEdit(event.id)}>
												<Pencil className="w-6 h-6 text-blue-700" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}>
												<Trash2 className="w-6 h-6 text-red-700" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className="text-center">
									No events found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{openCreateEventModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Create Event</h2>
						<EventForm handleCloseEventModal={handleCloseEventModal} />
					</div>
				</div>
			)}
		</>
	);
}
