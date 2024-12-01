"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import GalleryForm from "@/components/GalleryForm";

export default function GalleryPage() {
	const [openCreateGalleryModal, setOpenCreateGalleryModal] = useState(false);
	const [gallery, setGallery] = useState([]);

	useEffect(() => {
		const fetchGalleryData = async () => {
			await fetchGallery();
		};
		fetchGalleryData();
	}, []);

	const fetchGallery = async () => {
		try {
			const res = await fetch("/api/gallery");
			const data = await res.json();
			setGallery(data.gallery);
		} catch (error) {
			console.error("Error fetching gallery items:", error);
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

	const handleCloseGalleryModal = () => {
		setOpenCreateGalleryModal(false);
	};

	const handleCreateGallery = () => {
		setOpenCreateGalleryModal(true);
	};

	return (
		<>
			<div className="text-right">
				<button onClick={handleCreateGallery} className="bg-red-800 text-white font-bold px-4 py-2 my-4">
					Create Gallery Item
				</button>
			</div>
			<div className="bg-white rounded-lg shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Media Type</TableHead>
							<TableHead>Media</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Alt</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{gallery.length > 0 ? (
							gallery.map((gallery) => (
								<TableRow key={gallery._id}>
									<TableCell className="font-semibold">{gallery.mediatype}</TableCell>
									<TableCell>{gallery.mediatype === "image" ? <Image src={gallery.media} width={200} height={200} alt={gallery.media} className="w-24 h-32 object-cover" /> : <video src={gallery.media} controls autoPlay className="w-24 h-32 object-cover" />} </TableCell>
									<TableCell>{gallery.category}</TableCell>
									<TableCell>{gallery.alt}</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button variant="ghost" size="icon" onClick={() => handleView(gallery.id)}>
												<Eye className="w-6 h-6 text-green-700" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleEdit(gallery.id)}>
												<Pencil className="w-6 h-6 text-blue-700" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleDelete(gallery.id)}>
												<Trash2 className="w-6 h-6 text-red-700" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className="text-center">
									No gallery item/s found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{openCreateGalleryModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Create Gallery Item</h2>
						<GalleryForm handleCloseGalleryModal={handleCloseGalleryModal} />
					</div>
				</div>
			)}
		</>
	);
}
