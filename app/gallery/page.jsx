"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Fullscreen } from "lucide-react";

const filters = ["All", "Wedding", "Portrait", "Landscape", "Event"];

const galleryItems = [
	{ id: 1, type: "image", src: "/event1.png", alt: "Wedding photo 1", category: "Wedding" },
	{ id: 2, type: "image", src: "/event2.png", alt: "Portrait photo 1", category: "Portrait" },
	{ id: 3, type: "video", src: "/videos/2.mp4", poster: "/hero-bg.png", category: "Event" },
	{ id: 4, type: "image", src: "/event3.png", alt: "Landscape photo 1", category: "Landscape" },
	{ id: 5, type: "image", src: "/event4.png", alt: "Wedding photo 2", category: "Wedding" },
	// Add more items as needed
];

export default function Gallery() {
	const [activeFilter, setActiveFilter] = useState("All");
	const [zoomedItem, setZoomedItem] = useState(null);
	const galleryRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (zoomedItem && !event.target.closest(".zoomed-image")) {
				setZoomedItem(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [zoomedItem]);

	const filteredItems = activeFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter);

	const scrollToSection = (filter) => {
		setActiveFilter(filter);
		const element = document.getElementById(filter);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section id="gallery" className="py-8 sm:py-16 bg-gray-100">
			<div className="container mx-auto px-2 sm:px-4">
				<h2 className="text-3xl font-bold text-center mb-6 sm:mb-12">Gallery</h2>

				{/* Filter Buttons */}
				<div className="flex flex-wrap justify-center gap-4 mb-8">
					{filters.map((filter) => (
						<button key={filter} onClick={() => scrollToSection(filter)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${activeFilter === filter ? "bg-red-700 text-white" : "bg-white text-red-700 hover:bg-red-100"}`}>
							{filter}
						</button>
					))}
				</div>

				{/* Gallery Grid */}
				<div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{filteredItems.map((item) => (
						<div key={item.id} id={item.category} className={`relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ${item.type === "video" ? "col-span-2 row-span-2" : ""}`}>
							{item.type === "image" ? (
								<div className="group cursor-zoom-in" onClick={() => setZoomedItem(item)}>
									<Image src={item.src} alt={item.alt} width={800} height={800} className="w-full h-full object-cover" />
									<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
										{/* <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg> */}
										<Fullscreen className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>
								</div>
							) : (
								<video src={item.src} poster={item.poster} controls className="w-full h-full object-cover" />
							)}
						</div>
					))}
				</div>

				{/* Zoomed Image */}
				{zoomedItem && (
					<div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
						<div className="relative zoomed-image max-w-4xl max-h-full">
							<Image src={zoomedItem.src} alt={zoomedItem.alt} width={1200} height={900} className="w-full h-full object-contain" />
							<button onClick={() => setZoomedItem(null)} className="absolute top-4 right-4 text-white text-2xl">
								&times;
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
