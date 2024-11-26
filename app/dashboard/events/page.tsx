"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import EventForm from "@/app/components/EventForm";

const mockEvents = [
	{ id: 1, name: "Oslo Sanjh", email: "Oslo", role: "2024-12-12", poster: "/uploads/event5.jpg" },
	{ id: 2, name: "Germany Sanskritik Karyakam", email: "Frankfort", role: "2024-12-11", poster: "/uploads/samikshya.jpeg" },
	{ id: 3, name: "Paris Sanjh", email: "Paris", role: "2024-12-10", poster: "/uploads/dayarani.jpeg" },
];

export default function EventsPage() {
	const [openCreateEventModal, setOpenCreateEventModal] = useState(false);

	const handleView = (id: number) => {
		console.log("View item:", id);
	};

	const handleEdit = (id: number) => {
		console.log("Edit item:", id);
	};

	const handleDelete = (id: number) => {
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
						{mockEvents.map((event) => (
							<TableRow key={event.id}>
								<TableCell className="font-semibold">{event.name}</TableCell>
								<TableCell>{event.email}</TableCell>
								<TableCell>{event.role}</TableCell>
								<TableCell>
									<Image src={event.poster} width={200} height={200} alt={event.name} className="w-24 h-32 object-cover" />
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
						))}
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
