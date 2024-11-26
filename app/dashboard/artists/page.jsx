"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import ArtistForm from "@/app/components/ArtistForm";

export default function ArtistsPage() {
	const [artists, setArtists] = useState([]);
	const [openCreateArtistModal, setOpenCreateArtistModal] = useState(false);

	useEffect(() => {
		const fetchArtistData = async () => {
			await fetchArtists();
		};
		fetchArtistData();
	}, []);

	const fetchArtists = async () => {
		try {
			const res = await fetch("/api/artists");
			const data = await res.json();
			setArtists(data.artists);
		} catch (error) {
			console.error("Error fetching artists:", error);
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

	const handleCloseArtistModal = () => {
		setOpenCreateArtistModal(false);
	};

	const handleCreateArtist = () => {
		setOpenCreateArtistModal(true);
	};

	return (
		<>
			<div className="text-right">
				<button onClick={handleCreateArtist} className="bg-red-800 text-white font-bold px-4 py-2 my-4">
					Create Artist
				</button>
			</div>
			<div className="bg-white rounded-lg shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Bio</TableHead>
							<TableHead>Genre</TableHead>
							<TableHead>Popular Songs</TableHead>
							<TableHead>Total Songs</TableHead>
							<TableHead>Performance Count</TableHead>
							<TableHead>Ratings</TableHead>
							<TableHead>Featured</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Social Media</TableHead>
							<TableHead>Image</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{artists.map((artist) => (
							<TableRow key={artist._id}>
								<TableCell className="font-semibold">{artist.name}</TableCell>
								<TableCell className="max-w-48">{artist.bio}</TableCell>
								<TableCell>{artist.genre}</TableCell>
								<TableCell>
									{artist.popularSongs.map((song, id) => (
										<h4 key={id}>{song}</h4>
									))}
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
									<Image src={artist.image} width={200} height={200} alt={artist.name} className="w-24 h-32 object-cover rounded-xl" />
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
			{openCreateArtistModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Create Artist</h2>
						<ArtistForm handleCloseArtistModal={handleCloseArtistModal} />
					</div>
				</div>
			)}
		</>
	);
}
