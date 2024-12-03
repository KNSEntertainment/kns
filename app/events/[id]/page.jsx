import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, Globe, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareEvent from "@/components/ShareEvent";
import EventLayout from "./Layout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

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

	const eventdetails = [
		{ icon: Calendar, label: "Date", value: event.eventdate },
		{ icon: Clock, label: "Time", value: event.eventtime },
		{ icon: Globe, label: "Country", value: event.eventcountry },
		{ icon: MapPin, label: "Venue", value: event.eventvenue },
	];

	if (!event) {
		notFound();
	}

	console.log("Response: ", event);
	return (
		<EventLayout>
			<div className="container mx-auto flex flex-col lg:flex-row gap-8 pt-36 p-6">
				<main className="flex-grow">
					<h1 className="text-xl md:text-2xl xl:text-4xl font-bold mb-3">{event.eventname}</h1>
					<div className="mb-6 relative w-full">
						<Image src={event.eventposterUrl || "/placeholder.jpg"} alt={event.eventname} width={500} height={500} className="w-full" />
						<div className="mt-6">
							<h1 className="text-2xl font-bold">{event.eventname}</h1>
							<p>{event.eventdescription}</p>
						</div>
					</div>
				</main>
				<aside className="mt-14 w-full lg:w-1/3 space-y-6 md:space-y-12">
					<div className="bg-slate-100 border border-slate-300 rounded-xl mx-6 py-6">
						<CardTitle className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-6">Event Details</CardTitle>
						<div className="grid grid-cols-1 px-6 gap-4 mb-6">
							{eventdetails.map((detail, index) => (
								<Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
									<CardContent className="p-4">
										<div className="flex items-center space-x-3">
											<div className="flex-shrink-0">
												<span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
													<detail.icon className="h-5 w-5 text-primary" />
												</span>
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-black truncate">{detail.label}</p>
												<p className="text-md text-gray-500 truncate">{detail.value}</p>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="sm:px-6">
							<Button className="w-full rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white py-6 text-md md:text-lg">
								<Ticket className="w-5 h-5" />
								Get Your Tickets Now
							</Button>
						</div>
					</div>
					<ShareEvent title={event.eventname} description={event.eventdescription} startDate={new Date(event.eventdate)} endDate={new Date(event.eventdate)} />
					<div className="w-full">
						<iframe className="w-full h-72 px-6" src={event.eventyoutubeUrl} title={event.eventname} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
					</div>
					<div className="w-full">
						<iframe className="px-6" src={event.eventspotifyUrl} width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
					</div>
				</aside>
			</div>
		</EventLayout>
	);
}
