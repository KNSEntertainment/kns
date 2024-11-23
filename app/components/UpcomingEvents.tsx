import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const events = [
	{
		id: 1,
		title: "Nepali Night Oslo",
		date: "2024-06-15",
		location: "Oslo Spektrum, Norway",
		image: "/avatar.avif",
	},
	{
		id: 2,
		title: "Cultural Fusion Stockholm",
		date: "2024-07-22",
		location: "Ericsson Globe, Sweden",
		image: "/avatar.avif",
	},
	{
		id: 3,
		title: "Himalayan Echoes Berlin",
		date: "2024-08-10",
		location: "Mercedes-Benz Arena, Germany",
		image: "/avatar.avif",
	},
];

export default function UpcomingEvents() {
	return (
		<section id="events" className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{events.map((event, index) => (
						<motion.div key={event.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
							<Card className="overflow-hidden">
								<Image width={100} height={100} src={event.image} alt={event.title} className="w-full h-48 object-cover" />
								<CardHeader>
									<CardTitle>{event.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex items-center mb-2">
										<Calendar className="h-4 w-4 mr-2 text-primary" />
										<span className="text-sm text-gray-600">{event.date}</span>
									</div>
									<div className="flex items-center">
										<MapPin className="h-4 w-4 mr-2 text-primary" />
										<span className="text-sm text-gray-600">{event.location}</span>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
