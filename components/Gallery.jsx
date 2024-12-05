"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Fullscreen } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";

const filters = ["All", "Oslo", "Germany", "Belgium", "Portugal"];

// const gallery = [
// 	{ id: 4, type: "image", src: "/belgium3.jpeg", alt: "Wedding photo 1", category: "Belgium" },
// 	{ id: 7, type: "image", src: "/group.jpeg", alt: "Wedding photo 1", category: "Portugal" },
// 	{ id: 5, type: "image", src: "/ghamad.jpeg", alt: "Portrait photo 1", category: "Oslo" },
// 	{ id: 10, type: "image", src: "/group3.jpeg", alt: "Landscape photo 1", category: "Germany" },
// 	// Add more items as needed
// ];

export default function Gallery() {
	const [activeFilter, setActiveFilter] = useState("All");
	const [zoomedItem, setZoomedItem] = useState(null);
	const galleryRef = useRef(null);
	const { data: gallery, error, loading } = useFetchData("/api/gallery", "gallery");

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

	const filteredItems = activeFilter === "All" ? gallery : gallery.filter((item) => item.category === activeFilter);

	const scrollToSection = (filter) => {
		setActiveFilter(filter);
		const element = document.getElementById(filter);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<section id="gallery" className="py-8 sm:py-16 bg-gray-100">
			<div className="container mx-auto px-2 sm:px-4">
				<h2 className="text-3xl font-bold text-center mb-6 sm:mb-12">Gallery</h2>

				{/* Filter Buttons */}
				<div className="flex flex-wrap justify-center gap-4 mb-8">
					{filters.map((filter) => (
						<button key={filter} onClick={() => scrollToSection(filter)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${activeFilter === filter ? "bg-red-700 text-white" : "bg-white text-slate-800 hover:bg-red-100"}`}>
							{filter}
						</button>
					))}
				</div>

				{/* Gallery Grid */}
				<div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{filteredItems.map((item) => (
						<div key={item._id} id={item.category} className={`relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ${item.type === "video" ? "col-span-2 row-span-2" : ""}`}>
							{item.type === "image" ? (
								<div className="group cursor-zoom-in" onClick={() => setZoomedItem(item)}>
									<Image src={item.src || "/placeholder.jpg"} alt={item.alt || "alt"} width={800} height={800} className="w-full h-full object-cover" />
									<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
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
							<Image src={zoomedItem.src || "/placeholder.jpg"} alt={zoomedItem.alt || "alt"} width={1200} height={900} className="w-full h-full object-contain" />
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
