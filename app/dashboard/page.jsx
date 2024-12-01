"use client";
import Link from "next/link";
import { useActiveMenu } from "@/context/ActiveMenuContext";
import { LayoutGrid, Calendar, Users, MessageSquare, Mail, Image, Settings } from "lucide-react";

export default function DashboardGrid() {
	const { setActiveMenu } = useActiveMenu();

	const menuItems = [
		{ name: "Dashboard", icon: LayoutGrid, href: "/dashboard", id: "dashboard", color: "bg-blue-500" },
		{ name: "Events", icon: Calendar, href: "/dashboard/events", id: "events", color: "bg-purple-500" },
		{ name: "Artists", icon: Users, href: "/dashboard/artists", id: "artists", color: "bg-pink-500" },
		{ name: "Testimonials", icon: MessageSquare, href: "/dashboard/testimonials", id: "testimonials", color: "bg-yellow-500" },
		{ name: "Subscribers", icon: Mail, href: "/dashboard/subscribers", id: "subscribers", color: "bg-green-500" },
		{ name: "Gallery", icon: Image, href: "/dashboard/gallery", id: "gallery", color: "bg-orange-500" },
		{ name: "Settings", icon: Settings, href: "/dashboard/settings", id: "settings", color: "bg-gray-500" },
	];

	return (
		<div className="max-w-[1400px] p-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{menuItems.map((item) => (
					<Link key={item.name} href={item.href} className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105" onClick={() => setActiveMenu(item.id)}>
						<div className={`${item.color} p-6 h-full`}>
							<div className="flex items-center justify-between">
								<div className="text-white">
									<h2 className="text-xl font-semibold mb-2">{item.name}</h2>
									<p className="text-white/80">View {item.name.toLowerCase()}</p>
								</div>
								<item.icon className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
							</div>
						</div>
						<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
					</Link>
				))}
			</div>
		</div>
	);
}
