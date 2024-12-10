import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
	return (
		<section className="relative h-screen flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0">
				<Image width={1000} height={1000} src="/dancing3.jpeg" alt="Colorful festival background" className="w-full h-full object-cover scale-110" />
				{/* <video src="/concert.mp4" autoPlay muted loop className="w-full h-full object-cover " /> */}
				<div className="absolute inset-0 bg-black opacity-50"></div>
			</div>
			<div className="container max-w-4xl mx-auto px-4 z-10 text-center">
				<motion.h1 className="text-3xl md:text-6xl font-bold text-slate-200 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					Experience Nepalese Culture in Europe
				</motion.h1>
				<motion.p className="text-xl text-gray-200 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
					Join us for unforgettable concerts and cultural programs across Norway and Europe
				</motion.p>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
					<Link href="/events">
						<Button size="lg" className="bg-red-600 hover:bg-red-700 text-slate-200 font-bold py-3 px-6 mr-2 rounded-full">
							Explore Events
						</Button>
					</Link>
					<Button size="lg" className="hover:bg-slate-300 bg-white text-slate-900 font-bold py-3 px-6 rounded-full">
						Become a Partner
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
