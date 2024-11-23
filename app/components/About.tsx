import { motion } from "framer-motion";

export default function About() {
	return (
		<section id="about" className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center">
					<motion.div className="md:w-1/2 mb-8 md:mb-0" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
						<img src="/avatar.avif" alt="About our company" className="rounded-lg shadow-lg" />
					</motion.div>
					<motion.div className="md:w-1/2 md:pl-12" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
						<h2 className="text-3xl font-bold mb-4">About NepalEvents</h2>
						<p className="text-gray-600 mb-4">NepalEvents is a premier event management company dedicated to bringing the vibrant culture of Nepal to audiences across Europe. With a focus on organizing unforgettable cultural programs and concerts, we showcase the best Nepalese artists and their performances.</p>
						<p className="text-gray-600 mb-4">Our mission is to create a bridge between Nepal and Europe, fostering cultural exchange and providing a platform for Nepalese artists to share their talents with a wider audience.</p>
						<p className="text-gray-600">From traditional music and dance to contemporary fusion performances, we offer a diverse range of events that celebrate the rich heritage of Nepal while embracing modern artistic expressions.</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
