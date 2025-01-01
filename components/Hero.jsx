"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { ArrowDown } from "lucide-react";

export default function Hero() {
	const onMoveDown = () => {
		window.scrollBy({
			top: 700,
			behavior: "smooth",
		});
	};

	return (
		<section className="relative h-screen flex items-center justify-center overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0">
				<CldImage src="ufhdtrdulvnnm108q4kt" alt="A vibrant festival scene with colorful lights and a festive atmosphere" fill className="object-cover" />
				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-black opacity-40"></div>
				<button onClick={onMoveDown} className="absolute left-1/2 bottom-10 transform -translate-x-1/2 bg-transparent ring-2 ring-slate-200 text-white w-12 h-12 opacity-50 rounded-full flex items-center justify-center">
					<ArrowDown className="animate-bounce" />
				</button>
			</div>

			{/* Content */}
			<div className="container max-w-4xl mx-auto px-4 z-10 text-center">
				{/* Heading */}
				<motion.h1 className="text-3xl md:text-5xl font-bold text-slate-200 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					Unforgettable Venues and Memories for Every Occasion{" "}
				</motion.h1>

				{/* Subheading */}
				<motion.p className="text-xl text-gray-200 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
					From cinema halls to party palaces, we make event planning seamless. Find the perfect venue for your special day and let us handle the rest.{" "}
				</motion.p>

				{/* Buttons */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
					{/* Book Event Button */}
					<Link href="/europe-tour">
						<Button size="lg" className="hover:bg-slate-300 bg-white text-slate-900 font-bold py-3 px-6 mr-4 rounded-full">
							Request a Quote{" "}
						</Button>
					</Link>

					{/* Explore Events Button */}
					<Link href="/events">
						<Button size="lg" className="bg-red-600 hover:bg-red-700 text-slate-200 font-bold py-3 px-6 rounded-full">
							Explore Events
						</Button>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}

// "use client";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// // import Image from "next/image";
// // import useFetchData from "@/hooks/useFetchData";
// import { CldImage } from "next-cloudinary";

// export default function Hero() {
// 	// const { data: Heros, error, loading } = useFetchData("/api/Heros", "Heros");

// 	// if (loading) return <p>Loading...</p>;
// 	// if (error) return <p>Error: {error}</p>;

// 	// return Heros.length > 0 ? (
// 	return (
// 		<section className="relative h-screen flex items-center justify-center overflow-hidden">
// 			<div className="absolute inset-0">
// 				{/* <Image width={1000} height={1000} src={Heros[0].heroimage} alt="Colorful festival background" className="w-full h-full object-cover scale-110" /> */}
// 				<CldImage
// 					src="ufhdtrdulvnnm108q4kt"
// 					className="w-full h-auto"
// 					alt="Hero Background"
// 					crop={{
// 						type: "auto",
// 						source: true,
// 					}}
// 				/>
// 				<div className="absolute inset-0 bg-black opacity-50"></div>
// 			</div>
// 			<div className="container max-w-4xl mx-auto px-4 z-10 text-center">
// 				<motion.h1 className="text-3xl md:text-5xl font-bold text-slate-200 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
// 					Main Heading{" "}
// 				</motion.h1>
// 				<motion.p className="text-xl text-gray-200 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
// 					Sub Heading{" "}
// 				</motion.p>
// 				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
// 					<Link href="/europe-tour">
// 						<Button size="lg" className="hover:bg-slate-300 bg-white text-slate-900 font-bold py-3 px-6 mr-4 rounded-full">
// 							Book Event
// 						</Button>
// 					</Link>
// 					<Link href="/events">
// 						<Button size="lg" className="bg-red-600 hover:bg-red-700 text-slate-200 font-bold py-3 px-6 rounded-full">
// 							Explore Events
// 						</Button>
// 					</Link>
// 				</motion.div>
// 			</div>
// 		</section>
// 	);
// }
