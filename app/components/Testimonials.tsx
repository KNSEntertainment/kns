import TestimonialCard from "./TestimonialCard";

const testimonials = [
	{
		id: 1,
		name: "Hari Prasad Sanjel",
		location: "Oslo, Norway",
		text: "KNS Entertainment brought a piece of home to Oslo. The concerts are always top-notch and remind me of the beauty of our culture.",
		avatar: "/Hari Prasad Sanjel.jpg",
	},
	{
		id: 2,
		name: "Hridaya Sanjel",
		location: "Stockholm, Sweden",
		text: "I've attended several events organized by KNS Entertainment, and each one has been a unique and unforgettable experience.",
		avatar: "/Hridaya Sanjel.jpg",
	},
	{
		id: 3,
		name: "Jaya Devi Bista",
		location: "Berlin, Germany",
		text: "The cultural programs are not just entertaining but also educational. It's a great way to introduce Nepali culture to my European friends.",
		avatar: "/Jaya Devi Bista.jpg",
	},
];
export default function Testimonials() {
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">What Our Audience Says</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial) => (
						<TestimonialCard key={testimonial.id} testimonial={testimonial} />
					))}
				</div>
			</div>
		</section>
	);
}
