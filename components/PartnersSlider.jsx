import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";

const PartnersSlider = () => {
	const { data: partners, error, loading } = useFetchData("/api/partners", "partners");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	const handlePartnerLogoClick = () => {
		console.log("Partner logo clicked");
	};

	// const logos = [
	// 	{ id: 1, logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events", type: "Co-Partner" },
	// 	{ id: 2, logo: "/kendra_motion.jpeg", url: "https://www.facebook.com/Kendramotionpictures/", alt: "kendra_motion", pname: "Kendra Motion Pictures", type: "Supporter" },
	// 	{ id: 3, logo: "/mo_tv.jpeg", url: "https://www.facebook.com/@meroonlinetv/", alt: "mo_tv", pname: "Mero Online TV", type: "Onlive TV Partner" },
	// 	{ id: 4, logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events", type: "Co-Partner" },
	// 	{ id: 5, logo: "/kendra_motion.jpeg", url: "https://www.facebook.com/Kendramotionpictures/", alt: "kendra_motion", pname: "Kendra Motion Pictures", type: "Supporter" },
	// 	{ id: 6, logo: "/mo_tv.jpeg", url: "https://www.facebook.com/@meroonlinetv/", alt: "mo_tv", pname: "Mero Online TV", type: "Onlive TV Partner" },
	// 	{ id: 7, logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events", type: "Co-Partner" },
	// 	{ id: 8, logo: "/kendra_motion.jpeg", url: "https://www.facebook.com/Kendramotionpictures/", alt: "kendra_motion", pname: "Kendra Motion Pictures", type: "Supporter" },
	// 	{ id: 9, logo: "/mo_tv.jpeg", url: "https://www.facebook.com/@meroonlinetv/", alt: "mo_tv", pname: "Mero Online TV", type: "Onlive TV Partner" },
	// ];

	return (
		<div className="flex items-center  bg-white py-12 px-4 md:py-24">
			<div className="mx-auto">
				<h2 className="text-3xl font-bold text-center mb-6 sm:mb-12 md:mb-12">
					Our <span className="text-red-500">Partners</span>
				</h2>
				<div className="flex overflow-x-auto gap-4 md:gap-6 whitespace-nowrap">
					{partners?.map((logo) => (
						<Card key={logo._id} className="group inline-block transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-96 h-max">
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
			</div>
		</div>
	);
};

export default PartnersSlider;
