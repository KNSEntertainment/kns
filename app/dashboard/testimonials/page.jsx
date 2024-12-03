"use client";

import React, { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import TestimonialForm from "@/components/TestimonialForm";

export default function TestimonialsPage() {
	const [openCreateTestimonialModal, setOpenCreateTestimonialModal] = useState(false);
	const { data: testimonials, error, loading } = useFetchData("/api/testimonials", "testimonials");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	const handleView = (id) => {
		console.log("View item:", id);
	};

	const handleEdit = (id) => {
		console.log("Edit item:", id);
	};

	const handleDelete = (id) => {
		console.log("Delete item:", id);
	};

	const handleCloseTestimonialModal = () => {
		setOpenCreateTestimonialModal(false);
	};

	const handleCreateTestimonial = () => {
		setOpenCreateTestimonialModal(true);
	};

	return (
		<>
			<div className="text-right">
				<button onClick={handleCreateTestimonial} className="bg-red-800 text-white font-bold px-4 py-2 my-4">
					Create Testimonial
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
						{testimonials.length > 0 ? (
							testimonials.map((testimonial) => (
								<TableRow key={testimonial.audiencename}>
									<TableCell className="font-semibold">{testimonial.audiencename}</TableCell>
									<TableCell>{testimonial.audienceaddress}</TableCell>
									<TableCell>{testimonial.audiencetestimony}</TableCell>
									<TableCell>
										<Image src={testimonial.audienceimage} width={200} height={200} alt={testimonial.audiencename} className="w-16 h-16 rounded-full object-cover" />
									</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button variant="ghost" size="icon" onClick={() => handleView(testimonial._id)}>
												<Eye className="w-6 h-6 text-green-700" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial._id)}>
												<Pencil className="w-6 h-6 text-blue-700" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial._id)}>
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
			{openCreateTestimonialModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Create Testimonial</h2>
						<TestimonialForm handleCloseTestimonialModal={handleCloseTestimonialModal} fetchTestimonials={fetchTestimonials} />
					</div>
				</div>
			)}
		</>
	);
}
