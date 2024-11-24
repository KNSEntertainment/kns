"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Users, ShoppingCart, Settings, BarChart3, BookImage, Drama, MessageCircle, BracketsIcon, ArrowBigLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";

const DashboardLayout = () => {
	const [activeMenu, setActiveMenu] = useState("events");

	const mockData = {
		events: [
			{ id: 1, name: "Oslo Sanjh", email: "Oslo", role: "2024-12-12" },
			{ id: 2, name: "Germany Sanskritik Karyakam", email: "Frankfort", role: "2024-12-11" },
		],
		artists: [
			{ id: 1, customer: "Pramod Kharel", total: "Folk", status: "/pramodK" },
			{ id: 2, customer: "Jyoti Magar", total: "Modern", status: "/JyotiMe" },
		],
	};
	const menuItems = [
		{ id: "events", label: "Events", icon: BookImage },
		{ id: "artists", label: "Artists", icon: Drama },
		{ id: "testimonials", label: "Testimonials", icon: MessageCircle },
		{ id: "settings", label: "Settings", icon: Settings },
	];

	const getTableColumns = (menuId) => {
		switch (menuId) {
			case "events":
				return ["Event Name", "Event Venue", "Event Date", "Actions"];
			case "artists":
				return ["Name", "Genre", "Facebook", "Instagram"];
			default:
				return [];
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

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<div className="w-64 bg-white shadow-lg">
				<div className="flex  flex-col space-y-4 p-4">
					<Link href="/" className="flex gap-2 bg-slate-100 hover:bg-slate-200 w-fit px-4 py-2 rounded-full">
						<ArrowLeft /> <p>Back</p>
					</Link>
					<h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
				</div>
				<nav className="mt-4">
					{menuItems.map((item) => {
						const Icon = item.icon;
						return (
							<button
								key={item.id}
								onClick={() => setActiveMenu(item.id)}
								className={`w-full flex items-center px-4 py-3 text-sm 
                  ${activeMenu === item.id ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
							>
								<Icon className="w-5 h-5 mr-3" />
								{item.label}
							</button>
						);
					})}
				</nav>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<header className="bg-white shadow-sm">
					<div className="p-4">
						<h2 className="text-lg font-semibold text-gray-800">{menuItems.find((item) => item.id === activeMenu)?.label}</h2>
					</div>
				</header>

				{/* Content Area */}
				<main className="flex-1 overflow-x-auto overflow-y-auto bg-gray-50 p-6">
					<div className="bg-white rounded-lg shadow">
						<Table>
							<TableHeader>
								<TableRow>
									{getTableColumns(activeMenu).map((column) => (
										<TableHead key={column}>{column}</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{activeMenu === "events" &&
									mockData?.events.map((event) => (
										<TableRow key={event.id}>
											<TableCell>{event.name}</TableCell>
											<TableCell>{event.email}</TableCell>
											<TableCell>{event.role}</TableCell>
											<TableCell>
												<div className="flex space-x-2">
													<Button variant="ghost" size="icon" onClick={() => handleView(event.id)}>
														<Eye className="w-4 h-4" />
													</Button>
													<Button variant="ghost" size="icon" onClick={() => handleEdit(event.id)}>
														<Pencil className="w-4 h-4" />
													</Button>
													<Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}>
														<Trash2 className="w-4 h-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								{activeMenu === "artists" &&
									mockData.artists.map((artist) => (
										<TableRow key={artist.id}>
											<TableCell>{artist.customer}</TableCell>
											<TableCell>{artist.total}</TableCell>
											<TableCell>{artist.status}</TableCell>
											<TableCell>
												<div className="flex space-x-2">
													<Button variant="ghost" size="icon" onClick={() => handleView(artist.id)}>
														<Eye className="w-4 h-4" />
													</Button>
													<Button variant="ghost" size="icon" onClick={() => handleEdit(artist.id)}>
														<Pencil className="w-4 h-4" />
													</Button>
													<Button variant="ghost" size="icon" onClick={() => handleDelete(artist.id)}>
														<Trash2 className="w-4 h-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</div>
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
