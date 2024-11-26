import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareEvent from "@/app/components/ShareEvent";

async function getEventDetails(id) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, { cache: "no-store" });
		if (!res.ok) {
			throw new Error("Failed to fetch event");
		}
		return res.json();
	} catch (error) {
		console.error("Error fetching event:", error);
		return null;
	}
}

export default async function EventPage({ params }) {
	const event1 = await getEventDetails(params.id);
	const event = event1.event;

	if (!event) {
		notFound();
	}

	console.log("Response: ", event);
	return (
		<div className="flex flex-col lg:flex-row gap-8 p-6">
			<main className="flex-grow">
				<h1 className="text-4xl font-bold mb-6">{event.eventname}</h1>
				<div className="mb-6 relative w-full">
					<Image src={event.eventposterUrl} alt={event.eventname} width={750} height={750} className="" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
					<div className="flex items-center">
						<Calendar className="h-5 w-5 mr-2 text-primary" />
						<span>{event.eventdate}</span>
					</div>
					<div className="flex items-center">
						<MapPin className="h-5 w-5 mr-2 text-primary" />
						<span>{event.eventaddress}</span>
					</div>
					{/* <div className="flex items-center">
						<Clock className="h-5 w-5 mr-2 text-primary" />
						<span>{event.eventtime}</span>
					</div> */}
					{/* <div className="flex items-center">
						<Users className="h-5 w-5 mr-2 text-primary" />
						<span>{event.capacity} attendees</span>
					</div> */}
				</div>
				{/* <div className="prose max-w-none">
					<h2 className="text-2xl font-semibold mb-4">Event Description</h2>
					<p>{event.eventdescription}</p>
				</div> */}
				{/* <div className="mt-8">
					<h2 className="text-2xl font-semibold mb-4">Event Schedule</h2>
					<ul className="space-y-2">
						{event.schedule.map((item, index) => (
							<li key={index} className="flex items-start">
								<span className="font-medium mr-2">{item.time}:</span>
								<span>{item.activity}</span>
							</li>
						))}
					</ul>
				</div> */}
			</main>
			<aside className="mt-16 w-full lg:w-1/3 space-y-6">
				{/* <div className="bg-gray-100 p-6 rounded-lg">
					<h2 className="text-2xl font-semibold mb-4">Event Details</h2>
					<ul className="space-y-2">
						<li>
							<strong>Organizer:</strong> {event.organizer}
						</li>
						<li>
							<strong>Category:</strong> {event.category}
						</li>
						<li>
							<strong>Price:</strong> {event.price === 0 ? "Free" : `$${event.price}`}
						</li>
					</ul>
				</div> */}
				{/* <ShareEvent title={event.eventname} description={event.eventdescription} startDate={new Date(event.eventdate)} endDate={new Date(event.eventdate)} /> */}
				<Button className="w-full bg-primary text-white" size="lg">
					Register for Event
				</Button>
				<ShareEvent title={event.eventname} description={event.eventdescription} startDate={new Date(event.eventdate)} endDate={new Date(event.eventdate)} />
			</aside>
		</div>
	);
}
