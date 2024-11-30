"use client";

import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents.jsx";
import About from "./components/About";
import FeaturedArtists from "./components/FeaturedArtists";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import ContactCard from "./components/ContactCard";
import PartnersSlider from "./components/PartnersSlider";
import Gallery from "./components/Gallery";
import Blog from "./components/Blog";

export default function LandingPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
			<Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
			<main>
				<Hero />
				<UpcomingEvents />
				<About />
				<PartnersSlider />
				<FeaturedArtists />
				<Gallery />
				<Testimonials />
				<Blog />
				<ContactCard />
				<Newsletter />
			</main>
			<Footer />
		</div>
	);
}
