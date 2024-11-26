"use client";

import React, { useState } from "react";
import TestimonialForm from "@/app/components/TestimonialForm";

export default function TestimonialsPage() {
	const [openCreateTestimonialModal, setOpenCreateTestimonialModal] = useState(false);

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
			<div className="bg-white rounded-lg shadow p-6">
				<h2 className="text-xl font-semibold mb-4">Testimonials</h2>
				<p>Testimonials content goes here.</p>
			</div>
			{openCreateTestimonialModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Create Testimonial</h2>
						<TestimonialForm handleCloseTestimonialModal={handleCloseTestimonialModal} />
					</div>
				</div>
			)}
		</>
	);
}
