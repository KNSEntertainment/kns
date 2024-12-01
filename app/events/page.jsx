"use client";

import UpcomingEvents from "@/components/UpcomingEvents";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EventsPage = () => {
	return (
		<>
			<Header />
			<div className="pt-24 min-h-screen">
				<UpcomingEvents />
			</div>
			<Footer />
		</>
	);
};

export default EventsPage;
