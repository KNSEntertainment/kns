import Image from "next/image";
import React from "react";

const PartnersSlider = () => {
	const handlePartnerLogoClick = () => {
		console.log("Partner logo clicked");
	};
	const logos = [
		{ logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events" },
		{ logo: "/kendra_motion.jpeg", url: "https://mamaevents.fi", alt: "kendra_motion", pname: "Kendra Motion Pictures" },
		{ logo: "/mo_tv.jpeg", url: "https://mamaevents.fi", alt: "mo_tv", pname: "Mero Online TV" },
		{ logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events" },
		{ logo: "/kendra_motion.jpeg", url: "https://mamaevents.fi", alt: "kendra_motion", pname: "Kendra Motion Pictures" },
		{ logo: "/mo_tv.jpeg", url: "https://mamaevents.fi", alt: "mo_tv", pname: "Mero Online TV" },
		{ logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events" },
		{ logo: "/kendra_motion.jpeg", url: "https://mamaevents.fi", alt: "kendra_motion", pname: "Kendra Motion Pictures" },
		{ logo: "/mo_tv.jpeg", url: "https://mamaevents.fi", alt: "mo_tv", pname: "Mero Online TV" },
		{ logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events" },
		{ logo: "/kendra_motion.jpeg", url: "https://mamaevents.fi", alt: "kendra_motion", pname: "Kendra Motion Pictures" },
		{ logo: "/mo_tv.jpeg", url: "https://mamaevents.fi", alt: "mo_tv", pname: "Mero Online TV" },
	];

	return (
		<div className="flex h-48 sm:h-96 items-center bg-gray-100 py-8">
			<div className="container mx-auto">
				<h2 className="text-3xl font-bold text-center mb-6 sm:mb-12">Our Trusted Partners</h2>
				<div className="overflow-hidden relative">
					<div className="flex animate-scroll gap-8">
						{logos.map((logo, index) => (
							<div className="flex flex-col items-center space-y-2">
								<div key={index} className="flex-shrink-0 w-40 h-20 bg-white p-4 shadow-md rounded-lg flex items-center justify-center">
									<Image src={logo.logo} alt={logo.alt} width={200} height={200} onClick={handlePartnerLogoClick} className="object-contain max-h-full max-w-full cursor-pointer" />
								</div>
								<p className="text-xs">{logo.pname}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PartnersSlider;
