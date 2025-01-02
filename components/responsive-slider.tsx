"use client";

import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Partner {
	_id: string;
	partner_url: string;
	partner_logo: string;
	logo_alt_text: string;
	partner_name: string;
}

interface ResponsiveSliderProps {
	partners: Partner[];
}

const ResponsiveSlider: React.FC<ResponsiveSliderProps> = ({ partners }) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [showControls, setShowControls] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setShowControls(window.innerWidth < 768); // 768px is the default 'md' breakpoint in Tailwind
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const scroll = (direction: "left" | "right") => {
		if (sliderRef.current) {
			const scrollAmount = sliderRef.current.offsetWidth;
			sliderRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};

	const handlePartnerLogoClick = (e: React.MouseEvent) => {
		// Add your click handler logic here
		console.log("Partner logo clicked");
	};

	return (
		<div className="relative">
			<div ref={sliderRef} className="flex overflow-x-scroll gap-4 md:gap-6 whitespace-nowrap scrollbar-hide">
				{partners?.map((logo) => (
					<Card key={logo._id} className="group inline-block transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-72 md:w-96 h-max flex-shrink-0">
						<CardContent className="p-4">
							<a href={logo.partner_url} className="block" target="_blank" rel="noopener noreferrer">
								<div className="aspect-video relative mb-4 rounded-md overflow-hidden">
									<Image src={logo.partner_logo || "/placeholder.jpg"} alt={logo.logo_alt_text || "Partner logo"} fill className="object-contain p-1 transition-transform duration-300 group-hover:scale-105" onClick={handlePartnerLogoClick} title={logo.logo_alt_text} />
								</div>
								<h3 className="text-sm font-medium text-gray-900 text-center truncate">{logo.partner_name}</h3>
							</a>
						</CardContent>
					</Card>
				))}
			</div>
			{showControls && (
				<>
					<Button variant="outline" size="icon" className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white" onClick={() => scroll("left")}>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button variant="outline" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white" onClick={() => scroll("right")}>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</>
			)}
		</div>
	);
};

export default ResponsiveSlider;
