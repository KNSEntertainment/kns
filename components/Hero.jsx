"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";

export default function Hero() {
	const { data: Heros, error, loading, mutate } = useFetchData("/api/Heros", "Heros");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return Heros.length > 0 ? (
		<section className="relative h-screen flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0">
				<Image width={1000} height={1000} src={Heros[0].heroimage} alt="Colorful festival background" className="w-full h-full object-cover scale-110" />
				{/* <video src="/concert.mp4" autoPlay muted loop className="w-full h-full object-cover " /> */}
				<div className="absolute inset-0 bg-black opacity-50"></div>
			</div>
			<div className="container max-w-4xl mx-auto px-4 z-10 text-center">
				<motion.h1 className="text-3xl md:text-5xl font-bold text-slate-200 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					{Heros[0].mainheading}
				</motion.h1>
				<motion.p className="text-xl text-gray-200 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
					{Heros[0].subheading}
				</motion.p>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
					<Link href="/europe-tour">
						<Button size="lg" className="hover:bg-slate-300 bg-white text-slate-900 font-bold py-3 px-6 mr-4 rounded-full">
							Book Event
						</Button>
					</Link>
					<Link href="/events">
						<Button size="lg" className="bg-red-600 hover:bg-red-700 text-slate-200 font-bold py-3 px-6 rounded-full">
							Explore Events
						</Button>
					</Link>
				</motion.div>
			</div>
		</section>
	) : (
		"Something went wrong"
	);
}
