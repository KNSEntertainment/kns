import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
	{
		id: 1,
		name: "Aarav Sharma",
		location: "Oslo, Norway",
		text: "NepalEvents brought a piece of home to Oslo. The concerts are always top-notch and remind me of the beauty of our culture.",
		avatar: "/avatar-1.jpg",
	},
	{
		id: 2,
		name: "Sita Gurung",
		location: "Stockholm, Sweden",
		text: "I've attended several events organized by NepalEvents, and each one has been a unique and unforgettable experience.",
		avatar: "/avatar-2.jpg",
	},
	{
		id: 3,
		name: "Bijay Thapa",
		location: "Berlin, Germany",
		text: "The cultural programs are not just entertaining but also educational. It's a great way to introduce Nepali culture to my European friends.",
		avatar: "/avatar-3.jpg",
	},
];
export default function Testimonials() {
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">What Our Audience Says</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div key={testimonial.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
							<Card>
								<CardContent className="pt-6">
									<div className="flex items-center mb-4">
										<Avatar className="h-10 w-10 mr-4">
											<AvatarImage src={testimonial.avatar} alt={testimonial.name} />
											<AvatarFallback>{testimonial.name[0]}</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-semibold">{testimonial.name}</p>
											<p className="text-sm text-gray-600">{testimonial.location}</p>
										</div>
									</div>
									<p className="text-gray-600 italic">&ldquo;{testimonial.text}&rdquo;</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
