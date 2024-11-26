"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Users, ShoppingCart, Settings, BarChart3, BookImage, Drama, MessageCircle, BracketsIcon, ArrowBigLeft, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import EventForm from "../components/EventForm";
import ArtistForm from "../components/ArtistForm";
import TestimonialForm from "../components/TestimonialForm";

const DashboardLayout = () => {
	const [activeMenu, setActiveMenu] = useState("events");
	const [openCreateEventModal, setOpenCreateEventModal] = useState(false);
	const [openCreateArtistModal, setOpenCreateArtistModal] = useState(false);
	const [openCreateTestimonialModal, setOpenCreateTestimonialModal] = useState(false);

	const mockData = {
		events: [
			{ id: 1, name: "Oslo Sanjh", email: "Oslo", role: "2024-12-12", poster: "/uploads/event5.jpg" },
			{ id: 2, name: "Germany Sanskritik Karyakam", email: "Frankfort", role: "2024-12-11", poster: "/uploads/samikshya.jpeg" },
			{ id: 3, name: "Paris Sanjh", email: "Paris", role: "2024-12-10", poster: "/uploads/dayarani.jpeg" },
		],
		artists: [
			{
				id: 1,
				name: "Jyoti Magar",
				genre: "Modern",
				image: "/jyoti.jpeg",
				bio: "A modern Nepali singer known for her unique style and energetic performances.",
				totalsongs: 134,
				rating: 4.9,
				popularSongs: ["Timilai Dekhera", "Chirbir Chirbir", "Sakambari"],
				socialMedia: {
					facebook: "https://facebook.com/jyotimagar",
					instagram: "https://instagram.com/jyotimagar",
				},
				performanceCount: 150,
				contact: "jyotimagar@music.com",
				featured: true,
			},
			{
				id: 2,
				name: "Prakash Saput",
				genre: "Folk",
				image: "/prakashsaput.jpeg",
				bio: "A prominent figure in Nepali folk music with a message-driven style.",
				totalsongs: 160,
				rating: 4.8,
				popularSongs: ["Bol Maya", "Galbandi", "Mero Pani Haina Ra"],
				socialMedia: {
					facebook: "https://facebook.com/prakashsaput",
					instagram: "https://instagram.com/prakashsaput",
				},
				performanceCount: 200,
				contact: "contact@prakashsaput.com",
				featured: true,
			},
			{
				id: 3,
				name: "Samikshya Adhikari",
				genre: "Instrumental Folk",
				image: "/samikshya1.jpeg",
				bio: "A versatile instrumentalist blending traditional and modern folk tunes.",
				totalsongs: 150,
				rating: 4.9,
				popularSongs: ["Instrumental Magic", "Himalayan Echoes", "Arko kun hola"],
				socialMedia: {
					facebook: "https://facebook.com/samikshya",
					instagram: "https://instagram.com/samikshya",
				},
				performanceCount: 75,
				contact: "info@samikshya.com",
				featured: false,
			},
			{
				id: 4,
				name: "Melina Rai",
				genre: "Folk",
				image: "/melina.jpeg",
				bio: "Known for her melodious voice and heartwarming folk songs.",
				totalsongs: 134,
				rating: 4.5,
				popularSongs: ["Kutu Ma Kutu", "Timro Bhaka", "Dashain Tihar"],
				socialMedia: {
					facebook: "https://facebook.com/melinarai",
					instagram: "https://instagram.com/melinarai",
				},
				performanceCount: 120,
				contact: "melinarai@music.com",
				featured: true,
			},
		],
	};
	const menuItems = [
		{ id: "events", label: "Events", icon: BookImage },
		{ id: "artists", label: "Artists", icon: Drama },
		{ id: "testimonials", label: "Testimonials", icon: MessageCircle },
		{ id: "subscribers", label: "Subscribers", icon: Mail },
		{ id: "settings", label: "Settings", icon: Settings },
	];

	const getTableColumns = (menuId) => {
		switch (menuId) {
			case "events":
				return ["Event Name", "Event Venue", "Event Date", "Poster", "Actions"];
			case "artists":
				return ["Name", "Bio", "Genre", "Popular Songs", "Total Songs", "Performance Count", "Ratings", "Featured", "Email", "Social Media", "Image", "Actions"];
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

	const handleCloseEventModal = () => {
		setOpenCreateEventModal(false);
	};
	const handleCloseArtistModal = () => {
		setOpenCreateArtistModal(false);
	};
	const handleCloseTestimonialModal = () => {
		setOpenCreateTestimonialModal(false);
	};

	const handleCreateEvent = () => {
		setOpenCreateEventModal(true);
	};
	const handleCreateArtist = () => {
		setOpenCreateArtistModal(true);
	};
	const handleCreateTestimonial = () => {
		setOpenCreateTestimonialModal(true);
	};

	return (
		<div className="mx-auto my-12 flex flex-col md:flex-row h-screen bg-gray-100">
			{/* Sidebar */}
			<div className="w-64 flex-col md:flex-row bg-white shadow-lg">
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
					<div className="text-right">
						<button onClick={activeMenu === "events" ? handleCreateEvent : activeMenu === "artists" ? handleCreateArtist : handleCreateTestimonial} className="bg-red-800 text-white font-bold px-4 py-2 my-4">
							Create {activeMenu === "events" ? "Event" : activeMenu === "artists" ? "Artist" : "Testimonial"}
						</button>
					</div>{" "}
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
										<TableRow key={event?.id}>
											<TableCell className="font-semibold">{event.name}</TableCell>
											<TableCell>{event?.email}</TableCell>
											<TableCell>{event?.role}</TableCell>
											<TableCell>
												<Image src={event?.poster} width={200} height={200} alt={event.id} className="w-24 h-32 object-cover" />
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
								{activeMenu === "artists" &&
									mockData.artists.map((artist) => (
										<TableRow key={artist.id}>
											<TableCell className="font-semibold">{artist.name}</TableCell>
											<TableCell className="max-w-48">{artist.bio}</TableCell>
											<TableCell>{artist.genre}</TableCell>
											<TableCell>
												{artist.popularSongs &&
													artist.popularSongs.map((song, id) => {
														return <h4 key={id}>{song}</h4>;
													})}
											</TableCell>
											<TableCell>{artist.totalsongs}</TableCell>
											<TableCell>{artist.performanceCount}</TableCell>
											<TableCell>{artist.rating}</TableCell>
											<TableCell>{artist.featured ? "Yes" : "No"}</TableCell>
											<TableCell>{artist.contact}</TableCell>
											<TableCell>
												{artist.socialMedia.facebook} <br />
												{artist.socialMedia.instagram}
											</TableCell>
											<TableCell>
												<Image src={artist?.image} width={200} height={200} alt={artist.id} className="w-24 h-32 object-cover rounded-xl" />
											</TableCell>
											<TableCell>
												<div className="flex space-x-2">
													<Button variant="ghost" size="icon" onClick={() => handleView(artist.id)}>
														<Eye className="w-6 h-6 text-green-700" />
													</Button>
													<Button variant="ghost" size="icon" onClick={() => handleEdit(artist.id)}>
														<Pencil className="w-6 h-6 text-blue-700" />
													</Button>
													<Button variant="ghost" size="icon" onClick={() => handleDelete(artist.id)}>
														<Trash2 className="w-6 h-6 text-red-700" />
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

			{/* Event Modal */}
			{openCreateEventModal && (
				<div>
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="bg-white p-6 rounded-lg shadow-lg w-96">
							<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Create Event</h2>
							<EventForm handleCloseEventModal={handleCloseEventModal} />
						</div>
					</div>
				</div>
			)}
			{openCreateArtistModal && (
				<div>
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="bg-white p-6 rounded-lg shadow-lg w-96">
							<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Create Artist</h2>
							<ArtistForm handleCloseArtistModal={handleCloseArtistModal} />
						</div>
					</div>
				</div>
			)}
			{openCreateTestimonialModal && (
				<div>
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="bg-white p-6 rounded-lg shadow-lg w-96">
							<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Create Testimonial</h2>
							<TestimonialForm handleCloseTestimonialModal={handleCloseTestimonialModal} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardLayout;
