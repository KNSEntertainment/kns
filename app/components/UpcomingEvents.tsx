import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const events = [
	{
		id: 1,
		title: "Nepali Night Oslo",
		date: "2024-06-15",
		location: "Oslo Spektrum, Norway",
		image: "/samikshya.jpeg",
	},
	{
		id: 2,
		title: "Cultural Fusion Stockholm",
		date: "2024-07-22",
		location: "Ericsson Globe, Sweden",
		image: "/haschaeurope.jpeg",
	},
	{
		id: 3,
		title: "Himalayan Echoes Berlin",
		date: "2024-08-10",
		location: "Mercedes-Benz Arena, Germany",
		image: "/chakkapanja.jpeg",
	},
	{
		id: 4,
		title: "Himalayan Echoes Berlin",
		date: "2024-08-10",
		location: "Mercedes-Benz Arena, Germany",
		image: "/dayarani.jpeg",
	},
];

export default function UpcomingEvents() {
	return (
		<section id="events" className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{events.map((event, index) => (
						<motion.div key={event.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
							<Card className="overflow-hidden group">
								<div className="overflow-hidden">
									<Image width={400} height={300} src={event.image} alt={event.title} className="w-full h-96 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 " />
								</div>{" "}
								<Link href="/event/[id]" as={`/event/${event.id}`}>
									<CardHeader>
										<CardTitle>{event.title}</CardTitle>
									</CardHeader>
								</Link>
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
								<CardFooter>
									<Link href="/event/[id]" as={`/event/${event.id}`}>
										<Button className="bg-red-600">View Details</Button>
									</Link>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
