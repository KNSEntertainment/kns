import Image from "next/image";
import React from "react";

const PartnersSlider = () => {
	const handlePartnerLogoClick = () => {
		console.log("Partner logo clicked");
	};
	const logos = [
		{ logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events" },
		{ logo: "/kendra_motion.jpeg", url: "https://mamaevents.fi", alt: "kendra_motion" },
		{ logo: "/mo_tv.jpeg", url: "https://mamaevents.fi", alt: "mo_tv" },
		{ logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events" },
		{ logo: "/kendra_motion.jpeg", url: "https://mamaevents.fi", alt: "kendra_motion" },
		{ logo: "/mo_tv.jpeg", url: "https://mamaevents.fi", alt: "mo_tv" },
		{ logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events" },
		{ logo: "/kendra_motion.jpeg", url: "https://mamaevents.fi", alt: "kendra_motion" },
		{ logo: "/mo_tv.jpeg", url: "https://mamaevents.fi", alt: "mo_tv" },
		{ logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events" },
		{ logo: "/kendra_motion.jpeg", url: "https://mamaevents.fi", alt: "kendra_motion" },
		{ logo: "/mo_tv.jpeg", url: "https://mamaevents.fi", alt: "mo_tv" },
	];

	return (
		<div className="flex h-48 sm:h-96 items-center bg-gray-100 py-8">
			<div className="container mx-auto">
				<h2 className="text-center text-2xl font-bold text-gray-800 mb-6 sm:mb-12">Our Trusted Partners</h2>
				<div className="overflow-hidden relative">
					<div className="flex animate-scroll gap-8">
						{logos.concat(logos).map((logo, index) => (
							<div key={index} className="flex-shrink-0 w-40 h-20 bg-white p-4 shadow-md rounded-lg flex items-center justify-center">
								<Image src={logo.logo} alt={logo.alt} width={50} height={50} onClick={handlePartnerLogoClick} className="object-contain max-h-full max-w-full cursor-pointer" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PartnersSlider;
