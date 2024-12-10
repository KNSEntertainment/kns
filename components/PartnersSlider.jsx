import Image from "next/image";
import React from "react";

const PartnersSlider = () => {
	const handlePartnerLogoClick = () => {
		console.log("Partner logo clicked");
	};
	const logos = [
		{ id: 1, logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events", type: "Event Partner" },
		{ id: 2, logo: "/kendra_motion.jpeg", url: "https://www.facebook.com/Kendramotionpictures/", alt: "kendra_motion", pname: "Kendra Motion Pictures", type: "Media Partner" },
		{ id: 3, logo: "/mo_tv.jpeg", url: "https://www.facebook.com/@meroonlinetv/", alt: "mo_tv", pname: "Mero Online TV", type: "TV Partner" },
		{ id: 4, logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events", type: "Event Partner" },
		{ id: 5, logo: "/kendra_motion.jpeg", url: "https://www.facebook.com/Kendramotionpictures/", alt: "kendra_motion", pname: "Kendra Motion Pictures", type: "Media Partner" },
		{ id: 6, logo: "/mo_tv.jpeg", url: "https://www.facebook.com/@meroonlinetv/", alt: "mo_tv", pname: "Mero Online TV", type: "TV Partner" },
		{ id: 7, logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events", type: "Event Partner" },
		{ id: 8, logo: "/kendra_motion.jpeg", url: "https://www.facebook.com/Kendramotionpictures/", alt: "kendra_motion", pname: "Kendra Motion Pictures", type: "Media Partner" },
		{ id: 9, logo: "/mo_tv.jpeg", url: "https://www.facebook.com/@meroonlinetv/", alt: "mo_tv", pname: "Mero Online TV", type: "TV Partner" },
		{ id: 10, logo: "/mama_events.jpeg", url: "https://mamaevents.fi", alt: "mama_events", pname: "Mama Events", type: "Event Partner" },
		{ id: 11, logo: "/kendra_motion.jpeg", url: "https://www.facebook.com/Kendramotionpictures/", alt: "kendra_motion", pname: "Kendra Motion Pictures", type: "Media Partner" },
		{ id: 12, logo: "/mo_tv.jpeg", url: "https://www.facebook.com/@meroonlinetv/", alt: "mo_tv", pname: "Mero Online TV", type: "TV Partner" },
	];

	return (
		<div className="flex h-60 sm:h-[500px] items-center bg-white py-8">
			<div className="container mx-auto">
				<h2 className="text-3xl font-bold text-center mb-6 sm:mb-12 md:mb-20">
					Our <span className="text-red-500">Partners</span>
				</h2>
				<div className="overflow-hidden relative">
					<div className="flex animate-scroll gap-8">
						{logos.map((logo) => (
							<div key={logo.id} title={logo.pname} className="flex flex-col items-center space-y-2">
								<p className=" text-sm font-semibold">{logo.type}</p>
								<a href={logo.url} className="flex-shrink-0 w-72 h-32 bg-white p-4 m-4 hover:shadow-md rounded-lg flex items-center justify-center">
									<Image src={logo.logo || "/placeholder.jpg"} alt={logo.alt || "alt"} width={200} height={200} onClick={handlePartnerLogoClick} className="object-contain max-h-full max-w-full cursor-pointer" />
								</a>
								{/* <p className="text-xs">{logo.pname}</p> */}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PartnersSlider;
