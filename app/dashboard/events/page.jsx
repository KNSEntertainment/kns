"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import EventForm from "@/components/EventForm";
import useFetchData from "@/hooks/useFetchData";

export default function EventsPage() {
	const [openCreateEventModal, setOpenCreateEventModal] = useState(false);
	const { data: events, error, loading } = useFetchData("/api/events", "events");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

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
							<TableHead>Event Price</TableHead>
							<TableHead>Poster</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{events.length > 0 ? (
							events.map((event) => (
								<TableRow key={event._id}>
									<TableCell className="font-semibold">{event.eventname}</TableCell>
									<TableCell>{event.eventcountry}</TableCell>
									<TableCell>{event.eventdate}</TableCell>
									<TableCell>{event.eventprice}</TableCell>
									<TableCell>
										<Image src={event.eventposterUrl || "/placeholder.jpg"} width={200} height={200} alt={event.eventname || "alt"} className="w-24 h-32 object-cover" />
									</TableCell>
									<TableCell>
										<div className="flex space-x-2">
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
						<h2 className="text-lg font-bold text-white bg-red-700 p-4 mb-6 text-center">Create Event</h2>
						<EventForm handleCloseEventModal={handleCloseEventModal} fetchEvents={events} />
					</div>
				</div>
			)}
		</>
	);
}
