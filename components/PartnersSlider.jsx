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

	return (
		<div className="flex items-center  bg-white py-12 px-4 md:py-24">
			<div className="mx-auto">
				<h2 className="text-3xl font-bold text-center mb-6 sm:mb-12 md:mb-12">
					Our <span className="text-red-500">Partners</span>
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3  gap-4 md:gap-6 whitespace-nowrap">
					{partners?.map((logo) => (
						<Card key={logo._id} className="group inline-block transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-48 md:w-64 lg:w-96 h-max">
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
