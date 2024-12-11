"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Music, Film, Mic, Calendar, Sparkles } from "lucide-react";

export default function AboutUsContent() {
	return (
		<div className="pt-24 min-h-screen bg-gradient-to-b from-slate-100 to-red-50">
			<header className="py-20 text-center relative overflow-hidden">
				<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
					<div className="w-full mb-8 md:mb-0">
						<motion.h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-600" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
							About Us
						</motion.h1>
						<motion.p className="text-xl md:text-2xl text-muted-foreground" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
							Your trusted partner for unforgettable event experiences across Europe
						</motion.p>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<section className="mb-20">
					<Card className="overflow-hidden">
						<CardHeader className="bg-red-600 text-white p-6 px-12">
							<CardTitle className="text-3xl text-center">Welcome to Gurung KNS Entertainment</CardTitle>
						</CardHeader>
						<CardContent className="p-12 grid grid-cols-1 md:grid-cols-2 items-center">
							<motion.div className="my-6 px-12 w-full" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
								<h2 className="text-4xl font-bold mb-4">
									About <span className="text-red-500 leading-tight">Us</span>
								</h2>
								<p className="text-lg mb-6">KNS Entertainment is a premier event management company dedicated to bringing the vibrant culture of Nepal to audiences across Europe. With a focus on organizing unforgettable cultural programs and concerts, we showcase the best Nepalese artists and their performances.</p>
								<p className="text-lg mb-6">Our mission is to create a bridge between Nepal and Europe, fostering cultural exchange and providing a platform for Nepalese artists to share their talents with a wider audience.</p>
								<p className="text-lg mb-8">From traditional music and dance to contemporary fusion performances, we offer a diverse range of events that celebrate the rich heritage of Nepal while embracing modern artistic expressions.</p>
								<p className="text-lg mb-8">We are a passionate team of event planners, creators, and industry experts united by a shared commitment to excellence. With diverse talents and a keen eye for detail, we craft immersive experiences that resonate with audiences and exceed expectations.</p>
							</motion.div>{" "}
							<div className="px-12">
								<Image src="/event1.png" alt="Event Experience" width={200} height={200} className="rounded-lg shadow-lg w-full" />
							</div>
						</CardContent>
					</Card>
				</section>

				<Parallax bgImage="/dancing2.jpeg" strength={500}>
					<div style={{ height: 500 }}>
						<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
							<div className="text-center text-white p-8">
								<h2 className="text-3xl font-bold mb-6">Our Vision</h2>
								<p className="text-lg mb-4">To redefine the event industry by delivering innovative, memorable, and impactful experiences. We aim to provide a platform where artists thrive, audiences connect, and creativity shines, setting new benchmarks for excellence in entertainment.</p>
							</div>
						</div>
					</div>
				</Parallax>

				<section className="my-20">
					<h2 className="text-3xl font-bold mb-6 text-red-600">What We Do</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{services.map((service, index) => (
							<Card key={index} className="overflow-hidden">
								<CardHeader className="bg-red-600 text-white p-4">
									<CardTitle className="flex items-center text-xl">
										{service.icon}
										<span className="ml-2">{service.title}</span>
									</CardTitle>
								</CardHeader>
								<CardContent className="p-4">
									<p>{service.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				<Parallax bgImage="/dancing3.jpeg" strength={300}>
					<div style={{ height: 400 }}>
						<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
							<div className=" text-white p-8">
								<h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
								<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
									{reasons.map((reason, index) => (
										<li key={index} className="flex items-start">
											<Sparkles className="mr-2 mt-1 text-red-400" />
											<div>
												<h3 className="font-semibold">{reason.title}</h3>
												<p>{reason.description}</p>
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</Parallax>
			</main>
		</div>
	);
}

const services = [
	{ title: "Venue Bookings", icon: <MapPin />, description: "Explore our curated collection of venues, from intimate party palaces to grand cinema halls and theaters, tailored to suit any event." },
	{ title: "Concerts", icon: <Music />, description: "Immerse yourself in the power of live music, with performances spanning a variety of genres to captivate every music enthusiast." },
	{ title: "Movie Screenings", icon: <Film />, description: "Experience the magic of cinema in unique settings, featuring classics, indie films, and modern hits." },
	{ title: "DJ Nights", icon: <Music />, description: "Dance under dazzling lights to the beats of our expert DJs, transforming any night into a pulsating celebration." },
	{ title: "Stand-Up Comedy", icon: <Mic />, description: "Laugh out loud with our carefully curated comedy nights, showcasing rising stars and renowned performers." },
	{ title: "Festivals", icon: <Calendar />, description: "Celebrate art, culture, and music with vibrant festivals that unite communities and inspire joy." },
];

const reasons = [
	{ title: "Exceptional Curation", description: "We handpick every venue and event to deliver tailored, captivating experiences." },
	{ title: "Memorable Moments", description: "We are dedicated to crafting events that leave a lasting impression on attendees." },
	{ title: "Artist Empowerment", description: "We provide a platform for both emerging talents and seasoned performers to shine." },
	{ title: "Customer First", description: "Your experience is our priority, from seamless booking to personalized support." },
	{ title: "Innovation at Core", description: "We embrace fresh ideas and concepts to keep our offerings exciting and dynamic." },
];
