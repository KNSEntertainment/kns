"use client";

import React, { useState } from "react";
import useFetchData from "@/hooks/useFetchData";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import ArtistForm from "@/components/ArtistForm";

export default function ArtistsPage() {
	const [openCreateArtistModal, setOpenCreateArtistModal] = useState(false);
	const { data: artists, error, loading } = useFetchData("/api/artists", "artists");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

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
				{artists.length === 0 && !loading && <p>No artists available.</p>}

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
									<Image src={artist.image || "/placeholder.jpg"} width={200} height={200} alt={artist.name || "alt"} className="w-16 h-16 object-cover rounded-full" />
								</TableCell>
								<TableCell>
									<div className="flex space-x-2">
										<Button variant="ghost" size="icon" onClick={() => handleEdit(artist._id)}>
											<Pencil className="w-6 h-6 text-blue-700" />
										</Button>
										<Button variant="ghost" size="icon" onClick={() => handleDelete(artist._id)}>
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
						<ArtistForm handleCloseArtistModal={handleCloseArtistModal} fetchArtists={artists} />
					</div>
				</div>
			)}
		</>
	);
}
