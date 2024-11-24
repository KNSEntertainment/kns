"use client";

import { useState } from "react";
// import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents.jsx";
import About from "./components/About";
import FeaturedArtists from "./components/FeaturedArtists";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import EventForm from "./components/EventForm";
import ContactCard from "./components/ContactCard";

export default function LandingPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const handleNewsletterSignup = (email: string) => {
		// Here you would typically send the email to your API
		console.log(`Signing up ${email} for newsletter`);
		// toast.success("Thank you for signing up for our newsletter!");
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
			{/* <ToastContainer position="bottom-right" /> */}
			<Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
			<main>
				<Hero />
				<UpcomingEvents />
				<About />
				<FeaturedArtists />
				<Testimonials />
				<ContactCard />
				<Newsletter onSignup={handleNewsletterSignup} />
			</main>
			<Footer />
		</div>
	);
}
