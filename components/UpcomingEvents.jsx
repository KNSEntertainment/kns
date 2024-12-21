import { motion } from "framer-motion";
import { Calendar, Clock, Globe, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BuyTicketButton } from "./BuyTicketButton";
import ShareEvent from "./ShareEvent";
import useFetchData from "@/hooks/useFetchData";

export default function UpcomingEvents() {
	const { data: events, error, loading } = useFetchData("/api/events", "events");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<section id="events" className="py-8 sm:py-16 bg-gray-100">
			<div className="container mx-auto px-2 sm:px-4">
				<h2 className="text-3xl font-bold text-center mb-6 sm:mb-12">
					Upcoming <span className="text-red-500">Event</span>
				</h2>

				{events?.length > 0 ? (
					<motion.div key="events-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						{events.slice(0, 1).map((event) => (
							<div key={event?._id} className="grid grid-cols-1 lg:grid-cols-3 md:gap-20">
								<motion.div className="grid col-span-2 overflow-hidden" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
									<Image width={400} height={500} src={event?.eventposterUrl || "/placeholder.jpg"} alt={event?.eventname || "alt"} className="w-full h-auto rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
								</motion.div>
								<div className="">
									<Link href={`/events/${event?._id}`} className="flex w-full items-center justify-center bg-black p-4  text-white rounded-lg font-semibold">
										View Event Details
									</Link>
									<div className="mt-6 text-black text-lg font-semibold mb-2">Reserve your seat today</div>
									<Card className="px-6 text-xl overflow-hidden group ">
										<Link href={`/events/${event?._id}`}>
											<CardHeader>
												<CardTitle className="text-lg hover:text-red-700">{event?.eventname}</CardTitle>
											</CardHeader>
										</Link>
										<CardContent className="">
											<div className="flex justify-between">
												<div className="flex items-center mb-2">
													<Calendar className="h-4 w-4 mr-2 text-primary" />
													<span className="text-sm text-gray-600">{event?.eventdate}</span>
												</div>
												<div className="flex items-center mb-2">
													<Clock className="h-4 w-4 mr-2 text-primary" />
													<span className="text-sm text-gray-600 line-clamp-1">{event?.eventtime} </span>
												</div>
											</div>
											<div className="flex justify-between">
												<div className="flex items-center">
													<Globe className="h-4 w-4 mr-2 text-primary" />
													<span className="text-sm text-gray-600 line-clamp-1">{event?.eventcountry}</span>
												</div>
												<div className="flex items-center">
													<MapPin className="h-4 w-4 mr-2 text-primary" />
													<span className="text-sm text-gray-600 line-clamp-1">{event?.eventvenue}</span>
												</div>
											</div>
										</CardContent>
										<CardFooter className="flex justify-end gap-4">
											{" "}
											<div className="text-4xl font-bold">{event.eventprice !== "0" && "€" + event.eventprice}</div>
											{new Date(event?.eventdate) > new Date() && <BuyTicketButton btnText="Add to Cart" eventId={event?.eventname} price={event?.eventprice} />}
										</CardFooter>
									</Card>
									<div className=" text-black text-lg font-semibold mt-6 mb-2">Send to your friends and family</div>

									<ShareEvent title={event.eventname} description={event.eventdescription} startDate={new Date(event.eventdate)} endDate={new Date(event.eventdate)} />
									{event?.eventyoutubeUrl && (
										<div className="w-full mb-6">
											<div className=" text-black mt-6 mb-2 text-lg font-semibold">Relevant Media</div>
											<iframe className="rounded-xl w-full h-60 " src={event?.eventyoutubeUrl || null} title={event.eventname} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
										</div>
									)}
									{event?.eventspotifyUrl && (
										<div className="w-full mt-6">
											<iframe src={event.eventspotifyUrl || null} width="100%" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
										</div>
									)}
								</div>
							</div>
						))}
					</motion.div>
				) : (
					<motion.p key="no-events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-gray-600">
						Currently no events are available.
					</motion.p>
				)}
			</div>
			<Link href="/events">
				<Button variant="outline" className="flex justify-center mx-auto mt-6 sm:mt-12">
					View All Events
				</Button>
			</Link>
		</section>
	);
}
