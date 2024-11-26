import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
	const [testimonials, setTestimonials] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await fetch("/api/testimonials");
				const data = await response.json();

				if (data.success) {
					setTestimonials(data.testimonials);
				} else {
					console.error("Failed to fetch events:", data.error);
				}
			} catch (error) {
				console.error("Error fetching events:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTestimonials();
	}, []);

	if (loading) {
		return <p>Loading testimonials...</p>;
	}
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">What Our Audience Says</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial) => (
						<TestimonialCard key={testimonial._id} testimonial={testimonial} />
					))}
				</div>
			</div>
		</section>
	);
}
