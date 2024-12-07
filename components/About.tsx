"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";

export default function About() {
	return (
		<Parallax blur={0} bgImage="/group2.jpeg" bgImageAlt="Event background" strength={1200}>
			<section id="about" className="py-32 relative">
				<div className="absolute inset-0 bg-black bg-opacity-60" />
				<div className="container mx-auto px-4 relative z-10">
					<div className="flex flex-col items-center text-white">
						<motion.div className="text-center mb-12" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
							<h2 className="text-4xl font-bold mb-4">
								About <span className="text-red-500">KNS Entertainment</span>
							</h2>
						</motion.div>
						<motion.div className="max-w-3xl text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
							<p className="text-lg mb-6">KNS Entertainment is a premier event management company dedicated to bringing the vibrant culture of Nepal to audiences across Europe. With a focus on organizing unforgettable cultural programs and concerts, we showcase the best Nepalese artists and their performances.</p>
							<p className="text-lg mb-6">Our mission is to create a bridge between Nepal and Europe, fostering cultural exchange and providing a platform for Nepalese artists to share their talents with a wider audience.</p>
							<p className="text-lg mb-8">From traditional music and dance to contemporary fusion performances, we offer a diverse range of events that celebrate the rich heritage of Nepal while embracing modern artistic expressions.</p>

							<Button className="bg-red-700 ml-4">Learn More </Button>
						</motion.div>
					</div>
				</div>
			</section>
		</Parallax>
	);
}
