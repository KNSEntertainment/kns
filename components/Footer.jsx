"use client";
import { Facebook, Instagram } from "lucide-react";
import Newsletter from "./Newsletter";
import useFetchData from "@/hooks/useFetchData";

export default function Footer() {
	const { data: settings, error, loading } = useFetchData("/api/settings", "settings");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Loading failed{error}</p>;
	return (
		<footer className="bg-gray-900 text-slate-200 p-4 sm:p-12 md:p-16 lg:p-24">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-between">
					<div className="max-w-sm">
						<h3 className="text-xl font-bold mb-4">Gurung KNS Entertainment</h3>
						<p className="text-gray-200">We are a passionate team of event planners, creators, and industry experts united by a shared commitment to excellence. With diverse talents and a keen eye for detail, we craft immersive experiences that resonate with audiences and exceed expectations.</p>
						<div>
							<h4 className="text-lg font-semibold my-4">Follow Us</h4>
							<div className="flex space-x-4">
								<a href={`${settings?.[0]?.facebook}`} target="_blank" className="text-gray-400 hover:text-blue-200 transition-colors">
									<Facebook className="h-6 w-6" />
								</a>
								<a href="#" className="text-gray-400 hover:text-purple-200 transition-colors">
									<Instagram className="h-6 w-6" />
								</a>
								{/* <a href="#" className="text-gray-400 hover:text-blue-200 transition-colors">
									<Twitter className="h-6 w-6" />
								</a>
								<a href="#" className="text-gray-400 hover:text-red-200 transition-colors">
									<Youtube className="h-6 w-6" />
								</a> */}
							</div>
						</div>
					</div>
					<div className="">
						<Newsletter />
					</div>
					<div className="bg-gray-900 text-white rounded-lg shadow-lg md:ml-24 max-w-md  mt-6 md:mt-0">
						<h4 className="text-xl font-bold mb-4">Contact Details</h4>
						<div className="space-y-1">
							<p className="text-lg font-medium">{settings?.[0]?.name}</p>
							<p className="text-sm text-gray-200">{settings?.[0]?.position}</p>
							<p className="text-sm hover:text-red-400 transition-colors cursor-pointer">
								<a href="mailto:gurungkns19@gmail.com">{settings?.[0]?.email}</a>
							</p>
							<p className="text-sm text-gray-200 hover:text-red-400 transition-colors cursor-pointer">
								<a href="tel:+4745921405">{settings?.[0]?.phone}</a>
							</p>
							<p className="text-sm text-gray-200">{settings?.[0]?.address}</p>
						</div>
					</div>
				</div>

				<div className="mt-12 pt-2 border-t border-gray-600 text-center text-gray-400">
					<p>&copy; {new Date().getFullYear()} Gurung KNS Entertainment. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
