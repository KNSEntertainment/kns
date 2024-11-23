import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<section className="relative h-screen flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0">
				<img src="/hero-background.jpg" alt="Colorful festival background" className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-black opacity-50"></div>
			</div>
			<div className="container mx-auto px-4 z-10 text-center">
				<motion.h1 className="text-4xl md:text-6xl font-bold text-white mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					Experience Nepalese Culture in Europe
				</motion.h1>
				<motion.p className="text-xl text-gray-200 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
					Join us for unforgettable concerts and cultural programs across Norway and Europe
				</motion.p>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
					<Button size="lg" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full">
						Explore Events
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
